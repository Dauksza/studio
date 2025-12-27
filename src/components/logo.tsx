import { ShieldCheck } from 'lucide-react';
import * as React from 'react';

export function Logo() {
  return (
    <div className="flex items-center justify-center gap-2 text-lg font-bold text-primary">
      <ShieldCheck className="h-7 w-7" />
      <h1 className="font-headline text-xl">SkillShowdown</h1>
    </div>
  );
}
