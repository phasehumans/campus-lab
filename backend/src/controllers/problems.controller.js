import { use } from "react";
import { db } from "../libs/db.js";
import { getJudge0LanguageId, submitBatch } from "../libs/judge0.lib.js";

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
                    userId: req.user.id,
                }
            }); 
    
            return res.status(201).json({
                message: "Problem created successfully",
                problem: newProblem,
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while creating the problem",
            error: error.message,
        });
    }
}

export const getAllProblems = async (req, res) => {

}

export const getProblemById = async (req, res) => {

}

export const updateProblem = async (req, res) => {

}

export const deleteProblem = async (req, res) => {

}

export const getSolvedProblems = async (req, res) => {

}