import React from 'react';
import styled from 'styled-components';
import { Card, Icon } from '../ui';
import { SavingsGoal } from '../../types';

interface SavingsGoalsProps {
  goals: SavingsGoal[];
  title?: string;
  showSeeAll?: boolean;
}

const SavingsCard = styled(Card)``;

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

const SavingsItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.lg} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutrals.gray100};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    transform: translateY(-1px);
    transition: transform ${({ theme }) => theme.animations.duration.fast} ${({ theme }) => theme.animations.easing.default};
  }
`;

const SavingsInfo = styled.div`
  display: flex;
  align-items: center;
`;

const SavingsIcon = styled.div<{ iconColor: string; backgroundColor: string }>`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  background: ${({ backgroundColor }) => backgroundColor};
  color: ${({ iconColor }) => iconColor};
`;

const SavingsDetails = styled.div`
  h4 {
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.neutrals.gray800};
    margin-bottom: 4px;
  }
`;

const SavingsProgress = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  color: ${({ theme }) => theme.colors.neutrals.gray500};
`;

const SavingsAmount = styled.div`
  text-align: right;
`;

const CurrentAmount = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.neutrals.gray800};
`;

const getIconBackground = (color: string): string => {
  const colorMap: { [key: string]: string } = {
    '#F59E0B': '#FEF3C7',
    '#2563EB': '#DBEAFE',
  };
  return colorMap[color] || '#F3F4F6';
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const SavingsGoals: React.FC<SavingsGoalsProps> = ({ 
  goals, 
  title = "My Savings",
  showSeeAll = true 
}) => {
  return (
    <SavingsCard>
      <CardTitle>
        <Title>{title}</Title>
        {showSeeAll && <SeeAllLink href="#">See All</SeeAllLink>}
      </CardTitle>
      
      {goals.map((goal) => (
        <SavingsItem key={goal.id}>
          <SavingsInfo>
            <SavingsIcon 
              iconColor={goal.color}
              backgroundColor={getIconBackground(goal.color)}
            >
              <Icon name={goal.icon} />
            </SavingsIcon>
            <SavingsDetails>
              <h4>{goal.name}</h4>
              <SavingsProgress>{formatCurrency(goal.targetAmount - goal.currentAmount)} remaining</SavingsProgress>
            </SavingsDetails>
          </SavingsInfo>
          <SavingsAmount>
            <CurrentAmount>{formatCurrency(goal.currentAmount)}</CurrentAmount>
          </SavingsAmount>
        </SavingsItem>
      ))}
    </SavingsCard>
  );
};