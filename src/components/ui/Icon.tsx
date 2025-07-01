import React from 'react';
import styled from 'styled-components';

interface IconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
}

const StyledIcon = styled.i<{ iconSize: string; iconColor?: string }>`
  font-size: ${({ iconSize }) => iconSize};
  color: ${({ iconColor, theme }) => iconColor || theme.colors.neutrals.gray600};
  line-height: 1;
`;

const sizeMap = {
  sm: '14px',
  md: '16px',
  lg: '20px',
  xl: '24px'
};

export const Icon: React.FC<IconProps> = ({ name, size = 'md', color, className }) => {
  return (
    <StyledIcon 
      className={`${name} ${className || ''}`} 
      iconSize={sizeMap[size]} 
      iconColor={color}
    />
  );
};