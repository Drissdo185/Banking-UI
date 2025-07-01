import React from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  transition: all ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.default};
  cursor: pointer;
  
  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `}

  ${({ variant, theme }) => variant === 'primary' && css`
    background: ${theme.colors.primary.brand};
    color: ${theme.colors.neutrals.white};
    
    &:hover {
      background: ${theme.colors.primary.brandDark};
    }
    
    &:active {
      transform: translateY(1px);
    }
  `}

  ${({ variant, theme }) => variant === 'secondary' && css`
    background: transparent;
    color: ${theme.colors.neutrals.gray500};
    border: 1px solid ${theme.colors.neutrals.gray200};
    
    &:hover {
      background: ${theme.colors.neutrals.gray50};
    }
  `}

  ${({ size, theme }) => size === 'sm' && css`
    padding: ${theme.spacing.sm} ${theme.spacing.md};
    font-size: ${theme.typography.fontSizes.sm};
  `}

  ${({ size, theme }) => size === 'md' && css`
    padding: 0.75rem ${theme.spacing.lg};
  `}

  ${({ size, theme }) => size === 'lg' && css`
    padding: ${theme.spacing.md} ${theme.spacing.xl};
    font-size: ${theme.typography.fontSizes.lg};
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  ...props 
}) => {
  return (
    <StyledButton variant={variant} size={size} {...props}>
      {children}
    </StyledButton>
  );
};