import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Layout } from './components/layout';
import { Dashboard } from './components/dashboard/Dashboard';
import { GlobalStyles } from './theme/GlobalStyles';
import { designTokens } from './theme/tokens';
import { mockUser } from './data/mockData';

function App() {
  return (
    <ThemeProvider theme={designTokens}>
      <GlobalStyles />
      <Layout user={mockUser}>
        <Dashboard />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
