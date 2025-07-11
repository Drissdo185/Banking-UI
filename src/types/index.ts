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

// Extended user interface that matches API response
export interface ApiUser {
  userId: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

// Helper function to convert API user to UI user format
export const apiUserToUser = (apiUser: ApiUser): User => {
  const fullName = apiUser.firstName && apiUser.lastName 
    ? `${apiUser.firstName} ${apiUser.lastName}`
    : apiUser.username;
  
  const initials = apiUser.firstName && apiUser.lastName
    ? `${apiUser.firstName[0]}${apiUser.lastName[0]}`
    : apiUser.username.substring(0, 2).toUpperCase();

  return {
    id: apiUser.userId,
    name: fullName,
    avatar: '', // No avatar in API, could be added later
    initials
  };
};

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