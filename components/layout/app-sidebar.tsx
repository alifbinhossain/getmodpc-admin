'use client';

import { NavItem } from '@/types';
import { LayoutDashboard, Settings, Shield, User2, Users } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { NavLink } from './nav-link';

// =============================================================================
// NAV CONFIG
// =============================================================================

const NAV_ITEMS: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  {
    title: 'Users',
    href: '/users',
    icon: Users,
  },
];

const NAV_SECONDARY: NavItem[] = [
  { title: 'Settings', href: '/settings', icon: Settings },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        {/* Brand */}
        <SidebarGroup>
          <div className='flex   items-center gap-3 '>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary'>
              <Shield className='h-4 w-4 text-sidebar-primary-foreground' />
            </div>
            <div>
              <p className='text-sm font-bold text-sidebar-foreground'>
                GetModPC
              </p>
              <p className='text-[10px] uppercase tracking-widest text-sidebar-foreground/50'>
                Dashboard
              </p>
            </div>
          </div>
        </SidebarGroup>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink item={item} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel> System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_SECONDARY.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink item={item} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <User2 /> Username
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
