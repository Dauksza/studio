import type { LucideIcon } from 'lucide-react';

export type DisciplineId = 'coding' | 'math' | 'science' | 'business';

export type Discipline = {
  id: DisciplineId;
  name: string;
  description: string;
  icon: LucideIcon;
  image: string;
};

export type DailyMission = {
  id: string;
  title: string;
  description: string;
  xp: number;
  isCompleted: boolean;
};

export type LeaderboardUser = {
  rank: number;
  name: string;
  xp: number;
  avatarUrl: string;
};

export type Tournament = {
  id: string;
  title: string;
  discipline: string;
  startDate: Date;
  prize: string;
  participants: number;
  image: string;
};

export type Certificate = {
  id: string;
  title: string;
  discipline: string;
  issueDate: Date;
  image: string;
};

export type Challenge = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  xp: number;
};

export type ChallengeSet = {
  disciplineId: DisciplineId;
  disciplineName: string;
  challenges: Challenge[];
};
