import {Router} from "express"
import { executeCode } from "../controllers/executecode.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"

const executionRouter = Router()

executionRouter.post("/", authMiddleware, executeCode)


export default executionRouter