import React from 'react';
import styled, { css } from 'styled-components';

interface CardProps {
  variant?: 'default' | 'primary' | 'glass';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  hoverable?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const StyledCard = styled.div<CardProps>`
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  transition: all ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.default};
  border: 1px solid ${({ theme }) => theme.colors.neutrals.gray200};
  position: relative;
  overflow: hidden;

  ${({ variant, theme }) => variant === 'default' && css`
    background: ${theme.colors.neutrals.white};
    box-shadow: ${theme.shadows.card};
  `}

  ${({ variant, theme }) => variant === 'primary' && css`
    background: ${theme.colors.gradients.cardGradient};
    color: ${theme.colors.neutrals.white};
    border: none;
    box-shadow: ${theme.shadows.lg};
    
    &::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 200px;
      height: 200px;
      background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
      border-radius: 50%;
    }
  `}

  ${({ variant, theme }) => variant === 'glass' && css`
    background: ${theme.colors.gradients.glassmorphism};
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  `}

  ${({ padding, theme }) => padding === 'sm' && css`
    padding: ${theme.spacing.md};
  `}

  ${({ padding, theme }) => padding === 'md' && css`
    padding: ${theme.spacing.lg};
  `}

  ${({ padding, theme }) => padding === 'lg' && css`
    padding: ${theme.spacing.xl};
  `}

  ${({ padding, theme }) => padding === 'xl' && css`
    padding: ${theme.spacing['2xl']};
  `}

  ${({ hoverable, theme }) => hoverable && css`
    cursor: pointer;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.cardHover};
    }
  `}
`;

export const Card: React.FC<CardProps> = ({ 
  variant = 'default', 
  padding = 'lg', 
  hoverable = false,
  children, 
  ...props 
}) => {
  return (
    <StyledCard variant={variant} padding={padding} hoverable={hoverable} {...props}>
      {children}
    </StyledCard>
  );
};