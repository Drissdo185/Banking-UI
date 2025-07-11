import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const getVariantClasses = (variant: 'primary' | 'secondary') => {
  switch (variant) {
    case 'primary':
      return 'bg-primary-brand text-white hover:bg-primary-brandDark active:translate-y-px';
    case 'secondary':
      return 'bg-transparent text-gray-500 border border-gray-200 hover:bg-gray-50';
    default:
      return 'bg-primary-brand text-white hover:bg-primary-brandDark active:translate-y-px';
  }
};

const getSizeClasses = (size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'sm':
      return 'px-4 py-2 text-sm';
    case 'md':
      return 'px-6 py-3 text-base';
    case 'lg':
      return 'px-8 py-4 text-lg';
    default:
      return 'px-6 py-3 text-base';
  }
};

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false,
  children, 
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 border-none rounded-lg font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';
  const variantClasses = getVariantClasses(variant);
  const sizeClasses = getSizeClasses(size);
  const widthClasses = fullWidth ? 'w-full' : '';
  
  const combinedClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${widthClasses} ${className}`.trim();

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};