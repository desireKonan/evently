import React from 'react';
import { Header } from '../shared/Header';
import Footer from '../shared/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const EventLayout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-event-background text-event-foreground" style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default EventLayout;