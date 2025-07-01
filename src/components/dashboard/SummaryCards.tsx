import React from 'react';
import styled from 'styled-components';
import { Card, Icon } from '../ui';

interface SummaryData {
  income: number;
  expense: number;
}

interface SummaryCardsProps {
  data: SummaryData;
}

const SummaryContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const SummaryCard = styled(Card)``;

const SummaryHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SummaryIcon = styled.div<{ iconColor: string; backgroundColor: string }>`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  background: ${({ backgroundColor }) => backgroundColor};
  color: ${({ iconColor }) => iconColor};
`;

const SummaryLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  color: ${({ theme }) => theme.colors.neutrals.gray500};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

const SummaryAmount = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.neutrals.gray800};
`;

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const SummaryCards: React.FC<SummaryCardsProps> = ({ data }) => {
  return (
    <SummaryContainer>
      <SummaryCard>
        <SummaryHeader>
          <SummaryIcon 
            iconColor="#16A34A" 
            backgroundColor="#DCFCE7"
          >
            <Icon name="fas fa-arrow-down" />
          </SummaryIcon>
          <SummaryLabel>Income</SummaryLabel>
        </SummaryHeader>
        <SummaryAmount>{formatCurrency(data.income)}</SummaryAmount>
      </SummaryCard>
      
      <SummaryCard>
        <SummaryHeader>
          <SummaryIcon 
            iconColor="#F59E0B" 
            backgroundColor="#FEF3C7"
          >
            <Icon name="fas fa-arrow-up" />
          </SummaryIcon>
          <SummaryLabel>Expense</SummaryLabel>
        </SummaryHeader>
        <SummaryAmount>{formatCurrency(data.expense)}</SummaryAmount>
      </SummaryCard>
    </SummaryContainer>
  );
};