import React from 'react';
import styled from 'styled-components';
import { Card, Icon } from '../ui';

interface QuickAction {
  id: string;
  title: string;
  icon: string;
  color: string;
  onClick: () => void;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

const ActionsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;

const ActionCard = styled(Card)`
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.default};
  flex: 1;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.cardHover};
  }
`;

const ActionIcon = styled.div<{ iconColor: string }>`
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
  background: ${({ iconColor }) => iconColor};
  color: ${({ theme }) => theme.colors.neutrals.white};
`;

const ActionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.neutrals.gray800};
`;

export const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  return (
    <ActionsContainer>
      {actions.map((action) => (
        <ActionCard key={action.id} onClick={action.onClick} hoverable>
          <ActionIcon iconColor={action.color}>
            <Icon name={action.icon} size="lg" color="white" />
          </ActionIcon>
          <ActionTitle>{action.title}</ActionTitle>
        </ActionCard>
      ))}
    </ActionsContainer>
  );
};