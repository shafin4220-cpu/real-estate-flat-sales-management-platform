import React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl border border-black/10 ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-[#EEEEEE] flex items-center justify-center text-black/60 mb-3.5">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-black">{title}</h3>
      <p className="text-xs text-black/60 max-w-sm mt-1 mb-4 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
