import { getJudge0LanguageName, pollBatchResults, submitBatch } from "../libs/judge0.lib";
import {db} from "../models/db.model.js";

export const executeCode = async (req, res) => {
    const { source_code, language_id, stdin, expected_outputs, problemId } = req.body;
    const userId = req.user.id;

    try {
        if(!Array.isArray(stdin) || stdin.length === 0 || !Array.isArray(expected_outputs) || expected_outputs.length == stdin.length) {
            return res.status(400).json({
                error: "invalid or missing test cases" 
            });
        }

        const submissons = stdin.map((input) => ({
            source_code,
            language_id,
            stdin: input,
            // base64_encoded: false,
            // wait: false
        }));

        const submitResponses = await submitBatch(submissons);
        
        const tokens = submitResponses.map(response => response.token);

        const results = await pollBatchResults(tokens);

        let allPassed = true;

        const detailedResults = results.map((result, index) => {
            const stdout = result.stdout?.trim()
            const expectedOutput = expected_outputs[index]?.trim()
            const passed = stdout === expectedOutput;

            if(!passed) {
                allPassed = false;
            }

            return {
                testcase: index + 1,
                stdout,
                expectedOutput,
                passed,
                compile_output: result.compile_output,
                stderr : result.stderr || null,
                status: result.status.description,
                memory: result.memory ? `${result.memory} KB` : undefined,
                time : result.time ? `${result.time} sec` : undefined,
            };
        });

        const submission = await Submission.create({
            data : {
                userId,
                problemId,
                source_code,
                language_id : getJudge0LanguageName(language_id),
                stdin: stdin.join("\n"),
                stdout: JSON.stringify(detailedResults.map(r => r.stdout)),
                stderr: detailedResults.some(r => r.stderr) ? JSON.stringify(detailedResults.map(r => r.stderr)) : null,
                complieOutput : detailedResults.some(r => r.compile_output) ? JSON.stringify(detailedResults.map(r => r.compile_output)) : null,
                status: allPassed ? "Accepted" : "Wrong Answer",
                memory : detailedResults.some(r => r.memory) ? JSON.stringify(detailedResults.map(r => r.memory)) : null,
                time : detailedResults.some(r => r.time) ? JSON.stringify(detailedResults.map(r => r.time)) : null,
            }
        });


        if(allPassed) {
            await ProblemSolved.upsert({
                where: {
                    userId_problemId: {
                        userId,
                        problemId,
                    }
                },
                update :{

                },
                create : {
                    userId,
                    problemId,
                }
            });
        }

        const testcaseResults = detailedResults.map(r => ({
           submissionId: submission.id,
           testCase : r.testcase,
           passed : r.passed,
           stdout : r.stdout,
           expected : r.expectedOutput,
           stderr : r.stderr,
           compileOutput : r.compile_output,
           status : r.status,
           memory : r.memory,
           time : r.time,
        }));

        await db.TestCaseResult.createMany({
            data : testcaseResults
        });

        const submissionTestCases = await db.Submission.findUnique({
            where: {
                id: submission.id
            },
            include: {
                testCaseResults: true
            }
        });

        return res.json({
            message : "Code executed successfully",
            success : true,
            submission: submissionTestCases,
        });
    } catch (error) {
        return res.status(500).json({
            error: "Internal server error",
            details: error.message,
        });
    }
}