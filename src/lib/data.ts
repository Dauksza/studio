import { Code, Calculator, FlaskConical, Briefcase } from 'lucide-react';
import type { Discipline, DailyMission, LeaderboardUser, Tournament, Certificate } from './types';
import { PlaceHolderImages } from './placeholder-images';

const findImage = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

export const disciplines: Discipline[] = [
  {
    id: 'coding',
    name: 'Coding',
    description: 'Solve challenges in algorithms, data structures, and more.',
    icon: Code,
    image: findImage('coding-challenge'),
  },
  {
    id: 'math',
    name: 'Math',
    description: 'Test your skills in algebra, calculus, and logic puzzles.',
    icon: Calculator,
    image: findImage('math-challenge'),
  },
  {
    id: 'science',
    name: 'Science',
    description: 'Explore concepts in physics, biology, and chemistry.',
    icon: FlaskConical,
    image: findImage('science-challenge'),
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Tackle case studies in finance, marketing, and strategy.',
    icon: Briefcase,
    image: findImage('business-challenge'),
  },
];

export const dailyMissions: DailyMission[] = [
  { id: '1', title: 'Complete 3 Challenges', description: 'Finish any three skill challenges.', xp: 50, isCompleted: true },
  { id: '2', title: 'Daily Streak', description: 'Log in and complete one challenge.', xp: 25, isCompleted: true },
  { id: '3', title: 'Science Whiz', description: 'Complete a science challenge with a perfect score.', xp: 75, isCompleted: false },
];

export const leaderboardUsers: LeaderboardUser[] = [
  { rank: 1, name: 'CyberSamurai', xp: 12500, avatarUrl: findImage('user-avatar-1') },
  { rank: 2, name: 'CodeQueen', xp: 11800, avatarUrl: findImage('user-avatar-2') },
  { rank: 3, name: 'MathManiac', xp: 11250, avatarUrl: findImage('user-avatar-3') },
  { rank: 4, name: 'BizWhiz', xp: 10500, avatarUrl: findImage('user-avatar-4') },
  { rank: 5, name: 'SciFi_Fan', xp: 9800, avatarUrl: findImage('user-avatar-1') },
];

export const tournaments: Tournament[] = [
  { 
    id: '1', 
    title: 'The Algorithm Arena', 
    discipline: 'Coding', 
    startDate: new Date('2024-08-01T10:00:00Z'), 
    prize: '$1,000', 
    participants: 128,
    image: findImage('tournament-1'),
  },
  { 
    id: '2', 
    title: 'Calculus Clash', 
    discipline: 'Math', 
    startDate: new Date('2024-08-15T14:00:00Z'), 
    prize: '$500', 
    participants: 64,
    image: findImage('tournament-2'),
  },
];

export const certificates: Certificate[] = [
  { 
    id: '1',
    title: 'React Master', 
    discipline: 'Coding', 
    issueDate: new Date('2024-05-20T00:00:00Z'),
    image: findImage('certificate-react'),
  },
  { 
    id: '2',
    title: 'Linear Algebra Expert', 
    discipline: 'Math', 
    issueDate: new Date('2024-06-11T00:00:00Z'),
    image: findImage('certificate-algebra'),
  },
];

export const userProfile = {
  name: 'Alex',
  xp: 7230,
  level: 12,
  xpToNextLevel: 1000,
  currentStreak: 5,
};
