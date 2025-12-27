'use server';

import { generatePersonalizedLearningPath } from '@/ai/flows/ai-generated-learning-paths';
import type { PersonalizedLearningPathOutput } from '@/ai/flows/ai-generated-learning-paths';
import { aiBossBattle } from '@/ai/flows/ai-boss-battles';
import type { AIBossBattleOutput } from '@/ai/flows/ai-boss-battles';
import { z } from 'zod';

const learningPathSchema = z.object({
  learningGoal: z.string().min(5, { message: 'Please describe your learning goal in more detail.' }),
});

export async function getLearningPath(prevState: any, formData: FormData): Promise<{data: PersonalizedLearningPathOutput | null, error: string | null}> {
  const validatedFields = learningPathSchema.safeParse({
    learningGoal: formData.get('learningGoal'),
  });

  if (!validatedFields.success) {
    return { data: null, error: validatedFields.error.flatten().fieldErrors.learningGoal?.[0] || 'Invalid input.' };
  }

  try {
    const result = await generatePersonalizedLearningPath({
      playerSkills: ['JavaScript', 'React Basics'],
      performanceData: { 'JavaScript': 0.7, 'React Basics': 0.6 },
      learningGoal: validatedFields.data.learningGoal,
    });
    return { data: result, error: null };
  } catch (e) {
    console.error(e);
    return { data: null, error: 'Failed to generate learning path. Please try again.' };
  }
}


const bossBattleSchema = z.object({
  skillDomain: z.string(),
});

export async function getBossBattle(prevState: any, formData: FormData): Promise<{data: AIBossBattleOutput | null, error: string | null}> {
   const validatedFields = bossBattleSchema.safeParse({
    skillDomain: formData.get('skillDomain'),
  });

  if (!validatedFields.success) {
    return { data: null, error: 'Invalid skill domain.' };
  }

  try {
    const result = await aiBossBattle({
      skillDomain: validatedFields.data.skillDomain,
      playerLevel: 12,
      playerStats: "Strong in algorithms, weak in system design.",
      battleHistory: "Lost previous battle due to slow response on a concurrency problem."
    });
    return { data: result, error: null };
  } catch (e) {
    console.error(e);
    return { data: null, error: 'Failed to generate boss battle. Please try again.' };
  }
}
