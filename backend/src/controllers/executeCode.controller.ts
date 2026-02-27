import type { Request, Response } from "express";
import { z } from "zod";
import { getJudge0LanguageName, pollBatchResults, submitBatch } from "../libs/judge0.lib.js";
import { db } from "../libs/db.js";

const executeCodeSchema = z.object({
  source_code: z.string().min(1),
  language_id: z.number(),
  stdin: z.array(z.string()).nonempty(),
  expected_outputs: z.array(z.string()).nonempty(),
  problemId: z.string(),
});

export const executeCode = async (req: Request, res: Response) => {
  const parsed = executeCodeSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      error: "invalid input",
      details: parsed.error.flatten(),
    });
  }

  const { source_code, language_id, stdin, expected_outputs, problemId } = parsed.data;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({
      success: false,
      error: "unauthorized",
    });
  }

  if (stdin.length !== expected_outputs.length) {
    return res.status(400).json({
      success: false,
      error: "stdin and expected_outputs must have same length",
    });
  }

  try {
    const submissions = stdin.map((input) => ({
      source_code,
      language_id,
      stdin: input,
    }));

    const submitResponses = await submitBatch(submissions);
    const tokens = submitResponses.map((response) => response.token);
    const results = await pollBatchResults(tokens);

    let allPassed = true;
    const detailedResults = results.map((result, index) => {
      const stdout = result.stdout?.trim() ?? "";
      const expectedOutput = expected_outputs[index]?.trim() ?? "";
      const passed = stdout === expectedOutput;

      if (!passed) {
        allPassed = false;
      }

      return {
        testcase: index + 1,
        stdout,
        expectedOutput,
        passed,
        compileOutput: result.compile_output,
        stderr: result.stderr,
        status: result.status.description,
        memory: result.memory ? `${result.memory} KB` : null,
        time: result.time ? `${result.time} sec` : null,
      };
    });

    const submission = await db.submission.create({
      data: {
        userId,
        problemId,
        sourceCode: source_code,
        language: getJudge0LanguageName(language_id),
        stdin: stdin.join("\n"),
        stdout: JSON.stringify(detailedResults.map((result) => result.stdout)),
        stderr: detailedResults.some((result) => result.stderr)
          ? JSON.stringify(detailedResults.map((result) => result.stderr))
          : null,
        compilationOutput: detailedResults.some((result) => result.compileOutput)
          ? JSON.stringify(detailedResults.map((result) => result.compileOutput))
          : null,
        status: allPassed ? "Accepted" : "Wrong Answer",
        memoryUsage: detailedResults.some((result) => result.memory)
          ? JSON.stringify(detailedResults.map((result) => result.memory))
          : null,
        timeTaken: detailedResults.some((result) => result.time)
          ? JSON.stringify(detailedResults.map((result) => result.time))
          : null,
      },
    });

    if (allPassed) {
      await db.problemSolved.upsert({
        where: {
          userId_problemId: {
            userId,
            problemId,
          },
        },
        update: {},
        create: {
          userId,
          problemId,
        },
      });
    }

    await db.testCaseResult.createMany({
      data: detailedResults.map((result) => ({
        submissionId: submission.id,
        testCase: String(result.testcase),
        passed: result.passed,
        stdout: result.stdout,
        expectedOutput: result.expectedOutput,
        stderr: result.stderr,
        compileOutput: result.compileOutput,
        status: result.status,
        memoryUsage: result.memory,
        timeTaken: result.time,
      })),
    });

    const submissionWithTestcases = await db.submission.findUnique({
      where: { id: submission.id },
      include: { testcases: true },
    });

    return res.json({
      message: "Code executed successfully",
      success: true,
      submission: submissionWithTestcases,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      details: (error as Error).message,
    });
  }
};
