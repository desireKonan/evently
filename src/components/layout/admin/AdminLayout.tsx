import React, { type JSX } from 'react';
import Header from './AdminHeader';
import Sidebar from './AdminSidebar';
import Footer from './AdminFooter';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { SidebarStateProvider } from '@/contexts/SidebarContext';
interface LayoutProps {
  children: React.ReactNode;
  pageTitle: string;
  buttons?: JSX.Element | null | undefined | boolean
}

const Layout: React.FC<LayoutProps> = ({ children, pageTitle, buttons }) => {
  return (
    <SidebarProvider>
      <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden"
        style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}>

        {/* Variables CSS pour les couleurs */}
        <style>
          {`
          :root {
            --primary-color: #16a085;
            --secondary-color: #27ae60;
            --accent-color: #f39c12;
            --background-color: #ecf0f1;
            --text-color: #2c3e50;
            --sidebar-bg: #ffffff;
          }
        `}
        </style>

        <div className="flex h-full grow flex-row">
          <SidebarStateProvider
            defaultSelectedItem="dashboard"
            defaultOpen={true}
          >
            <Sidebar />
            <main className="flex-1 bg-event-background overflow-y-auto">
              <SidebarTrigger />
              <Header title={pageTitle} buttons={buttons} />
              {children}
              <Footer />
            </main>
          </SidebarStateProvider>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;