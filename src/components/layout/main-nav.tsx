'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Trophy,
  Lightbulb,
  Target,
  Medal,
  Flame,
  User,
} from 'lucide-react';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/leaderboards', label: 'Leaderboards', icon: Trophy },
  { href: '/tournaments', label: 'Tournaments', icon: Flame },
  { href: '/learning-path', label: 'Learning Path', icon: Lightbulb },
  { href: '/boss-battles', label: 'Boss Battles', icon: Target },
  { href: '/certificates', label: 'Certificates', icon: Medal },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.label}>
          <Link href={item.href} legacyBehavior passHref>
            <SidebarMenuButton
              isActive={pathname === item.href}
              className="w-full justify-start"
              tooltip={{ children: item.label }}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-base font-medium">{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
