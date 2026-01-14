import { db } from "../libs/db.js";
import { getJudge0LanguageId, submitBatch, pollBatchResults } from "../libs/judge0.lib.js";

export const createProblem = async (req, res) => {
    const { title, description, difficulty, tags, examples, constraints, testcases, codesnippets, editorial, hints, referneceSolution} = req.body;

    if(req.user.role !== "ADMIN"){
        return res.status(403).json({
            message : "you are not allowed to create problem"
        })
    }

    try {
        for (const [language, solutionCode] of Object.entries(referneceSolution)) {
            const languageId = getJudge0LanguageId(language);
    
            if (!languageId) {
                return res.status(400).json({
                    message: `Unsupported programming language: ${language}`
                });
            }
    
            const submission = testcases.map(({ input, output }) => ({
                language_id: languageId,
                source_code: solutionCode,
                stdin: input,
                expected_output: output,
                cpu_time_limit: 2,
                memory_limit: 128000,
            }));
    
            const submissionResults = await submitBatch(submission)
    
            const tokens = submissionResults.map((res) => res.token)
    
            const results = await pollBatchResults(tokens);
    
            for(let i= 0; i<results.length; i++){
                const result = results[i];
    
                if(result.status.id !== 3){
                    return res.status(400).json({
                        message: `Reference solution failed for language: ${language} on testcase ${i + 1}`
                    });
                }
            }
        
        }
        const newProblem = await db.problem.create({
            data: {
                title,
                description,
                difficulty,
                tags,
                examples,
                constraints,
                testcases,
                codesnippets,
                editorial,
                hints,
                referneceSolution,
            },
        });

        return res.status(201).json({
            success: true,
            message: "Problem created successfully",
            problem: newProblem,
        });

    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while creating the problem",
            error: error.message,
        });
    }
}

export const getAllProblems = async (req, res) => {
    try {
        const problems = await db.problem.findMany();

        if(!problems){
            return res.status(404).json({
                message: "No problems found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Problems fetched successfully",
            problems,
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while fetching problems",
            error: error.message,
        });
    }
}

export const getProblemById = async (req, res) => {
    const { id } = req.params;
    try {
        const problem = await db.problem.findUnique({
            where: {
                id: parseInt(id),
            },
        });

        if (!problem) {
            return res.status(404).json({
                message: "Problem not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Problem fetched successfully",
            problem,
        });

    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while fetching the problem",
            error: error.message,
        });
    }
}

export const updateProblem = async (req, res) => {
    const { id } = req.params;
    const { title, description, difficulty, tags, examples, constraints, testcases, codesnippets, editorial, hints, referneceSolution} = req.body;

    const problem = await db.problem.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    if (!problem) {
        return res.status(404).json({
            message: "Problem not found",
        });
    }

    try {
        for (const [language, solutionCode] of Object.entries(referneceSolution)) {
          const languageId = getJudge0LanguageId(language);
    
          if (!languageId) {
            return res.status(400).json({
              message: `Unsupported programming language: ${language}`,
            });
          }
    
          const submission = testcases.map(({ input, output }) => ({
            language_id: languageId,
            source_code: solutionCode,
            stdin: input,
            expected_output: output,
            cpu_time_limit: 2,
            memory_limit: 128000,
          }));
    
          const submissionResults = await submitBatch(submission);
    
          const tokens = submissionResults.map((res) => res.token);
    
          const results = await pollBatchResults(tokens);
    
          for (let i = 0; i < results.length; i++) {
            const result = results[i];
    
            if (result.status.id !== 3) {
              return res.status(400).json({
                message: `Reference solution failed for language: ${language} on testcase ${
                  i + 1
                }`,
              });
            }
          }
        }

        const updatedProblem = await db.problem.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title,
                description,
                difficulty,
                tags,
                examples,
                constraints,
                testcases,
                codesnippets,
                editorial,
                hints,
                referneceSolution,
            },
        });
        return res.status(200).json({
            success: true,
            message: "Problem updated successfully",
            problem: updatedProblem,
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while updating the problem",
            error: error.message,
        });
    }
}

export const deleteProblem = async (req, res) => {
    const { id } = req.params;

    const problem = await db.problem.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    if (!problem) {
        return res.status(404).json({
            message: "Problem not found",
        });
    }

    try {
        await db.problem.delete({
            where: {
                id: parseInt(id),
            },
        });
        return res.status(200).json({
            success: true,
            message: "Problem deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while deleting the problem",
            error: error.message,
        });
    }
}

export const getSolvedProblems = async (req, res) => {
    try {
        const problems = await db.problem.findMany({
            where: {
                solvedby : {
                    some: {
                        userId: req.user.id
                    }
                }
            },
            include: {
                solvedby: {
                    where: {
                        userId: req.user.id
                    }
                }
            }
        });

        return res.status(200).json({
            success: true,
            message: "Solved problems fetched successfully",
            data: problems
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching solved problems",
            error: error.message
        });
    }
}