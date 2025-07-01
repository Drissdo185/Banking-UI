import React from 'react';
import styled from 'styled-components';
import { Card } from '../ui';
import { CreditCard as CreditCardType } from '../../types';

interface CreditCardProps {
  card: CreditCardType;
}

const CreditCardContainer = styled(Card)`
  background: ${({ theme }) => theme.colors.gradients.cardGradient};
  color: ${({ theme }) => theme.colors.neutrals.white};
  border: none;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  position: relative;
  overflow: hidden;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const CardInfo = styled.div``;

const CardNumber = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  letter-spacing: 2px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const BalanceLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  opacity: 0.9;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const BalanceAmount = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
`;

const CardLogo = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  opacity: 0.9;
  text-transform: uppercase;
`;

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const CreditCard: React.FC<CreditCardProps> = ({ card }) => {
  return (
    <CreditCardContainer variant="primary" padding="xl">
      <CardHeader>
        <CardInfo>
          <CardNumber>{card.number}</CardNumber>
          <BalanceLabel>Balance</BalanceLabel>
          <BalanceAmount>{formatCurrency(card.balance)}</BalanceAmount>
        </CardInfo>
        <CardLogo>VISA</CardLogo>
      </CardHeader>
    </CreditCardContainer>
  );
};