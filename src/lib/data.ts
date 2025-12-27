import { Code, Calculator, FlaskConical, Briefcase } from 'lucide-react';
import type { Discipline, DailyMission, LeaderboardUser, Tournament, Certificate, ChallengeSet } from './types';
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

export const challenges: ChallengeSet[] = [
  {
    disciplineId: 'coding',
    disciplineName: 'Coding',
    challenges: [
      { id: 'C1', question: "What is the output of `console.log(typeof null)` in JavaScript?", options: ["'null'", "'object'", "'undefined'", "'symbol'"], correctAnswer: "'object'", xp: 10 },
      { id: 'C2', question: "Which of the following is NOT a JavaScript data type?", options: ["Number", "String", "Boolean", "Float"], correctAnswer: "Float", xp: 10 },
      { id: 'C3', question: "What does the `===` operator do?", options: ["Compares for equality without type coercion", "Assigns a value", "Compares for equality with type coercion", "Checks for object similarity"], correctAnswer: "Compares for equality without type coercion", xp: 20 },
    ],
  },
  {
    disciplineId: 'math',
    disciplineName: 'Math',
    challenges: [
      { id: 'M1', question: "What is the value of Pi (to two decimal places)?", options: ["3.12", "3.14", "3.16", "3.18"], correctAnswer: "3.14", xp: 10 },
      { id: 'M2', question: "What is the next number in the sequence: 1, 1, 2, 3, 5, 8, ...?", options: ["13", "11", "21", "15"], correctAnswer: "13", xp: 10 },
      { id: 'M3', question: "What is the square root of 144?", options: ["10", "11", "12", "14"], correctAnswer: "12", xp: 20 },
    ],
  },
    {
    disciplineId: 'science',
    disciplineName: 'Science',
    challenges: [
      { id: 'S1', question: "What is the chemical symbol for water?", options: ["H2O", "O2", "CO2", "NaCl"], correctAnswer: "H2O", xp: 10 },
      { id: 'S2', question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correctAnswer: "Mars", xp: 10 },
      { id: 'S3', question: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondrion", "Chloroplast"], correctAnswer: "Mitochondrion", xp: 20 },
    ],
  },
  {
    disciplineId: 'business',
    disciplineName: 'Business',
    challenges: [
      { id: 'B1', question: "What does SWOT stand for?", options: ["Strengths, Weaknesses, Opportunities, Threats", "Sales, Workforce, Operations, Technology", "Strategy, Work, Organization, Timing", "Service, Warranty, Output, Tasks"], correctAnswer: "Strengths, Weaknesses, Opportunities, Threats", xp: 10 },
      { id: 'B2', question: "Which of these is a type of market structure?", options: ["Monopoly", "Duopoly", "Oligopoly", "All of the above"], correctAnswer: "All of the above", xp: 10 },
      { id: 'B3', question: "What is ROI?", options: ["Return on Investment", "Rate of Inflation", "Risk of Insolvency", "Return on Initiative"], correctAnswer: "Return on Investment", xp: 20 },
    ],
  },
];
