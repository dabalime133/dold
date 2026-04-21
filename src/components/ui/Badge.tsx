import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'green' | 'red' | 'blue' | 'glass';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'gold', className }) => {
  const variants = {
    gold: 'bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30',
    green: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
    red: 'bg-red-500/10 text-red-400 border border-red-500/30',
    blue: 'bg-blue-500/10 text-blue-400 border border-blue-500/30',
    glass: 'bg-white/5 text-white/70 border border-white/10',
  };

  return (
    <span className={cn(
      'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium tracking-wide',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};
