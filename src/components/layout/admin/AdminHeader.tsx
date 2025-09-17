import React from 'react';

interface HeaderProps {
  title: string;
  showCreateButton?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showCreateButton = true, 
  buttonText = "Créer un événement",
  onButtonClick 
}) => {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between whitespace-nowrap border-b border-gray-200 bg-[var(--background-color)]/80 px-10 py-5 backdrop-blur-sm">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      {showCreateButton && (
        <button
          onClick={onButtonClick}
          className="flex items-center gap-2 rounded-full bg-[var(--secondary-color)] px-4 py-2 text-sm font-bold text-white hover:opacity-90"
        >
          <span className="material-symbols-outlined">add_circle</span>
          <span>{buttonText}</span>
        </button>
      )}
    </header>
  );
};

export default Header;