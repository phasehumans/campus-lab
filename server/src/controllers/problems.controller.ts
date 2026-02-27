import type { Request, Response } from 'express'
import { Difficulty } from '@prisma/client'
import { z } from 'zod'
import { db } from '../libs/db.js'
import { getJudge0LanguageId, pollBatchResults, submitBatch } from '../libs/judge0.lib.js'

const testcaseSchema = z.object({
    input: z.string(),
    output: z.string(),
})

const problemSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']),
    tags: z.array(z.string()),
    examples: z.any(),
    constraints: z.string().min(1),
    testcases: z.array(testcaseSchema).nonempty(),
    codesnippets: z.record(z.string(), z.string()),
    editorial: z.string().optional(),
    hints: z.string().optional(),
    referneceSolution: z.record(z.string(), z.string()),
})

const readParam = (value: string | string[] | undefined): string =>
    Array.isArray(value) ? (value[0] ?? '') : (value ?? '')

const validateReferenceSolutions = async (
    testcases: Array<{ input: string; output: string }>,
    referneceSolution: Record<string, string>
): Promise<{ ok: true } | { ok: false; message: string }> => {
    for (const [language, solutionCode] of Object.entries(referneceSolution)) {
        const languageId = getJudge0LanguageId(language)

        if (!languageId) {
            return {
                ok: false,
                message: `Unsupported programming language: ${language}`,
            }
        }

        const submissions = testcases.map(({ input, output }) => ({
            language_id: languageId,
            source_code: solutionCode,
            stdin: input,
            expected_output: output,
            cpu_time_limit: 2,
            memory_limit: 128000,
        }))

        const submissionResults = await submitBatch(submissions)
        const tokens = submissionResults.map((result) => result.token)
        const results = await pollBatchResults(tokens)

        for (let i = 0; i < results.length; i += 1) {
            if (results[i].status.id !== 3) {
                return {
                    ok: false,
                    message: `Reference solution failed for language: ${language} on testcase ${i + 1}`,
                }
            }
        }
    }

    return { ok: true }
}

export const createProblem = async (req: Request, res: Response) => {
    const parseData = problemSchema.safeParse(req.body)

    if (!parseData.success) {
        return res.status(400).json({
            success: false,
            message: 'input invalid',
            error: parseData.error.flatten(),
        })
    }

    const {
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
    } = parseData.data

    if (req.user?.role !== 'ADMIN') {
        return res.status(403).json({
            success: false,
            message: 'you are not allowed to create problem',
        })
    }

    if (!req.user?.id) {
        return res.status(401).json({
            success: false,
            message: 'unauthorized',
        })
    }

    try {
        const validation = await validateReferenceSolutions(testcases, referneceSolution)
        if ('message' in validation) {
            return res.status(400).json({
                success: false,
                message: validation.message,
            })
        }

        const newProblem = await db.problem.create({
            data: {
                title,
                description,
                difficulty: difficulty as Difficulty,
                tags,
                examples,
                constraints,
                testcases,
                codesnippets,
                editorial,
                hints,
                referneceSolution,
                userId: req.user.id,
            },
        })

        return res.status(201).json({
            success: true,
            message: 'Problem created successfully',
            problem: newProblem,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}

export const getAllProblems = async (_req: Request, res: Response) => {
    try {
        const problems = await db.problem.findMany()

        return res.status(200).json({
            success: true,
            message: 'Problems fetched successfully',
            problems,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}

export const getProblemById = async (req: Request, res: Response) => {
    const id = readParam(req.params.id)

    try {
        const problem = await db.problem.findUnique({
            where: {
                id,
            },
        })

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: 'Problem not found',
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Problem fetched successfully',
            problem,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}

export const updateProblem = async (req: Request, res: Response) => {
    const parseData = problemSchema.safeParse(req.body)

    if (!parseData.success) {
        return res.status(400).json({
            success: false,
            message: 'invalid inputs',
            error: parseData.error.flatten(),
        })
    }

    const id = readParam(req.params.id)
    const {
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
    } = parseData.data

    try {
        const problem = await db.problem.findUnique({
            where: {
                id,
            },
        })

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: 'Problem not found',
            })
        }

        const validation = await validateReferenceSolutions(testcases, referneceSolution)
        if ('message' in validation) {
            return res.status(400).json({
                success: false,
                message: validation.message,
            })
        }

        const updatedProblem = await db.problem.update({
            where: {
                id,
            },
            data: {
                title,
                description,
                difficulty: difficulty as Difficulty,
                tags,
                examples,
                constraints,
                testcases,
                codesnippets,
                editorial,
                hints,
                referneceSolution,
            },
        })

        return res.status(200).json({
            success: true,
            message: 'Problem updated successfully',
            problem: updatedProblem,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}

export const deleteProblem = async (req: Request, res: Response) => {
    const id = readParam(req.params.id)

    try {
        const problem = await db.problem.findUnique({
            where: {
                id,
            },
        })

        if (!problem) {
            return res.status(404).json({
                success: false,
                message: 'Problem not found',
            })
        }

        await db.problem.delete({
            where: {
                id,
            },
        })

        return res.status(200).json({
            success: true,
            message: 'Problem deleted successfully',
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}

export const getSolvedProblems = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'unauthorized',
            })
        }

        const problems = await db.problem.findMany({
            where: {
                problemSolveds: {
                    some: {
                        userId,
                    },
                },
            },
            include: {
                problemSolveds: {
                    where: {
                        userId,
                    },
                },
            },
        })

        return res.status(200).json({
            success: true,
            message: 'Solved problems fetched successfully',
            data: problems,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}
