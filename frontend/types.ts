
export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic: string;
  acceptance: string;
  companies?: string[];
  description?: string;
  examples?: { input: string; output: string; explanation?: string }[];
}

export interface Contest {
  id: string;
  title: string;
  date: string;
  duration: string;
  status: 'Upcoming' | 'Live' | 'Past';
  participants: number;
}

export interface UserStats {
  streak: number;
  problemsSolved: number;
  totalProblems: number;
  rank: number; // College Rank
  deptRank: number; // Department Rank
  contestRating: number;
  views: number;
  reputation: number;
  solvedBreakdown: {
    easy: number;
    medium: number;
    hard: number;
    totalEasy: number;
    totalMedium: number;
    totalHard: number;
  };
}

export interface RecentSubmission {
  id: string;
  title: string;
  status: 'Accepted' | 'Wrong Answer' | 'Time Limit Exceeded';
  time: string;
  language: string;
}

export interface WarRoomUser {
  id: string;
  name: string;
  avatar: string;
  status: 'Ready' | 'Waiting' | 'Solving' | 'Finished';
  progress: number; // 0-100
}

export enum GameState {
  MENU = 'MENU',
  JOIN = 'JOIN',
  LOBBY = 'LOBBY',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED'
}

export interface JobOpening {
  id: string;
  company: string;
  role: string;
  location: string;
  type: 'Internship' | 'Full-time';
  stipend?: string;
  deadline: string;
}

export interface ActiveWar {
  id: string;
  host: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  participants: WarRoomUser[];
  maxParticipants: number;
  status: 'Lobby' | 'In Progress';
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  days: number;
  participants: string;
  color: string;
  icon: any;
}

export interface Repository {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  type: 'Public' | 'Private';
}
