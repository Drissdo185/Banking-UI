export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: Date;
  icon: string;
}

export interface SavingsGoal {
  id: string;
  name: string;
  currentAmount: number;
  targetAmount: number;
  icon: string;
  color: string;
}

export interface SpendingCategory {
  id: string;
  name: string;
  amount: number;
  icon: string;
  color: string;
}

export interface CreditCard {
  id: string;
  number: string;
  balance: number;
  type: 'visa' | 'mastercard' | 'amex';
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  initials: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
  }[];
}