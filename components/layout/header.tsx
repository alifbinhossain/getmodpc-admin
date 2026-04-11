'use client';

import { useRouter } from 'next/navigation';

import { Bell, LogOut, Settings, User } from 'lucide-react';
import { toast } from 'sonner';

import { useGetMe } from '@/hooks/api/users.hooks';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import api from '@/lib/axios';
import { removeTokenCookie } from '@/lib/utils';

import { SidebarTrigger } from '../ui/sidebar';
import { Skeleton } from '../ui/skeleton';

export function Header() {
  const router = useRouter();
  const { data, isLoading } = useGetMe();
  const handleSignOut = async () => {
    try {
      await api.post('/auth/logout');
      removeTokenCookie();
      router.push('/sign-in');
      router.refresh();
      toast.success('Signed out successfully');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Invalid request';
      toast.error(message);
    }
  };

  const user = data?.data;

  return (
    <header className='flex h-16 shrink-0 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/60'>
      {/* Left — Breadcrumb placeholder */}
      {/* <div className='flex items-center gap-2 border '>
        <div className='h-4 w-px bg-border' />
      </div> */}

      <SidebarTrigger size={'icon-sm'} />

      {/* Right — Actions */}
      <div className='flex items-center gap-2'>
        {/* Notification bell */}
        <Button variant='ghost' size='icon' className='relative h-9 w-9'>
          <Bell className='h-4 w-4' />
          <span className='absolute right-1.5 top-1.5 flex h-2 w-2'>
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75' />
            <span className='relative inline-flex h-2 w-2 rounded-full bg-primary' />
          </span>
          <span className='sr-only'>Notifications</span>
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='relative h-9 w-9 rounded-full'>
              {isLoading ? (
                <Skeleton className='h-9 w-9 rounded-full' />
              ) : (
                <Avatar className='h-9 w-9'>
                  <AvatarImage src={user?.avatar} alt={user?.full_name} />
                  <AvatarFallback className='bg-primary text-sm font-semibold text-primary-foreground'>
                    {user?.full_name?.slice(0, 2)?.toUpperCase() || 'AD'}
                  </AvatarFallback>
                </Avatar>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56' align='end' forceMount>
            <DropdownMenuLabel className='font-normal'>
              {isLoading ? (
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-24' />
                  <Skeleton className='h-3 w-32' />
                </div>
              ) : (
                <div className='flex flex-col space-y-1'>
                  <p className='text-sm font-medium leading-none'>
                    {user?.full_name}
                  </p>
                  <p className='text-xs leading-none text-muted-foreground'>
                    {user?.email}
                  </p>
                </div>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => router.push('/profile')}
              className='cursor-pointer gap-2'
            >
              <User className='h-4 w-4' /> Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push('/settings')}
              className='cursor-pointer gap-2'
            >
              <Settings className='h-4 w-4' /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='cursor-pointer gap-2 text-destructive focus:text-destructive'
              onClick={handleSignOut}
            >
              <LogOut className='h-4 w-4' /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
