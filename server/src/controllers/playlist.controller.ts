import type { Request, Response } from 'express'
import { z } from 'zod'
import { db } from '../libs/db.js'

const createPlaylistSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
})

const problemIdsSchema = z.array(z.string().min(1)).nonempty()
const readParam = (value: string | string[] | undefined): string =>
    Array.isArray(value) ? (value[0] ?? '') : (value ?? '')

export const getAllPlaylist = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'unauthorized',
            })
        }

        const playlists = await db.playlist.findMany({
            where: {
                userId,
            },
            include: {
                problems: {
                    include: {
                        problem: true,
                    },
                },
            },
        })

        return res.status(200).json({
            success: true,
            message: 'playlist fetched',
            playlists,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}

export const getPlayListDetails = async (req: Request, res: Response) => {
    const playlistId = readParam(req.params.playlistId)

    try {
        const userId = req.user?.id
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'unauthorized',
            })
        }

        const playlist = await db.playlist.findFirst({
            where: {
                userId,
                id: playlistId,
            },
            include: {
                problems: {
                    include: {
                        problem: true,
                    },
                },
            },
        })

        if (!playlist) {
            return res.status(404).json({
                success: false,
                message: 'playlist not found',
            })
        }

        return res.status(200).json({
            success: true,
            message: 'playlist fetched',
            playlist,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}

export const createPlayList = async (req: Request, res: Response) => {
    const parseData = createPlaylistSchema.safeParse(req.body)

    if (!parseData.success) {
        return res.status(400).json({
            success: false,
            message: 'invalid inputs',
            errors: parseData.error.flatten(),
        })
    }

    const { name, description } = parseData.data
    const userId = req.user?.id
    if (!userId) {
        return res.status(401).json({
            success: false,
            message: 'unauthorized',
        })
    }

    try {
        const playlist = await db.playlist.create({
            data: {
                name,
                description,
                userId,
            },
        })

        return res.status(201).json({
            success: true,
            message: 'playlist created',
            playlist,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}

export const addProblemToPlayList = async (req: Request, res: Response) => {
    const playlistId = readParam(req.params.playlistId)
    const parsedBody = problemIdsSchema.safeParse(req.body)

    if (!parsedBody.success) {
        return res.status(400).json({
            success: false,
            message: 'invalid or missing problemIds',
            errors: parsedBody.error.flatten(),
        })
    }

    const problemIds = parsedBody.data

    try {
        const problemInPlaylist = await db.problemPlaylist.createMany({
            data: problemIds.map((problemId) => ({
                playListId: playlistId,
                problemId,
            })),
            skipDuplicates: true,
        })

        return res.status(200).json({
            success: true,
            message: 'problem added in playlist',
            problemInPlaylist,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}

export const deletePlayList = async (req: Request, res: Response) => {
    const playlistId = readParam(req.params.playlistId)
    try {
        const userId = req.user?.id
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'unauthorized',
            })
        }

        const playlist = await db.playlist.findFirst({
            where: {
                id: playlistId,
                userId,
            },
        })

        if (!playlist) {
            return res.status(404).json({
                success: false,
                message: 'playlist not found',
            })
        }

        const deletedPlaylist = await db.playlist.delete({
            where: {
                id: playlistId,
            },
        })

        return res.status(200).json({
            success: true,
            message: 'playlist deleted',
            deletedPlaylist,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}

export const removeProblemFromPlayList = async (req: Request, res: Response) => {
    const playlistId = readParam(req.params.playlistId)
    const parsedBody = problemIdsSchema.safeParse(req.body)

    if (!parsedBody.success) {
        return res.status(400).json({
            success: false,
            message: 'invalid or missing problemIds',
            errors: parsedBody.error.flatten(),
        })
    }

    const problemIds = parsedBody.data

    try {
        const deletedProblems = await db.problemPlaylist.deleteMany({
            where: {
                playListId: playlistId,
                problemId: {
                    in: problemIds,
                },
            },
        })

        return res.status(200).json({
            success: true,
            message: 'deleted from playlist',
            deletedProblems,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'internal server error',
            error: (error as Error).message,
        })
    }
}
