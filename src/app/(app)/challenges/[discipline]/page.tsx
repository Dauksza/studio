'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import { challenges, disciplines } from '@/lib/data';
import type { Challenge } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useFormState, useFormStatus } from 'react-dom';
import { submitAnswer } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, XCircle, Loader2, ArrowRight } from 'lucide-react';

type ChallengeResult = {
  correct: boolean;
  correctAnwer: string;
  xpGained: number;
} | null;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Submitting...
        </>
      ) : (
        'Submit Answer'
      )}
    </Button>
  );
}

export default function ChallengePage({ params }: { params: { discipline: string } }) {
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [result, setResult] = useState<ChallengeResult>(null);

  const disciplineInfo = disciplines.find(d => d.id === params.discipline);
  const challengeSet = challenges.find(c => c.disciplineId === params.discipline);

  if (!disciplineInfo || !challengeSet) {
    notFound();
  }
  
  const currentChallenge: Challenge = challengeSet.challenges[currentChallengeIndex];

  const handleNextChallenge = () => {
    setResult(null);
    setSelectedOption(null);
    if (currentChallengeIndex < challengeSet.challenges.length - 1) {
      setCurrentChallengeIndex(currentChallengeIndex + 1);
    } else {
      // End of challenges for this discipline
      alert("You have completed all challenges in this category!");
      // Here you might redirect or show a summary
    }
  };

  const formAction = async (prevState: any, formData: FormData) => {
    const actionResult = await submitAnswer(prevState, formData);
    if ('correct' in actionResult) {
       setResult(actionResult);
    } else {
       // handle error
       alert(actionResult.error);
    }
    return actionResult;
  };

  const [state, wrappedFormAction] = useFormState(formAction, null);

  return (
    <div className="container mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <disciplineInfo.icon className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-3xl font-bold">{disciplineInfo.name} Challenge</CardTitle>
              <CardDescription>Question {currentChallengeIndex + 1} of {challengeSet.challenges.length}</CardDescription>
            </div>
          </div>
        </CardHeader>

        <form action={wrappedFormAction}>
          <input type="hidden" name="challengeId" value={currentChallenge.id} />
          <CardContent>
            <p className="mb-6 text-lg font-semibold">{currentChallenge.question}</p>
            <RadioGroup
              name="answer"
              value={selectedOption || ''}
              onValueChange={setSelectedOption}
              className="space-y-3"
              disabled={!!result}
            >
              {currentChallenge.options.map((option) => (
                <div key={option} className="flex items-center space-x-3">
                  <RadioGroupItem value={option} id={option} />
                  <Label htmlFor={option} className="text-base">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter>
            {!result && <SubmitButton />}
          </CardFooter>
        </form>

        {result && (
          <CardFooter className="flex flex-col gap-4">
             <Alert variant={result.correct ? 'default' : 'destructive'} className={result.correct ? 'border-green-500' : ''}>
              {result.correct ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              <AlertTitle>{result.correct ? 'Correct!' : 'Incorrect'}</AlertTitle>
              <AlertDescription>
                {result.correct ? `You earned ${result.xpGained} XP!` : `The correct answer was: ${result.correctAnwer}`}
              </AlertDescription>
            </Alert>
            <Button onClick={handleNextChallenge} className="w-full">
              Next Question <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
