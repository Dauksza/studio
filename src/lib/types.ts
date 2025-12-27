import type { LucideIcon } from 'lucide-react';

export type Discipline = {
  id: 'coding' | 'math' | 'science' | 'business';
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
