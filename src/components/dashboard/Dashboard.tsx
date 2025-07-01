import React from 'react';
import styled from 'styled-components';
import { 
  CreditCard, 
  QuickActions, 
  SummaryCards, 
  TransactionList, 
  SpendingCategories, 
  SavingsGoals,
  BalanceChart 
} from './';
import { 
  mockCreditCard, 
  mockTransactions, 
  mockSpendingCategories, 
  mockSavingsGoals,
  mockChartData,
  mockSummary 
} from '../../data/mockData';

const DashboardContainer = styled.div`
  width: 100%;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const BottomSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const quickActions = [
  {
    id: 'transfer',
    title: 'Transfer',
    icon: 'fas fa-exchange-alt',
    color: '#7C3AED',
    onClick: () => alert('Transfer functionality would open here')
  },
  {
    id: 'bill',
    title: 'Pay Bill',
    icon: 'fas fa-file-invoice',
    color: '#F59E0B',
    onClick: () => alert('Bill payment functionality would open here')
  }
];

export const Dashboard: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardGrid>
        <CreditCard card={mockCreditCard} />
        <QuickActions actions={quickActions} />
      </DashboardGrid>

      <SummaryCards data={mockSummary} />

      <BalanceChart data={mockChartData} />

      <BottomSection>
        <TransactionList transactions={mockTransactions} />
        <SpendingCategories categories={mockSpendingCategories} />
      </BottomSection>

      <SavingsGoals goals={mockSavingsGoals} />
    </DashboardContainer>
  );
};