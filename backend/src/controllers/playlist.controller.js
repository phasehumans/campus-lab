import {db} from "../libs/db.js"
import {success, z} from "zod"

export const getAllPlaylist = async (req, res) => {
    try {
        const playlists = await db.playlist.findMany({
            where : {
                userId : req.user.id
            },
            include : {
                problems : {
                    include : {
                        problem : true
                    }
                }
            }
        })

        return res.status(200).json({
            success : true,
            message : "playlist fetched",
            playlists
        })
    } catch (error) {
        return res.json({
            success : false,
            message : "internal server error"
        })
    }
}

export const getPlayListDetails = async (req, res) => {
    const {playlisId} = req.params

    try {
        const playlist = await db.playlist.findMany({
            where : {
                userId : req.user.id,
                id : playlisId
            },
            include : {
                problems : {
                    include : {
                        problem : true
                    }
                }
            }
        })

        if(!playlist) {
            return res.json({
                success : false,
                message : "playlist not found"
            })
        }

        return res.json({
            success : true,
            message : "playlist fetched",
            playlist
        })

    } catch (error) {
        return res.json({
            success : true,
            message : "internal server error"
        })
    }
}

export const createPlayList = async (req, res) => {

    const createPlaylistSchema = z.object({
        name : z.string(),
        description : z.string()
    })

    const parseData = createPlaylistSchema.safeParse(req.body)

    if(!parseData.success){
        return res.status(400).json({
            success : true,
            message : "invalid inputs",
            errors : parseData.error.flatten()
        })
    }

    const {name, description} = parseData.data
    const userId = req.user.id

    try {
        const playlist = await db.playlist.create({
            data : {
                name,
                description,
                userId
            }
        })

        return res.status(200).json({
            success : true,
            message : "playlist created"
        })
    } catch (error) {
        return res.status(500).json({
            message : "server error"
        })
    }
}

export const addProblemToPlayList = async (req, res) => {
    const {playlisId} = req.params
    const problemIds = req.body

    try {
        if(!Array.isArray(problemIds) || problemIds.length === 0){
            return res.json({
                message : "invalid or missing problemsid"
            })
        }

        const problemInPlaylist = await db.playlist.createMany({
            data : problemIds.map((problemId) => ({
                playlisId, 
                problemId
            }))
        })

        return res.json({
            message : "problem added in playlist",
            problemInPlaylist
        })
    } catch (error) {
        return res.json({
            message : " internal server error"
        })
    }
}

export const deletePlayList = async (req, res) => {
    const {playlisId} = req.params
    try {
        const deletedPlaylist = await db.playlist.delete({
            where : {
                id : playlisId
            }
        })

        return res.json({
            message : "playlist deleted",
            deletedPlaylist
        })
    } catch (error) {
        return res.json({
            message : "server error"
        })
    }
}

export const removeProblemFromPlayList = async (req, res) => {
    const {playlisId} = req.params
    const problemIds = req.body

    try {
        if (!Array.isArray(problemIds) || problemIds.length === 0) {
          return res.json({
            message: "invalid or missing problemsid",
          });
        }

        const deletetedProblem = await db.playlist.delete({
            where : {
                playlisId,
                problemId : {
                    in : problemIds
                }
            }
        })

        return res.json({
            message : "deleted from playlist"
        })
    } catch (error) {
        return res.json({
            message : "server error"
        })
    }
}