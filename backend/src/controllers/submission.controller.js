import {db} from "../src/lib/db.js";

export const getAllSubmissions = async (req, res) => {
    try {
        const userId = req.user.id;

        const submission = await db.submission.findMany({
            where: {
                userId: userId
            }
        });

        return res.status(200).json({
            success: true,
            message: "Submissions fetched successfully",
            data: submission
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching submissions",
            error: error.message
        });
    }
}

export const getSubmissionsById = async (req, res) => {
    const userId = req.user.id;
    const problemId = parseInt(req.params.id);

    try {
        const submissions = await db.submission.findMany({
            where: {
                userId: userId,
                problemId: problemId
            }
        });
    
        return res.status(200).json({
            success: true,
            message: "Submissions fetched successfully",
            data: submissions
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching submissions",
            error: error.message
        });
    }
}

export const getSubmissionCountById = async (req, res) => {
    const userId = req.user.id;
    const problemId = parseInt(req.params.id);

    try {
        const submissionCount = await db.submission.count({
            where: {
                userId: userId,
                problemId: problemId
            }
        });

        return res.status(200).json({
            success: true,
            message: "Submission count fetched successfully",
            count : submissionCount
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching submission count",
            error: error.message
        });
    }
}