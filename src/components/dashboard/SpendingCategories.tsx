import React from 'react';
import styled from 'styled-components';
import { Card, Icon } from '../ui';
import { SpendingCategory } from '../../types';

interface SpendingCategoriesProps {
  categories: SpendingCategory[];
  title?: string;
  showSeeAll?: boolean;
}

const SpendingCard = styled(Card)``;

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

const SpendingItem = styled.div`
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

const SpendingInfo = styled.div`
  display: flex;
  align-items: center;
`;

const CategoryIcon = styled.div<{ iconColor: string; backgroundColor: string }>`
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

const CategoryName = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme }) => theme.colors.neutrals.gray800};
`;

const SpendingAmount = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.neutrals.gray800};
`;

const getIconBackground = (color: string): string => {
  const colorMap: { [key: string]: string } = {
    '#2563EB': '#DBEAFE',
    '#EC4899': '#FCE7F3',
    '#EA580C': '#FED7AA',
    '#6366F1': '#E0E7FF',
    '#16A34A': '#DCFCE7',
    '#F59E0B': '#FEF3C7',
  };
  return colorMap[color] || '#F3F4F6';
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

export const SpendingCategories: React.FC<SpendingCategoriesProps> = ({ 
  categories, 
  title = "Total Spend",
  showSeeAll = true 
}) => {
  return (
    <SpendingCard>
      <CardTitle>
        <Title>{title}</Title>
        {showSeeAll && <SeeAllLink href="#">See All</SeeAllLink>}
      </CardTitle>
      
      {categories.map((category) => (
        <SpendingItem key={category.id}>
          <SpendingInfo>
            <CategoryIcon 
              iconColor={category.color}
              backgroundColor={getIconBackground(category.color)}
            >
              <Icon name={category.icon} />
            </CategoryIcon>
            <CategoryName>{category.name}</CategoryName>
          </SpendingInfo>
          <SpendingAmount>
            {formatCurrency(category.amount)}
          </SpendingAmount>
        </SpendingItem>
      ))}
    </SpendingCard>
  );
};