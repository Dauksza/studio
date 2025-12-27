import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { userProfile } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Bell, Flame } from 'lucide-react';

export function Header() {
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar-1')?.imageUrl || '';
  const progressValue = (userProfile.xp / (userProfile.level * 1000)) * 100;

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <div className="md:hidden">
        <SidebarTrigger />
      </div>
      <div className="flex w-full items-center justify-end gap-4">
        <div className="hidden items-center gap-4 sm:flex">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-accent" />
            <span className="font-semibold">{userProfile.currentStreak} Days</span>
          </div>
          <div className="flex w-48 flex-col gap-1">
             <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Level {userProfile.level}</span>
              <span className="text-sm text-muted-foreground">{userProfile.xp} XP</span>
            </div>
            <Progress value={progressValue} className="h-2" />
          </div>
        </div>

        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        <Avatar>
          <AvatarImage src={userAvatar} alt={userProfile.name} />
          <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
