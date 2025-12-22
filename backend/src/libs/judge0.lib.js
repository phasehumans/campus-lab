import axios from "axios";
export const getJudge0LanguageId = (language) => {
    const languageMap = {
        "Python": 71,
        "JavaScript": 63,
        "C++": 54,
        "Java": 62,
    }

    return languageMap[language.toUpperCase()] || null;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const pollBatchResults = async (tokens) => {
    while (true) {
        const {data} = await axios.get(`${process.env.JUDGE_API_URL}/submissions/batch`, {
            params : {
                tokens: tokens.join(","),
                base64_encoded: false,
            }
        })

        const results = data.submissions;

        const isAllDone = results.every((res) => res.status.id !== 1 && res.status.id !== 2);

        if (isAllDone) {
            return results;
        }

        await sleep(1000);
    }

}


export const submitBatch = async (submissions) => {
    const {data} = await axios.post(`${process.env.JUDGE_API_URL}/submissions/batch?base64_encoded=false`, {
        submission: submissions,
    })

    return data
}