'use server';

/**
 * @fileOverview Implements the AI Boss Battles flow where players engage in battles against AI opponents with dynamically adjusting strategies.
 *
 * - aiBossBattle - A function that initiates an AI boss battle.
 * - AIBossBattleInput - The input type for the aiBossBattle function.
 * - AIBossBattleOutput - The return type for the aiBossBattle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIBossBattleInputSchema = z.object({
  skillDomain: z
    .string()
    .describe('The domain of the skill challenge (e.g., coding, math, science, business).'),
  playerLevel: z.number().describe('The current level of the player.'),
  playerStats: z
    .string()
    .describe('The player stats that give context on player skills.'),
  battleHistory: z.string().describe('The past battle history against the boss.'),
});
export type AIBossBattleInput = z.infer<typeof AIBossBattleInputSchema>;

const AIBossBattleOutputSchema = z.object({
  scenarioDescription: z
    .string()
    .describe('The generated scenario description for the boss battle.'),
  aiOpponentStrategy: z
    .string()
    .describe('The AI opponent strategy adapted based on the player level.'),
  challengePrompt: z
    .string()
    .describe('The challenge prompt or question for the player to solve.'),
});
export type AIBossBattleOutput = z.infer<typeof AIBossBattleOutputSchema>;

export async function aiBossBattle(input: AIBossBattleInput): Promise<AIBossBattleOutput> {
  return aiBossBattleFlow(input);
}

const aiBossBattlePrompt = ai.definePrompt({
  name: 'aiBossBattlePrompt',
  input: {schema: AIBossBattleInputSchema},
  output: {schema: AIBossBattleOutputSchema},
  prompt: `You are the AI mastermind designing a boss battle for the SkillShowdown game. Your response must be in valid JSON format.

The player is level {{{playerLevel}}} and is competing in the domain of {{{skillDomain}}}.

Here is a summary of the player stats: {{{playerStats}}}.

Here is the battle history of the player against this boss: {{{battleHistory}}}.

Based on the player's skill domain and level, and the battle history, adapt the AI opponent's strategy and generate a challenging scenario description and challenge prompt. The AI strategy should be difficult but not unbeatable. 

Focus on generating a scenario that tests the player's skills.
`,
  config: {
    response: {
      format: 'json',
    },
  },
});

const aiBossBattleFlow = ai.defineFlow(
  {
    name: 'aiBossBattleFlow',
    inputSchema: AIBossBattleInputSchema,
    outputSchema: AIBossBattleOutputSchema,
  },
  async input => {
    const {output} = await aiBossBattlePrompt(input);
    return output!;
  }
);
