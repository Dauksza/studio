import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { leaderboardUsers } from '@/lib/data';
import { Trophy } from 'lucide-react';

export default function LeaderboardsPage() {
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-500';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-orange-500';
    return 'text-foreground';
  };

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trophy className="h-8 w-8 text-primary" />
            <div>
              <CardTitle className="text-3xl font-bold">Leaderboards</CardTitle>
              <CardDescription>See who is at the top of their game.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Rank</TableHead>
                <TableHead>Player</TableHead>
                <TableHead className="text-right">XP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardUsers.map((user) => (
                <TableRow key={user.rank} className="font-medium">
                  <TableCell>
                    <div className={`flex items-center gap-2 text-lg font-bold ${getRankColor(user.rank)}`}>
                      {user.rank <= 3 && <Trophy className="h-5 w-5" />}
                      {user.rank}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person portrait"/>
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-lg font-semibold text-accent">{user.xp.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
