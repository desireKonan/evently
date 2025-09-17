import React from 'react';
import Header from './AdminHeader';
import Sidebar from './AdminSidebar';
import Footer from './AdminFooter';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

interface LayoutProps {
  children: React.ReactNode;
  pageTitle: string;
}

const Layout: React.FC<LayoutProps> = ({ children, pageTitle }) => {
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
          <Sidebar />
          <main className="flex-1 overflow-y-auto">
            <SidebarTrigger />
            <Header title={pageTitle} />
            {children}
            <Footer />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;