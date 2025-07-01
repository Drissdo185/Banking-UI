import { Transaction, SavingsGoal, SpendingCategory, CreditCard, User } from '../types';

export const mockUser: User = {
  id: '1',
  name: 'Amanda Kayle',
  avatar: '',
  initials: 'AK'
};

export const mockCreditCard: CreditCard = {
  id: '1',
  number: '•••• 2431',
  balance: 1023.00,
  type: 'visa'
};

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'expense',
    amount: 150.00,
    description: 'To Lindsey Studio',
    category: 'Transfer',
    date: new Date('2024-03-01'),
    icon: 'fas fa-arrow-up'
  },
  {
    id: '2',
    type: 'expense',
    amount: 3.12,
    description: 'Kopi Kenangan',
    category: 'Cafe & Restaurant',
    date: new Date('2024-03-01'),
    icon: 'fas fa-utensils'
  },
  {
    id: '3',
    type: 'expense',
    amount: 5.00,
    description: 'Pecel Madiun Pak Iham',
    category: 'Cafe & Restaurant',
    date: new Date('2024-03-01'),
    icon: 'fas fa-utensils'
  }
];

export const mockSavingsGoals: SavingsGoal[] = [
  {
    id: '1',
    name: 'My Dream PC',
    currentAmount: 3100,
    targetAmount: 3600,
    icon: 'fas fa-desktop',
    color: '#F59E0B'
  },
  {
    id: '2',
    name: 'Car Part',
    currentAmount: 2300,
    targetAmount: 2400,
    icon: 'fas fa-car',
    color: '#2563EB'
  }
];

export const mockSpendingCategories: SpendingCategory[] = [
  {
    id: '1',
    name: 'Transfers',
    amount: 150.00,
    icon: 'fas fa-exchange-alt',
    color: '#2563EB'
  },
  {
    id: '2',
    name: 'Shopping',
    amount: 500.00,
    icon: 'fas fa-shopping-bag',
    color: '#EC4899'
  },
  {
    id: '3',
    name: 'Cafe & Restaurant',
    amount: 20.12,
    icon: 'fas fa-coffee',
    color: '#EA580C'
  },
  {
    id: '4',
    name: 'Entertainment',
    amount: 60.00,
    icon: 'fas fa-gamepad',
    color: '#6366F1'
  },
  {
    id: '5',
    name: 'Transportation',
    amount: 80.00,
    icon: 'fas fa-car',
    color: '#16A34A'
  },
  {
    id: '6',
    name: 'Vacation',
    amount: 320.12,
    icon: 'fas fa-plane',
    color: '#F59E0B'
  }
];

export const mockChartData = {
  labels: ['1 Mar', '5 Mar', '10 Mar', '15 Mar', '20 Mar', '25 Mar', '31 Mar'],
  datasets: [{
    label: 'Balance',
    data: [800, 1200, 900, 1400, 1100, 1600, 1300],
    borderColor: '#10B981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    fill: true,
    tension: 0.4
  }]
};

export const mockSummary = {
  income: 2123.00,
  expense: 2123.00
};