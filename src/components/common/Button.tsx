import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'text-xs py-1.5 px-3 rounded-lg gap-1.5 min-h-[34px]',
    md: 'text-sm py-2 px-4 rounded-lg gap-2 min-h-[40px]',
    lg: 'text-base py-2.5 px-5 rounded-xl gap-2.5 min-h-[46px]',
  };

  const variantClasses = {
    primary:
      'bg-[#0038BD] text-white hover:bg-[#002FA0] active:bg-[#002685] font-medium shadow-xs focus-visible:ring-2 focus-visible:ring-[#0038BD]',
    accent:
      'bg-[#EF8E01] text-black hover:bg-[#E08200] active:bg-[#CE7500] font-semibold shadow-xs focus-visible:ring-2 focus-visible:ring-[#EF8E01]',
    outline:
      'bg-white text-black border border-black/20 hover:bg-[#EEEEEE] active:bg-black/10 font-medium focus-visible:ring-2 focus-visible:ring-[#0038BD]',
    ghost:
      'bg-transparent text-black hover:bg-black/5 active:bg-black/10 font-medium focus-visible:ring-2 focus-visible:ring-[#0038BD]',
  };

  return (
    <button
      className={`inline-flex items-center justify-center font-sans whitespace-nowrap transition-colors duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed outline-none select-none ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
};
