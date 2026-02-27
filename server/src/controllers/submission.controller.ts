import type { Request, Response } from 'express'
import { db } from '../libs/db.js'

const readParam = (value: string | string[] | undefined): string =>
    Array.isArray(value) ? (value[0] ?? '') : (value ?? '')

export const getAllSubmissions = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'unauthorized',
            })
        }

        const submission = await db.submission.findMany({
            where: {
                userId,
            },
        })

        return res.status(200).json({
            success: true,
            message: 'Submissions fetched successfully',
            data: submission,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}

export const getSubmissionsById = async (req: Request, res: Response) => {
    const userId = req.user?.id
    const problemId = readParam(req.params.id)

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: 'unauthorized',
        })
    }

    try {
        const submissions = await db.submission.findMany({
            where: {
                userId,
                problemId,
            },
        })

        return res.status(200).json({
            success: true,
            message: 'Submissions fetched successfully',
            data: submissions,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}

export const getSubmissionCountById = async (req: Request, res: Response) => {
    const userId = req.user?.id
    const problemId = readParam(req.params.id)

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: 'unauthorized',
        })
    }

    try {
        const submissionCount = await db.submission.count({
            where: {
                userId,
                problemId,
            },
        })

        return res.status(200).json({
            success: true,
            message: 'Submission count fetched successfully',
            count: submissionCount,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}
