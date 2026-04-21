import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gold' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'gold',
  size = 'md',
  loading = false,
  icon,
  className,
  disabled,
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center gap-2 font-medium tracking-wide rounded-sm transition-all duration-300 cursor-pointer relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    gold: 'bg-gradient-to-r from-[#A8860A] via-[#D4AF37] to-[#A8860A] text-black hover:shadow-[0_0_24px_rgba(212,175,55,0.5)] hover:scale-[1.02] active:scale-[0.98]',
    outline: 'bg-transparent border border-[#D4AF37]/40 text-[#D4AF37] hover:border-[#D4AF37] hover:shadow-[0_0_16px_rgba(212,175,55,0.3)] hover:bg-[rgba(212,175,55,0.05)]',
    ghost: 'bg-transparent text-[#e8e0cc] hover:text-[#D4AF37] hover:bg-[rgba(212,175,55,0.08)]',
    danger: 'bg-red-900/20 border border-red-500/30 text-red-400 hover:bg-red-900/30 hover:border-red-400',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <motion.button
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      className={cn(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...(props as any)}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
    </motion.button>
  );
};
