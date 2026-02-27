import axios from 'axios'

type Judge0BatchTokenResponse = { token: string }

type Judge0Result = {
    status: { id: number; description: string }
    stdout: string | null
    stderr: string | null
    compile_output: string | null
    memory: number | null
    time: string | null
}

type Judge0BatchResultsResponse = { submissions: Judge0Result[] }

type Judge0Submission = {
    source_code: string
    language_id: number
    stdin?: string
    expected_output?: string
    cpu_time_limit?: number
    memory_limit?: number
}

export const getJudge0LanguageId = (language: string): number | null => {
    const languageMap: Record<string, number> = {
        PYTHON: 71,
        JAVASCRIPT: 63,
        'C++': 54,
        JAVA: 62,
    }

    return languageMap[language.toUpperCase()] ?? null
}

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

export const pollBatchResults = async (tokens: string[]): Promise<Judge0Result[]> => {
    while (true) {
        const { data } = await axios.get<Judge0BatchResultsResponse>(
            `${process.env.JUDGE_API_URL}/submissions/batch`,
            {
                params: {
                    tokens: tokens.join(','),
                    base64_encoded: false,
                },
            }
        )

        const results = data.submissions
        const isAllDone = results.every(
            (result) => result.status.id !== 1 && result.status.id !== 2
        )

        if (isAllDone) {
            return results
        }

        await sleep(1000)
    }
}

export const submitBatch = async (
    submissions: Judge0Submission[]
): Promise<Judge0BatchTokenResponse[]> => {
    const { data } = await axios.post<{ submissions: Judge0BatchTokenResponse[] }>(
        `${process.env.JUDGE_API_URL}/submissions/batch?base64_encoded=false`,
        {
            submissions,
        }
    )

    return data.submissions
}

export const getJudge0LanguageName = (languageId: number): string => {
    const languageMap: Record<number, string> = {
        71: 'Python',
        63: 'JavaScript',
        54: 'C++',
        62: 'Java',
    }
    return languageMap[languageId] ?? 'Unknown'
}
