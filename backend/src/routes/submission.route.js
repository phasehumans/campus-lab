import {Router} from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getAllSubmissions, getSubmissionCountById, getSubmissionsById } from "../controllers/submission.controller.js";

const submissionRouter = Router();


submissionRouter.get('/getallsubmissions', authMiddleware, getAllSubmissions)
submissionRouter.get('/get-submissions/:id', authMiddleware, getSubmissionsById)
submissionRouter.get('/get-submission-count/:id', authMiddleware, getSubmissionCountById)


export default submissionRouter;