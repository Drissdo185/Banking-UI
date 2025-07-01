import React from 'react';
import styled from 'styled-components';

interface AvatarProps {
  initials: string;
  size?: 'sm' | 'md' | 'lg';
  gradient?: string;
  className?: string;
}

const StyledAvatar = styled.div<{ avatarSize: string; gradient?: string }>`
  width: ${({ avatarSize }) => avatarSize};
  height: ${({ avatarSize }) => avatarSize};
  border-radius: 50%;
  background: ${({ gradient, theme }) => gradient || `linear-gradient(135deg, ${theme.colors.secondary.orange} 0%, ${theme.colors.secondary.orangeLight} 100%)`};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.neutrals.white};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  font-size: ${({ avatarSize }) => {
    const size = parseInt(avatarSize);
    return `${Math.round(size * 0.4)}px`;
  }};
`;

const sizeMap = {
  sm: '32px',
  md: '40px',
  lg: '48px'
};

export const Avatar: React.FC<AvatarProps> = ({ 
  initials, 
  size = 'md', 
  gradient,
  className 
}) => {
  return (
    <StyledAvatar 
      avatarSize={sizeMap[size]} 
      gradient={gradient}
      className={className}
    >
      {initials}
    </StyledAvatar>
  );
};