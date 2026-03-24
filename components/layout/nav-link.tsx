'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NavItem } from '@/types';
import { ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

import { SidebarMenuButton } from '../ui/sidebar';

export function NavLink({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive =
    pathname === item.href || pathname.startsWith(`${item.href}/`);
  const Icon = item.icon;

  return (
    <SidebarMenuButton asChild isActive={isActive}>
      <Link
        href={item.href}
        className={cn(
          'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150',
          isActive
            ? 'bg-sidebar-primary/20 text-sidebar-primary-foreground'
            : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
        )}
      >
        {Icon && (
          <Icon
            className={cn(
              'h-4 w-4 shrink-0 transition-colors',
              isActive
                ? 'text-sidebar-primary'
                : 'text-sidebar-foreground/50 group-hover:text-sidebar-accent-foreground'
            )}
          />
        )}
        <span className='truncate'>{item.title}</span>
        {item.badge !== undefined && (
          <span className='ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-sidebar-primary px-1.5 text-[10px] font-semibold text-sidebar-primary-foreground'>
            {item.badge}
          </span>
        )}
        {isActive && (
          <ChevronRight className='ml-auto h-3.5 w-3.5 opacity-60' />
        )}
      </Link>
    </SidebarMenuButton>
  );
}
