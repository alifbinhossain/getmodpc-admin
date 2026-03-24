'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import type { NavItem } from '@/types';
import {
  ChevronRight,
  LayoutDashboard,
  Settings,
  Shield,
  Users,
} from 'lucide-react';

import { Separator } from '@/components/ui/separator';

import { cn } from '@/lib/utils';

// =============================================================================
// NAV CONFIG
// =============================================================================

const NAV_ITEMS: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Users', href: '/users', icon: Users },
];

const NAV_SECONDARY: NavItem[] = [
  { title: 'Settings', href: '/settings', icon: Settings },
];

// =============================================================================
// COMPONENTS
// =============================================================================

function NavLink({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive =
    pathname === item.href || pathname.startsWith(`${item.href}/`);
  const Icon = item.icon;

  return (
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
      {isActive && <ChevronRight className='ml-auto h-3.5 w-3.5 opacity-60' />}
    </Link>
  );
}

export function Sidebar() {
  return (
    <aside className='flex h-screen w-64 shrink-0 flex-col overflow-hidden border-r bg-sidebar'>
      {/* Brand */}
      <div className='flex h-16 items-center gap-3 border-b border-sidebar-border px-5'>
        <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary'>
          <Shield className='h-4 w-4 text-sidebar-primary-foreground' />
        </div>
        <div>
          <p className='text-sm font-bold text-sidebar-foreground'>AdminPro</p>
          <p className='text-[10px] uppercase tracking-widest text-sidebar-foreground/50'>
            Dashboard
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className='scrollbar-thin flex flex-1 flex-col gap-1 overflow-y-auto p-3'>
        <div className='mb-2'>
          <p className='mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40'>
            Main Menu
          </p>
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </div>

        <Separator className='my-2 bg-sidebar-border' />

        <div>
          <p className='mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40'>
            System
          </p>
          {NAV_SECONDARY.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className='border-t border-sidebar-border p-3'>
        <div className='flex items-center gap-3 rounded-lg px-3 py-2'>
          <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-xs font-semibold text-sidebar-accent-foreground'>
            AD
          </div>
          <div className='flex-1 overflow-hidden'>
            <p className='truncate text-sm font-medium text-sidebar-foreground'>
              Admin User
            </p>
            <p className='truncate text-[11px] text-sidebar-foreground/50'>
              admin@company.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
