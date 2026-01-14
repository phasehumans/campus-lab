import {Router} from "express"
import { authMiddleware } from "../middleware/auth.middleware"
import { addProblemToPlayList, createPlayList, deletePlayList, getAllPlaylist, getPlayListDetails, removeProblemFromPlayList } from "../controllers/playlist.controller"

const playListRouter = Router()

playListRouter.get("/", authMiddleware, getAllPlaylist)
playListRouter.get("/:playlistId", authMiddleware, getPlayListDetails)
playListRouter.post("create-playlist", authMiddleware, createPlayList)
playListRouter.post("/:playlistId/add-problem", authMiddleware, addProblemToPlayList)
playListRouter.delete("/:playlistId/" , authMiddleware, deletePlayList)
playListRouter.delete("/:playlsiId/remove-problem", authMiddleware, removeProblemFromPlayList)

export default playListRouter