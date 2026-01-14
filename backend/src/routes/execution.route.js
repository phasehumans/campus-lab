import {Router} from "express"
import { executeCode } from "../controllers/executeCode.controller"
import { authMiddleware } from "../middleware/auth.middleware"

const executionRouter = Router()

executionRouter.post("/", authMiddleware, executeCode)


export default executionRouter