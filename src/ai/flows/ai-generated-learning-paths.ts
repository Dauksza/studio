'use server';

/**
 * @fileOverview AI-powered learning path generator.
 *
 * This file defines a Genkit flow that dynamically creates personalized learning paths for players
 * based on their performance data. The flow takes player performance metrics as input and outputs
 * a structured learning path optimized for skill improvement.
 *
 * @exports {
 *   generatePersonalizedLearningPath - The function to trigger the learning path generation.
 *   PersonalizedLearningPathInput - The input type for the function.
 *   PersonalizedLearningPathOutput - The output type for the function.
 * }
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the personalized learning path flow
const PersonalizedLearningPathInputSchema = z.object({
  playerSkills: z
    .array(z.string())
    .describe('List of skills the player currently possesses.'),
  performanceData: z
    .record(z.number())
    .describe(
      'Record of the player performance data for each skill, represented as skill names and performance scores.'
    ),
  learningGoal: z
    .string()
    .describe('The specific skill or area the player wants to improve.'),
});
export type PersonalizedLearningPathInput = z.infer<
  typeof PersonalizedLearningPathInputSchema
>;

// Define the output schema for the personalized learning path flow
const PersonalizedLearningPathOutputSchema = z.object({
  learningPath: z
    .array(z.string())
    .describe(
      'A step-by-step learning path tailored to the player, including specific topics, resources, and practice exercises.'
    ),
  estimatedCompletionTime: z
    .string()
    .describe('Estimated time to complete the generated learning path.'),
  recommendedResources: z
    .array(z.string())
    .describe(
      'A curated list of resources (links, books, tutorials) relevant to the learning path.'
    ),
});
export type PersonalizedLearningPathOutput = z.infer<
  typeof PersonalizedLearningPathOutputSchema
>;

// Exported function to generate personalized learning paths
export async function generatePersonalizedLearningPath(
  input: PersonalizedLearningPathInput
): Promise<PersonalizedLearningPathOutput> {
  return personalizedLearningPathFlow(input);
}

// Define the prompt for generating the learning path
const personalizedLearningPathPrompt = ai.definePrompt({
  name: 'personalizedLearningPathPrompt',
  input: {schema: PersonalizedLearningPathInputSchema},
  output: {schema: PersonalizedLearningPathOutputSchema},
  prompt: `You are an expert learning path generator. Your response must be in valid JSON format. 
  
  Based on the players existing skills: {{{playerSkills}}}, and their performance data: {{{performanceData}}}, and their goal of: {{{learningGoal}}}, create a personalized learning path.

    The learning path should be a step-by-step guide with specific topics, resources, and practice exercises. It should also estimate the time to complete the learning path and recommend relevant resources.
    `,
    config: {
    response: {
      format: 'json',
    },
  },
});

// Define the Genkit flow for generating personalized learning paths
const personalizedLearningPathFlow = ai.defineFlow(
  {
    name: 'personalizedLearningPathFlow',
    inputSchema: PersonalizedLearningPathInputSchema,
    outputSchema: PersonalizedLearningPathOutputSchema,
  },
  async input => {
    const {output} = await personalizedLearningPathPrompt(input);
    return output!;
  }
);
