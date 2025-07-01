import React from 'react';
import styled from 'styled-components';
import { Button, Icon } from '../ui';

interface HeaderProps {
  onMenuToggle?: () => void;
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: ${({ theme }) => theme.spacing['2xl']};
  }
`;

const HeaderLeft = styled.div`
  h1 {
    font-size: ${({ theme }) => theme.typography.fontSizes['3xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
    color: ${({ theme }) => theme.colors.neutrals.gray800};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.neutrals.gray500};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  gap: ${({ theme }) => theme.spacing.sm};

  i {
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const AddCardButton = styled(Button)`
  background: ${({ theme }) => theme.colors.secondary.orange};
  
  &:hover {
    background: ${({ theme }) => theme.colors.secondary.orangeLight};
    transform: translateY(-1px);
  }
`;

const PeriodSelector = styled.select`
  background: ${({ theme }) => theme.colors.neutrals.white};
  border: 1px solid ${({ theme }) => theme.colors.neutrals.gray200};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  color: ${({ theme }) => theme.colors.neutrals.gray500};
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  cursor: pointer;
`;

const MobileMenuToggle = styled.button`
  display: none;
  background: ${({ theme }) => theme.colors.neutrals.white};
  border: 1px solid ${({ theme }) => theme.colors.neutrals.gray200};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  margin-right: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.neutrals.gray500};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: block;
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1001;
  }
`;

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  return (
    <>
      <MobileMenuToggle onClick={onMenuToggle}>
        <Icon name="fas fa-bars" />
      </MobileMenuToggle>
      
      <HeaderContainer>
        <HeaderLeft>
          <h1>My Card</h1>
          <Breadcrumb>
            <span>Dashboard</span>
            <Icon name="fas fa-chevron-right" size="sm" />
            <span>My Card</span>
          </Breadcrumb>
        </HeaderLeft>
        
        <HeaderActions>
          <AddCardButton>
            <Icon name="fas fa-plus" />
            Add Card
          </AddCardButton>
          <PeriodSelector>
            <option>Monthly</option>
            <option>Weekly</option>
            <option>Yearly</option>
          </PeriodSelector>
        </HeaderActions>
      </HeaderContainer>
    </>
  );
};