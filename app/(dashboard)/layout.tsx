import { Toaster } from 'sonner';

import Layout from '@/components/layout';
import { GlobalFormModal } from '@/components/shared/global-form-modal';

import { QueryProvider } from '@/lib/react-query';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <QueryProvider>
      <Layout>
        {children}
        <GlobalFormModal />
        <Toaster />
      </Layout>
    </QueryProvider>
  );
}
