'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getLearningPath } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lightbulb, Loader2, Send, Check, Link as LinkIcon, Clock } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          Generate Path
        </>
      )}
    </Button>
  );
}

export default function LearningPathPage() {
  const initialState = { data: null, error: null };
  const [state, formAction] = useFormState(getLearningPath, initialState);

  return (
    <div className="container mx-auto grid gap-8 md:grid-cols-3">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
             <div className="flex items-center gap-2">
                <Lightbulb className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle className="text-3xl font-bold">AI Learning Path</CardTitle>
                  <CardDescription>Get a personalized learning path.</CardDescription>
                </div>
              </div>
          </CardHeader>
          <form action={formAction}>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="learningGoal">What do you want to learn?</Label>
                  <Input 
                    id="learningGoal" 
                    name="learningGoal"
                    placeholder="e.g., 'Master React Hooks'" 
                    required 
                  />
                </div>
                {state.error && (
                  <Alert variant="destructive">
                    <AlertDescription>{state.error}</AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <SubmitButton />
            </CardFooter>
          </form>
        </Card>
      </div>

      <div className="md:col-span-2">
        {useFormStatus().pending && !state.data && (
           <Card className="flex h-full min-h-[400px] flex-col items-center justify-center">
             <Loader2 className="mb-4 h-12 w-12 animate-spin text-primary" />
            <p className="text-lg font-semibold">Generating your personalized path...</p>
            <p className="text-muted-foreground">The AI is crafting your journey to mastery.</p>
          </Card>
        )}
        {state.data && (
          <Card className="bg-secondary/50">
            <CardHeader>
              <CardTitle className="text-2xl">Your Personalized Learning Path</CardTitle>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Estimated Time: {state.data.estimatedCompletionTime}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-3 text-lg font-semibold">Learning Steps</h3>
                <ul className="space-y-3">
                  {state.data.learningPath.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-3 text-lg font-semibold">Recommended Resources</h3>
                <ul className="space-y-2">
                  {state.data.recommendedResources.map((resource, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <LinkIcon className="h-4 w-4 text-primary" />
                      <a href={resource} target="_blank" rel="noopener noreferrer" className="text-primary underline-offset-4 hover:underline">
                        {resource}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
