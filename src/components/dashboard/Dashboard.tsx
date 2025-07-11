import React from 'react';
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
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 lg:gap-6 lg:mb-6">
        <CreditCard card={mockCreditCard} />
        <QuickActions actions={quickActions} />
      </div>

      <SummaryCards data={mockSummary} />

      <BalanceChart data={mockChartData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 lg:gap-6 lg:mb-6">
        <TransactionList transactions={mockTransactions} />
        <SpendingCategories categories={mockSpendingCategories} />
      </div>

      <SavingsGoals goals={mockSavingsGoals} />
    </div>
  );
};