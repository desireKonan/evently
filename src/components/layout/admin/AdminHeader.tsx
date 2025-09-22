import React, { type JSX } from 'react';

interface HeaderProps {
  title: string;
  buttons?: JSX.Element | null | undefined | boolean
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  buttons
}) => {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between whitespace-nowrap border-b border-gray-200 bg-[var(--background-color)]/80 px-10 py-5 backdrop-blur-sm">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      { buttons }
    </header>
  );
};

export default Header;