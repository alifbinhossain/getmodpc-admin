'use client';

import { NavItem } from '@/types';
import {
  AppWindow,
  Bug,
  ChartBarStacked,
  CircleFadingPlus,
  Code,
  GitPullRequestArrow,
  Images,
  LayoutDashboard,
  Mail,
  MessageCircle,
  NotepadTextDashed,
  Play,
  Rss,
  Settings,
  Shield,
  Tags,
  Tornado,
  Trash2,
  User2,
} from 'lucide-react';

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
import { SidebarItem } from './sidebar-item';

// =============================================================================
// NAV CONFIG
// =============================================================================

const NAV_ITEMS: NavItem[] = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Apps', href: '/apps', icon: AppWindow },
  { title: 'Categories', href: '/categories', icon: ChartBarStacked },
  { title: 'Tags', href: '/tags', icon: Tags },
  { title: 'Developers', href: '/developers', icon: Code },

  {
    title: 'Pages',
    href: '/pages',
    icon: NotepadTextDashed,
  },
  {
    title: 'Testimonials',
    href: '/testimonials',
    icon: User2,
  },
  {
    title: 'Faqs',
    href: '/faqs',
    icon: CircleFadingPlus,
  },
  {
    title: 'Media',
    href: '/medias',
    icon: Images,
  },
  {
    title: 'Ads',
    href: '/ads',
    icon: Tornado,
  },
  {
    title: 'Comments',
    href: '/comments',
    icon: MessageCircle,
  },
  {
    title: 'Contacts',
    href: '/contacts',
    icon: Mail,
  },
  {
    title: 'User App Requests',
    href: '/user-app-requests',
    icon: GitPullRequestArrow,
  },
  {
    title: 'Extractor APK',
    href: '/scrapings',
    icon: Play,
    children: [
      { title: 'Play Store', href: '/scrapings/play-store' },
      { title: 'LiteApks', href: '/scrapings/lite-apks' },
    ],
    disabled: true,
  },
  {
    title: 'Reports',
    href: '/report',
    icon: Bug,
    children: [
      { title: 'Reports', href: '/reports' },
      { title: 'Report Reasons', href: '/report-reasons' },
    ],
    disabled: true,
  },
  { title: 'Updated Apps', href: '/updated-apps', icon: Rss },

  { title: 'Trash', href: '/trash', icon: Trash2 },
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
                <SidebarItem key={item.title} item={item} />
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
