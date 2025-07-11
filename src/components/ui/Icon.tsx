import React from 'react';

interface IconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
}

const getSizeClasses = (size: 'sm' | 'md' | 'lg' | 'xl') => {
  switch (size) {
    case 'sm':
      return 'text-sm';
    case 'md':
      return 'text-base';
    case 'lg':
      return 'text-xl';
    case 'xl':
      return 'text-2xl';
    default:
      return 'text-base';
  }
};

export const Icon: React.FC<IconProps> = ({ name, size = 'md', color, className = '' }) => {
  const sizeClasses = getSizeClasses(size);
  const colorStyles = color ? { color } : {};
  const baseClasses = 'leading-none text-gray-600';
  
  const combinedClasses = `${name} ${baseClasses} ${sizeClasses} ${className}`.trim();

  return (
    <i 
      className={combinedClasses}
      style={colorStyles}
    />
  );
};