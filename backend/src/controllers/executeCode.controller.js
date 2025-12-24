import { pollBatchResults, submitBatch } from "../libs/judge0.lib";

export const executeCode = async (req, res) => {
    const { source_code, language_id, stdin, expected_outputs, problemId } = req.body;
    const userId = req.user.id;

    try {
        if(!Array.isArray(stdin) || stdin.length === 0 || !Array.isArray(expected_outputs) || expected_outputs.length == stdin.length) {
            return res.status(400).json({
                error: "invalid or missing test cases" 
            });
        }

        const submissons = stdin.map((input) => ({
            source_code,
            language_id,
            stdin: input,
            // base64_encoded: false,
            // wait: false
        }));

        const submitResponses = await submitBatch(submissons);
        
        const tokens = submitResponses.map(response => response.token);

        const results = await pollBatchResults(tokens);

        

        
    } catch (error) {
        
    }
}