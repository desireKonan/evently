import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export const LandingButton = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}: ButtonProps) => {
  const baseClasses = 'flex cursor-pointer items-center justify-center overflow-hidden rounded-lg font-bold leading-normal tracking-[0.015em] transition-colors';
  
  const variantClasses = {
    primary: 'bg-[var(--primary-color)] text-white hover:bg-[var(--primary-color-hover)] shadow-lg shadow-indigo-500/30',
    secondary: 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20',
    ghost: 'bg-transparent text-white hover:bg-[var(--card-bg)]'
  };
  
  const sizeClasses = {
    sm: 'h-10 px-4 text-sm',
    md: 'h-12 px-6 text-base',
    lg: 'h-14 px-8 text-lg'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      <span className="truncate">{children}</span>
    </button>
  );
};