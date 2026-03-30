import { Toaster } from 'sonner';

import Layout from '@/components/layout';
import { GlobalFormModal } from '@/components/shared/global-form-modal';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <Layout>
      {children}
      <GlobalFormModal />
      <Toaster />
    </Layout>
  );
}
