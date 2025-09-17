// components/layout/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-event-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-sm text-muted-foreground">
        <p>© { new Date().getFullYear() } Evently. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;