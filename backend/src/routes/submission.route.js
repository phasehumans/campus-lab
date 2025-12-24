import {Router} from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";

const submissionRouter = Router();


submissionRouter.get('/getallsubmissions', authMiddleware)
submissionRouter.get('/get-submissions/:id', authMiddleware)
submissionRouter.get('/get-submission-count/:id', authMiddleware)


export default submissionRouter;