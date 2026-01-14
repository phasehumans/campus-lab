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
            playlists : playlists
        })

    } catch (error) {
        return res.json({
            success : false,
            message : "internal server error",
            error : error.message
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
            playlist : playlist
        })

    } catch (error) {
        return res.json({
            success : true,
            message : "internal server error",
            error : error.message
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
            errors : parseData.error
        })
    }

    const {name, description} = parseData.data
    const userId = req.user.id

    try {
        const playlist = await db.playlist.create({
            data : {
                name : name,
                description : description,
                userId : userId
            }
        })

        return res.status(200).json({
            success : true,
            message : "playlist created",
            playlist : playlist
        })

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "internal server error",
            error : error.message
        })
    }
}

export const addProblemToPlayList = async (req, res) => {
    const {playlisId} = req.params
    const problemIds = req.body

    try {
        if(!Array.isArray(problemIds) || problemIds.length === 0){
            return res.json({
                success : false,
                message : "invalid or missing problemsid"
            })
        }

        const problemInPlaylist = await db.playlist.createMany({
            data : problemIds.map((problemId) => ({
                playlisId : playlisId, 
                problemId : problemId
            }))
        })

        return res.json({
            success : true,
            message : "problem added in playlist",
            problemInPlaylist : problemInPlaylist
        })

    } catch (error) {
        return res.json({
            success : false,
            message : " internal server error",
            error : error.message
        })
    }
}

export const deletePlayList = async (req, res) => {
    const {playlistId} = req.params
    try {
        const deletedPlaylist = await db.playlist.delete({
            where : {
                id : playlistId
            }
        })

        return res.json({
            success : true,
            message : "playlist deleted",
            deletedPlaylist : deletedPlaylist
        })

    } catch (error) {
        return res.json({
            success : false,
            message : "internal server error",
            error : error.message
        })
    }
}

export const removeProblemFromPlayList = async (req, res) => {
    const {playlisId} = req.params
    const problemIds = req.body

    try {
        if (!Array.isArray(problemIds) || problemIds.length === 0) {
          return res.json({
            success : false,
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
            success : true,
            message : "deleted from playlist",
            deletetedProblem : deletetedProblem
        })

    } catch (error) {
        return res.json({
            success : false,
            message : "internal server error",
            error : error.message
        })
    }
}