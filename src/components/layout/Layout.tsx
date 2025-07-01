import React, { useState } from 'react';
import styled from 'styled-components';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { User } from '../../types';

interface LayoutProps {
  user: User;
  children: React.ReactNode;
}

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  background: ${({ theme }) => theme.colors.neutrals.white};
  overflow: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing['2xl']};
  background: ${({ theme }) => theme.colors.neutrals.gray50};
  overflow-y: auto;
  width: calc(100vw - ${({ theme }) => theme.layout.sidebarWidth});

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 100vw;
    padding: ${({ theme }) => theme.spacing.lg};
    padding-top: 80px;
  }
`;

const Overlay = styled.div<{ isVisible: boolean }>`
  display: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: ${({ isVisible }) => isVisible ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;

export const Layout: React.FC<LayoutProps> = ({ user, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <LayoutContainer>
      <Sidebar user={user} isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      <Overlay isVisible={isSidebarOpen} onClick={handleCloseSidebar} />
      
      <MainContent>
        <Header onMenuToggle={handleMenuToggle} />
        {children}
      </MainContent>
    </LayoutContainer>
  );
};