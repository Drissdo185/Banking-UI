import React from 'react';
import styled from 'styled-components';
import { Card, Icon } from '../ui';
import { Transaction } from '../../types';

interface TransactionListProps {
  transactions: Transaction[];
  title?: string;
  showSeeAll?: boolean;
}

const TransactionCard = styled(Card)``;

const CardTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.neutrals.gray800};
`;

const SeeAllLink = styled.a`
  color: ${({ theme }) => theme.colors.primary.brand};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};

  &:hover {
    text-decoration: underline;
  }
`;

const TransactionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutrals.gray100};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    transform: translateY(-1px);
    transition: transform ${({ theme }) => theme.animations.duration.fast} ${({ theme }) => theme.animations.easing.default};
  }
`;

const TransactionInfo = styled.div`
  display: flex;
  align-items: center;
`;

const TransactionIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  background: #FEF2F2;
  color: #DC2626;
`;

const TransactionDetails = styled.div`
  h4 {
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.neutrals.gray800};
    margin-bottom: 2px;
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSizes.xs};
    color: ${({ theme }) => theme.colors.neutrals.gray500};
  }
`;

const TransactionAmount = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: #DC2626;
`;

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions, 
  title = "Recent Transactions",
  showSeeAll = true 
}) => {
  return (
    <TransactionCard>
      <CardTitle>
        <Title>{title}</Title>
        {showSeeAll && <SeeAllLink href="#">See All</SeeAllLink>}
      </CardTitle>
      
      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id}>
          <TransactionInfo>
            <TransactionIcon>
              <Icon name={transaction.icon} />
            </TransactionIcon>
            <TransactionDetails>
              <h4>{transaction.description}</h4>
              <p>{transaction.category}</p>
            </TransactionDetails>
          </TransactionInfo>
          <TransactionAmount>
            -{formatCurrency(transaction.amount)}
          </TransactionAmount>
        </TransactionItem>
      ))}
    </TransactionCard>
  );
};