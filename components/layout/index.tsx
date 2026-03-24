import { SidebarProvider } from '@/components/ui/sidebar';

import { AppSidebar } from './app-sidebar';
import { Header } from './header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='flex flex-col flex-1 overflow-hidden'>
        <Header />
        <div className='flex-1 overflow-y-auto p-6'>{children}</div>
      </main>
    </SidebarProvider>
  );
}
