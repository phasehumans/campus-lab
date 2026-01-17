import { db } from "../libs/db.js";
import { getJudge0LanguageId, submitBatch, pollBatchResults } from "../libs/judge0.lib.js";
import {z} from "zod"

export const createProblem = async (req, res) => {
    const createProblemSchema = z.object({
      title: z.string(),
      description: z.string(),
      difficulty: z.string(),
      tags: z.string(),
      examples: z.string(),
      constraints: z.string(),
      testcases : z.string(),
      codesnippets : z.string(),
      editorial : z.string(),
      hints : z.string(),
      referneceSolution : z.string()
    });


    const parseData = createProblemSchema.safeParse(req.body)

    if(!parseData.success){
        return res.status(400).json({
            success : false,
            message : "input invalids",
            error : parseData.error
        })
    }

    const {title, description, difficulty, tags, examples, constraints, testcases, codesnippets, editorial, hints, referneceSolution} = parseData.data

    if(req.user.role !== "ADMIN"){
        return res.status(403).json({
            success : false,
            message : "you are not allowed to create problem"
        })
    }

    try {
        for (const [language, solutionCode] of Object.entries(referneceSolution)) {
            const languageId = getJudge0LanguageId(language);
    
            if (!languageId) {
                return res.status(400).json({
                    success : false,
                    message : `Unsupported programming language: ${language}`
                });
            }
    
            const submission = testcases.map(({ input, output }) => ({
                language_id : languageId,
                source_code : solutionCode,
                stdin : input,
                expected_output : output,
                cpu_time_limit : 2,
                memory_limit : 128000,
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
                title : title,
                description : description,
                difficulty  :difficulty,
                tags : tags,
                examples : examples,
                constraints : constraints,
                testcases : testcases,
                codesnippets : codesnippets,
                editorial : editorial,
                hints : hints,
                referneceSolution : referneceSolution,
            },
        });

        return res.status(201).json({
            success : true,
            message : "Problem created successfully",
            problem : newProblem,
        });

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "internal server error",
            error : error.message,
        });
    }
}

export const getAllProblems = async (req, res) => {
    try {
        const problems = await db.problem.findMany();

        if(!problems){
            return res.status(404).json({
                success : false,
                message : "No problems found",
            });
        }

        return res.status(200).json({
            success : true,
            message : "Problems fetched successfully",
            problems : problems
        });

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "internal server error",
            error : error.message,
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
                success : false,
                message : "Problem not found",
            });
        }

        return res.status(200).json({
            success : true,
            message : "Problem fetched successfully",
            problem : problem,
        });

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "internal server error",
            error : error.message,
        });
    }
}

export const updateProblem = async (req, res) => {
    const updateProblemSchema = z.object({
        title : z.string(),
        description : z.string(),
        difficulty : z.string(),
        tags : z.string(),
        examples : z.string(),
        constraints : z.string(),
        testcases : z.string(),
        codesnippets : z.string(),
        editorial : z.string(),
        hints : z.string(),
        referneceSolution : z.string()
    })

    const parseData = updateProblemSchema.safeParse(req.body)

    if(!parseData.success){
        return res.status(400).json({
            success : false,
            message : "invalid inputs",
            error : parseData.error
        })
    }

    const { id } = req.params;
    const { title, description, difficulty, tags, examples, constraints, testcases, codesnippets, editorial, hints, referneceSolution} = parseData.data

    const problem = await db.problem.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    if (!problem) {
        return res.status(404).json({
            success : false,
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
            language_id : languageId,
            source_code : solutionCode,
            stdin : input,
            expected_output : output,
            cpu_time_limit : 2,
            memory_limit : 128000,
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
                title : title,
                description : description,
                difficulty : difficulty,
                tags : tags,
                examples : examples,
                constraints : constraints,
                testcases : testcases,
                codesnippets : codesnippets,
                editorial : editorial,
                hints : hints,
                referneceSolution : referneceSolution,
            },
        });
        return res.status(200).json({
            success: true,
            message: "Problem updated successfully",
            problem: updatedProblem,
        });

    } catch (error) {
        return res.status(500).json({
            success  :false,
            message: "internal server error",
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
            success : false,
            message: "Problem not found"
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
            success : false,
            message: "internal server error",
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
            message: "internal server error",
            error: error.message
        });
    }
}