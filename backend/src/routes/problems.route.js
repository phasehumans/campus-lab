import { Router } from "express";
import { authMiddleware, checkAdmin } from "../middleware/auth.middleware.js";
import { createProblem, deleteProblem, getAllProblems, getProblemById, updateProblem, getSolvedProblems } from "../controllers/problems.controller.js";

const problemRouter = Router()

problemRouter.post("/create-problem", authMiddleware, checkAdmin, createProblem)
problemRouter.get("/get-problems", authMiddleware, getAllProblems)
problemRouter.get("/get-problems/:id", authMiddleware, getProblemById)
problemRouter.put("/update-problem/:id", authMiddleware, checkAdmin, updateProblem)
problemRouter.delete("/delete-problem/:id", authMiddleware, checkAdmin, deleteProblem)
problemRouter.get("/get-solved-problems", authMiddleware, getSolvedProblems)


export default problemRouter;