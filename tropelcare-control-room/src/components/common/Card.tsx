import type { ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ children, className = '', ...props }: CardProps) {
  return (
    <div
      className={`bg-gray-800 border border-gray-700 rounded-lg p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
