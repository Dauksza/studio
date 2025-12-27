import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { disciplines, dailyMissions } from '@/lib/data';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="container mx-auto">
      <div className="space-y-8">
        <section>
          <h2 className="mb-4 text-3xl font-bold tracking-tight">Choose Your Challenge</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {disciplines.map((discipline) => (
              <Card key={discipline.id} className="group flex flex-col overflow-hidden transition-all hover:shadow-lg">
                <div className="relative h-40 w-full">
                  <Image
                    src={discipline.image}
                    alt={discipline.name}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={`${discipline.id} abstract`}
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <discipline.icon className="mb-2 h-8 w-8 text-white" />
                    <CardTitle className="text-2xl font-bold text-white">{discipline.name}</CardTitle>
                  </div>
                </div>
                <CardContent className="flex-grow p-6">
                  <CardDescription>{discipline.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    View Challenges <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-3xl font-bold tracking-tight">Daily Missions</h2>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-4">
                {dailyMissions.map((mission) => (
                  <li key={mission.id} className="flex items-center justify-between rounded-lg bg-secondary p-4">
                    <div className="flex items-center gap-4">
                       {mission.isCompleted ? (
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                      ) : (
                        <div className="h-6 w-6 rounded-full border-2 border-primary" />

                      )}
                      <div>
                        <p className="font-semibold">{mission.title}</p>
                        <p className="text-sm text-muted-foreground">{mission.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                       <p className="font-bold text-accent">+{mission.xp} XP</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
