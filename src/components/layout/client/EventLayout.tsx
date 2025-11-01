import React from 'react';
import { Header } from '../../shared/Header';
import Footer from '../../shared/Footer';

interface LayoutProps {
  classname?: string;
  children: React.ReactNode;
}

const EventLayout: React.FC<LayoutProps> = ({ children, classname = 'min-h-screen bg-event-background text-event-foreground' }: LayoutProps) => {
  return (
    <div className={classname} style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default EventLayout;