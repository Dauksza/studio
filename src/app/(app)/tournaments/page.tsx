import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { tournaments } from '@/lib/data';
import { ArrowRight, Calendar, Users, Award, Flame } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function TournamentsPage() {
  return (
    <div className="container mx-auto space-y-8">
       <div className="flex items-center gap-2">
            <Flame className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Tournaments</h1>
              <p className="text-muted-foreground">Compete for glory and prizes.</p>
            </div>
          </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {tournaments.map((tournament) => (
          <Card key={tournament.id} className="group flex flex-col overflow-hidden transition-all hover:shadow-lg">
             <div className="relative h-56 w-full">
              <Image
                src={tournament.image}
                alt={tournament.title}
                layout="fill"
                objectFit="cover"
                data-ai-hint="esports competition"
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <Badge variant="secondary" className="mb-2">{tournament.discipline}</Badge>
                <CardTitle className="text-2xl font-bold text-white">{tournament.title}</CardTitle>
              </div>
            </div>
            <CardContent className="flex-grow p-6">
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{tournament.startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{tournament.participants} Participants</span>
                </div>
                 <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  <span>{tournament.prize} Prize Pool</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                Enter Tournament <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
