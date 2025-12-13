import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import 'react';

declare module 'react' {
  interface HTMLAttributes<T> {
    className?: string;
  }
  interface SVGAttributes<T> {
    className?: string;
  }
  interface LabelHTMLAttributes<T> {
    htmlFor?: string;
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}