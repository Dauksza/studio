'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getBossBattle } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Target, Loader2, Swords } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { disciplines } from '@/lib/data';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Summoning Boss...
        </>
      ) : (
        <>
          <Swords className="mr-2 h-4 w-4" />
          Start Battle
        </>
      )}
    </Button>
  );
}

export default function BossBattlesPage() {
  const initialState = { data: null, error: null };
  const [state, formAction] = useFormState(getBossBattle, initialState);

  return (
    <div className="container mx-auto grid gap-8 md:grid-cols-3">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
             <div className="flex items-center gap-2">
                <Target className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle className="text-3xl font-bold">AI Boss Battle</CardTitle>
                  <CardDescription>Face the ultimate test of skill.</CardDescription>
                </div>
              </div>
          </CardHeader>
          <form action={formAction}>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="skillDomain">Choose your battlefield</Label>
                  <Select name="skillDomain" required defaultValue="coding">
                    <SelectTrigger id="skillDomain">
                      <SelectValue placeholder="Select a domain" />
                    </SelectTrigger>
                    <SelectContent>
                      {disciplines.map(d => (
                        <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
            <p className="text-lg font-semibold">The boss is preparing...</p>
            <p className="text-muted-foreground">A formidable challenge awaits.</p>
          </Card>
        )}
        {state.data && (
          <Card className="bg-secondary/50">
            <CardHeader>
              <CardTitle className="text-2xl">Battle Scenario</CardTitle>
              <CardDescription>{state.data.scenarioDescription}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-2 text-lg font-semibold text-destructive">Opponent's Strategy</h3>
                <p className="text-sm text-muted-foreground">{state.data.aiOpponentStrategy}</p>
              </div>
              <Alert>
                <AlertTitle className="font-bold">Your Challenge</AlertTitle>
                <AlertDescription>
                  {state.data.challengePrompt}
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Submit Answer</Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
