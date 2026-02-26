# Literature Review

## 1. Purpose
This review summarizes practical design patterns from established coding platforms and maps them to Campus Lab's MVP scope.

## 2. Platforms Reviewed
- LeetCode: strong problem sheet and submission history UX.
- Codeforces: contest-first workflow with time-based standings.
- AtCoder: clean contest lifecycle and ranking clarity.
- HackerRank: beginner-friendly progression and profile metrics.
- Judge0: language-agnostic execution backend pattern.

## 3. Observed Patterns

### 3.1 Problem Solving Experience
- Fast problem discovery needs pagination, filters, and search.
- Editor workflow should keep run and submit as separate actions.
- Submissions must expose verdict, runtime, and memory clearly.

### 3.2 Contest Experience
- Contest pages are typically split into upcoming, live, and past.
- Live ranking generally prioritizes solved count, then penalty/time.
- Final standings are frozen at contest end for fairness and auditability.

### 3.3 Profile and Progress
- Students engage more when progress is visible by difficulty and over time.
- Contest history in profile improves motivation and transparency.

## 4. Campus Lab Decisions Derived from Review
- Keep MVP architecture as modular monolith for speed and maintainability.
- Use Judge0 integration for execution reliability and language coverage.
- Keep a single submission pipeline and tag contest submissions via `contestId`.
- Implement leaderboard cache in Redis for low-latency contest updates.
- Frontend stack is React SPA only (no Next.js in this phase).

## 5. Risks and Mitigations
- Risk: leaderboard inconsistency under burst traffic.
  - Mitigation: periodic reconciliation job from database truth.
- Risk: execution latency spikes.
  - Mitigation: queue-based execution orchestration as next scaling step.
- Risk: profile counters drift from source data.
  - Mitigation: scheduled recomputation and idempotent aggregation jobs.

## 6. Practical References
- LeetCode product surface: https://leetcode.com/problemset/
- Codeforces contests: https://codeforces.com/contests
- AtCoder contests: https://atcoder.jp/contests/
- HackerRank practice surface: https://www.hackerrank.com/domains/algorithms
- Judge0 docs and repository: https://github.com/judge0/judge0
