
import { Problem, Contest, UserStats, ActiveWar, JobOpening, RecentSubmission, Challenge, Repository } from '../types';
import { Database, TrendingUp, Code2 } from 'lucide-react';

export const PROBLEMS: Problem[] = [
  { id: '1', title: 'Two Sum', difficulty: 'Easy', topic: 'Arrays', acceptance: '48%', companies: ['Amazon', 'Google'] },
  { id: '2', title: 'Add Two Numbers', difficulty: 'Medium', topic: 'Linked List', acceptance: '39%', companies: ['Microsoft', 'Meta'] },
  { id: '3', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', topic: 'Strings', acceptance: '33%', companies: ['Amazon', 'Bloomberg'] },
  { id: '4', title: 'Median of Two Sorted Arrays', difficulty: 'Hard', topic: 'Arrays', acceptance: '35%', companies: ['Google', 'Apple'] },
  { id: '5', title: 'Longest Palindromic Substring', difficulty: 'Medium', topic: 'DP', acceptance: '32%', companies: ['Microsoft'] },
  { id: '6', title: 'Zigzag Conversion', difficulty: 'Medium', topic: 'Strings', acceptance: '42%', companies: ['PayPal'] },
  { id: '7', title: 'Reverse Integer', difficulty: 'Medium', topic: 'Math', acceptance: '27%', companies: ['Bloomberg'] },
  { id: '8', title: 'String to Integer (atoi)', difficulty: 'Medium', topic: 'Strings', acceptance: '16%', companies: ['Uber'] },
  { id: '9', title: 'Palindrome Number', difficulty: 'Easy', topic: 'Math', acceptance: '53%', companies: ['Cisco'] },
  { id: '10', title: 'Regular Expression Matching', difficulty: 'Hard', topic: 'DP', acceptance: '28%', companies: ['Google', 'Meta'] },
  { id: '11', title: 'Container With Most Water', difficulty: 'Medium', topic: 'Arrays', acceptance: '54%', companies: ['Amazon'] },
  { id: '12', title: 'Integer to Roman', difficulty: 'Medium', topic: 'Math', acceptance: '63%', companies: ['Adobe'] },
  { id: '13', title: 'Roman to Integer', difficulty: 'Easy', topic: 'Math', acceptance: '59%', companies: ['Apple'] },
  { id: '14', title: 'Longest Common Prefix', difficulty: 'Easy', topic: 'Strings', acceptance: '41%', companies: ['Salesforce'] },
  { id: '15', title: '3Sum', difficulty: 'Medium', topic: 'Arrays', acceptance: '33%', companies: ['Facebook', 'Amazon'] },
];

export const CONTESTS: Contest[] = [
  { id: '101', title: 'CSE Dept Weekly #45', date: 'Oct 24, 2024 8:00 PM', duration: '90 min', status: 'Upcoming', participants: 45 },
  { id: '102', title: 'Inter-Batch War 2024', date: 'Oct 20, 2024 8:00 PM', duration: '120 min', status: 'Past', participants: 210 },
  { id: '103', title: 'Freshers Initiation', date: 'Oct 25, 2024 6:00 PM', duration: '60 min', status: 'Upcoming', participants: 120 },
];

export const USER_STATS: UserStats = {
  streak: 14,
  problemsSolved: 245,
  totalProblems: 850,
  rank: 12, // College rank
  deptRank: 3, // Department rank
  contestRating: 1650,
  views: 1205,
  reputation: 450,
  solvedBreakdown: {
    easy: 120,
    medium: 95,
    hard: 30,
    totalEasy: 300,
    totalMedium: 400,
    totalHard: 150
  }
};

export const LEADERBOARD_DATA = [
  { rank: 1, name: 'Sarah (CSE-A)', score: 400, time: '45:20', country: 'USA' },
  { rank: 2, name: 'Rahul (CSE-B)', score: 390, time: '52:10', country: 'India' },
  { rank: 3, name: 'Mike (IT)', score: 350, time: '48:00', country: 'UK' },
  { rank: 4, name: 'Priya (CSE-A)', score: 320, time: '60:00', country: 'Canada' },
  { rank: 5, name: 'Alex (You)', score: 300, time: '55:30', country: 'Germany' },
];

export const ACTIVE_WARS: ActiveWar[] = [
  { 
    id: 'W1', 
    host: 'CodeMaster_99', 
    topic: 'Dynamic Programming', 
    difficulty: 'Medium', 
    participants: [
      { id: '101', name: 'CodeMaster_99', avatar: 'https://picsum.photos/seed/101/50', status: 'Ready', progress: 0 },
      { id: '102', name: 'DevJane', avatar: 'https://picsum.photos/seed/102/50', status: 'Ready', progress: 0 }
    ],
    maxParticipants: 5,
    status: 'Lobby'
  },
  { 
    id: 'W2', 
    host: 'AlgoRithm', 
    topic: 'Graph Theory', 
    difficulty: 'Hard', 
    participants: [
      { id: '201', name: 'AlgoRithm', avatar: 'https://picsum.photos/seed/201/50', status: 'Solving', progress: 45 },
      { id: '202', name: 'PyFan', avatar: 'https://picsum.photos/seed/202/50', status: 'Solving', progress: 30 },
      { id: '203', name: 'JS_Ninja', avatar: 'https://picsum.photos/seed/203/50', status: 'Solving', progress: 60 }
    ],
    maxParticipants: 5,
    status: 'In Progress'
  }
];

export const JOB_OPENINGS: JobOpening[] = [
  { id: 'J1', company: 'Google', role: 'SDE Intern (Summer 2025)', location: 'Bangalore', type: 'Internship', stipend: '₹1.2L / mo', deadline: 'Oct 30' },
  { id: 'J2', company: 'Amazon', role: 'Software Development Engineer I', location: 'Hyderabad', type: 'Full-time', stipend: '₹24 LPA', deadline: 'Nov 15' },
  { id: 'J3', company: 'Atlassian', role: 'Frontend Engineer Intern', location: 'Remote', type: 'Internship', stipend: '₹80K / mo', deadline: 'Nov 05' },
  { id: 'J4', company: 'Zomato', role: 'Backend Developer', location: 'Gurgaon', type: 'Full-time', stipend: '₹18 LPA', deadline: 'Nov 10' },
];

export const MOCK_PROBLEM_DETAIL: Problem = {
  id: '1',
  title: 'Two Sum',
  difficulty: 'Easy',
  topic: 'Arrays',
  acceptance: '48%',
  description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
  examples: [
    {
      input: 'nums = [2,7,11,15], target = 9',
      output: '[0,1]',
      explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
    },
    {
      input: 'nums = [3,2,4], target = 6',
      output: '[1,2]'
    }
  ]
};

export const RECENT_SUBMISSIONS: RecentSubmission[] = [
  { id: '1', title: 'Two Sum', status: 'Accepted', time: '2 hours ago', language: 'C++' },
  { id: '15', title: '3Sum', status: 'Wrong Answer', time: '5 hours ago', language: 'Python' },
  { id: '4', title: 'Median of Two Sorted Arrays', status: 'Time Limit Exceeded', time: '1 day ago', language: 'Java' },
  { id: '2', title: 'Add Two Numbers', status: 'Accepted', time: '2 days ago', language: 'JavaScript' },
  { id: '9', title: 'Palindrome Number', status: 'Accepted', time: '3 days ago', language: 'C++' },
];

export const BADGES = [
  { id: 1, name: 'Guardian', icon: '🛡️', date: 'Oct 2024' },
  { id: 2, name: '50 Days Badge', icon: '🔥', date: 'Sep 2024' },
  { id: 3, name: 'Algorithm II', icon: '⚡', date: 'Aug 2024' },
];

export const CHALLENGES: Challenge[] = [
  { id: '1', title: '30 Days of Arrays', description: 'Master array manipulations with daily problems.', days: 30, participants: '1.2k', color: 'bg-blue-50 text-blue-600', icon: Database },
  { id: '2', title: 'DP Bootcamp', description: 'Zero to Hero in Dynamic Programming.', days: 21, participants: '850', color: 'bg-purple-50 text-purple-600', icon: TrendingUp },
  { id: '3', title: 'Graph Theory', description: 'Deep dive into BFS, DFS and Shortest Paths.', days: 15, participants: '600', color: 'bg-emerald-50 text-emerald-600', icon: Code2 },
];

export const PINNED_REPOS: Repository[] = [
  { id: '1', name: 'campus-lab-frontend', description: 'The React frontend for our college coding platform.', language: 'TypeScript', stars: 24, forks: 12, type: 'Public' },
  { id: '2', name: 'dsa-tracker', description: 'A CLI tool to track LeetCode progress via Notion API.', language: 'Python', stars: 156, forks: 30, type: 'Public' },
  { id: '3', name: 'ecommerce-microservices', description: 'Backend microservices built with Go and gRPC.', language: 'Go', stars: 8, forks: 2, type: 'Public' },
  { id: '4', name: 'study-notes', description: 'Personal collection of CS fundamentals notes.', language: 'Markdown', stars: 45, forks: 10, type: 'Public' },
];
