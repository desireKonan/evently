import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'highlighted';
}

export const LandingCard = ({ children, className = '', variant = 'default' }: CardProps) => {
  const baseClasses = 'bg-[var(--card-bg)] rounded-xl border border-[var(--border-color)] p-8';
  
  const variantClasses = {
    default: '',
    highlighted: 'border-2 border-[var(--primary-color)] ring-4 ring-[var(--primary-color)]/20 scale-105'
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
};