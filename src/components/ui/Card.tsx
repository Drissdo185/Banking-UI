import React from 'react';

interface CardProps {
  variant?: 'default' | 'primary' | 'glass';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  hoverable?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const getVariantClasses = (variant: 'default' | 'primary' | 'glass') => {
  switch (variant) {
    case 'default':
      return 'bg-white shadow-card border border-gray-200';
    case 'primary':
      return 'bg-gradient-to-br from-primary-brand to-primary-brandLight text-white border-none shadow-lg relative overflow-hidden before:absolute before:-top-1/2 before:-right-1/2 before:w-48 before:h-48 before:bg-radial-gradient before:opacity-10 before:rounded-full';
    case 'glass':
      return 'bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20';
    default:
      return 'bg-white shadow-card border border-gray-200';
  }
};

const getPaddingClasses = (padding: 'sm' | 'md' | 'lg' | 'xl') => {
  switch (padding) {
    case 'sm':
      return 'p-4';
    case 'md':
      return 'p-6';
    case 'lg':
      return 'p-8';
    case 'xl':
      return 'p-12';
    default:
      return 'p-8';
  }
};

export const Card: React.FC<CardProps> = ({ 
  variant = 'default', 
  padding = 'lg', 
  hoverable = false,
  children, 
  className = '',
  ...props 
}) => {
  const baseClasses = 'rounded-xl transition-all duration-200 relative overflow-hidden';
  const variantClasses = getVariantClasses(variant);
  const paddingClasses = getPaddingClasses(padding);
  const hoverClasses = hoverable ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-card-hover' : '';
  
  const combinedClasses = `${baseClasses} ${variantClasses} ${paddingClasses} ${hoverClasses} ${className}`.trim();

  return (
    <div className={combinedClasses} {...props}>
      {children}
    </div>
  );
};