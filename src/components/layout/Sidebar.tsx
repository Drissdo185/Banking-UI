import React from 'react';
import styled from 'styled-components';
import { Button, Icon, Avatar } from '../ui';
import { User } from '../../types';

interface SidebarProps {
  user: User;
  isOpen?: boolean;
  onClose?: () => void;
}

const SidebarContainer = styled.nav<{ isOpen: boolean }>`
  width: ${({ theme }) => theme.layout.sidebarWidth};
  background: ${({ theme }) => theme.colors.neutrals.white};
  padding: ${({ theme }) => `${theme.spacing['2xl']} ${theme.spacing.lg}`};
  border-right: 1px solid ${({ theme }) => theme.colors.neutrals.gray100};
  position: relative;
  flex-shrink: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 1000;
    transform: translateX(${({ isOpen }) => isOpen ? '0' : '-100%'});
    transition: transform ${({ theme }) => theme.animations.duration.slow} ${({ theme }) => theme.animations.easing.default};
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  font-size: ${({ theme }) => theme.typography.fontSizes.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.neutrals.gray800};

  &::before {
    content: '';
    width: 32px;
    height: 32px;
    background: ${({ theme }) => theme.colors.gradients.cardGradient};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    margin-right: ${({ theme }) => theme.spacing.md};
  }
`;

const NavMenu = styled.ul`
  list-style: none;
  flex: 1;
`;

const NavItem = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const NavLink = styled.a<{ active?: boolean }>`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  text-decoration: none;
  color: ${({ active, theme }) => active ? theme.colors.neutrals.white : theme.colors.neutrals.gray500};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  transition: all ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.default};
  background: ${({ active, theme }) => active ? theme.colors.primary.brand : 'transparent'};
  position: relative;

  &:hover {
    background: ${({ active, theme }) => active ? theme.colors.primary.brand : theme.colors.neutrals.gray50};
    color: ${({ active, theme }) => active ? theme.colors.neutrals.white : theme.colors.primary.brand};
  }

  i {
    width: 20px;
    margin-right: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.fontSizes.base};
  }
`;

const CryptoCard = styled.div`
  background: ${({ theme }) => theme.colors.gradients.cardGradient};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  padding: ${({ theme }) => theme.spacing.lg};
  margin: ${({ theme }) => `${theme.spacing['2xl']} 0`};
  color: ${({ theme }) => theme.colors.neutrals.white};
  text-align: center;

  h3 {
    font-size: ${({ theme }) => theme.typography.fontSizes.lg};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }

  p {
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    opacity: 0.9;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const CryptoButton = styled(Button)`
  background: rgba(255, 255, 255, 0.2);
  color: ${({ theme }) => theme.colors.neutrals.white};
  border: none;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  padding-top: ${({ theme }) => theme.spacing.lg};
`;

const UserInfo = styled.div`
  margin-left: ${({ theme }) => theme.spacing.md};

  h4 {
    font-size: ${({ theme }) => theme.typography.fontSizes.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.neutrals.gray800};
  }
`;

const menuItems = [
  { id: 'overview', label: 'Overview', icon: 'fas fa-th-large', active: true },
  { id: 'statistics', label: 'Statistics', icon: 'fas fa-chart-bar', active: false },
  { id: 'savings', label: 'Savings', icon: 'fas fa-piggy-bank', active: false },
  { id: 'settings', label: 'Settings', icon: 'fas fa-cog', active: false },
  { id: 'support', label: 'Support', icon: 'fas fa-question-circle', active: false },
];

export const Sidebar: React.FC<SidebarProps> = ({ user, isOpen = false, onClose }) => {
  return (
    <SidebarContainer isOpen={isOpen}>
      <Logo>DrissDo.</Logo>
      
      <NavMenu>
        {menuItems.map((item) => (
          <NavItem key={item.id}>
            <NavLink href="#" active={item.active}>
              <Icon name={item.icon} />
              {item.label}
            </NavLink>
          </NavItem>
        ))}
      </NavMenu>

      <CryptoCard>
        <h3>Go from Cash to Crypto</h3>
        <p>Find out more →</p>
        <CryptoButton>Learn More</CryptoButton>
      </CryptoCard>

      <UserProfile>
        <Avatar initials={user.initials} size="lg" />
        <UserInfo>
          <h4>{user.name}</h4>
        </UserInfo>
      </UserProfile>
    </SidebarContainer>
  );
};