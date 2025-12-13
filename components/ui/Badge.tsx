import React from 'react';
import { cn } from '../../utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'destructive' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({ className, variant = 'default', ...props }) => {
  const variants = {
    default: "bg-blue-900/50 text-blue-200 border-blue-800",
    success: "bg-emerald-900/50 text-emerald-300 border-emerald-800",
    destructive: "bg-rose-900/50 text-rose-300 border-rose-800",
    outline: "text-slate-300 border-slate-700",
  };

  return (
    <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", variants[variant], className)} {...props} />
  );
};