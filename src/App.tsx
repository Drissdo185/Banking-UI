import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Layout } from './components/layout';
import { Dashboard } from './components/dashboard/Dashboard';
import { LoginForm } from './components/auth/LoginForm';
import { apiUserToUser } from './types';

const AppContent: React.FC = () => {
  const { user, isAuthenticated, isLoading, login, error } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-brand mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoginForm 
          onSubmit={login}
          error={error}
          isLoading={isLoading}
        />
      </div>
    );
  }

  // Convert API user to UI user format
  const uiUser = apiUserToUser(user);

  return (
    <Layout user={uiUser}>
      <Dashboard />
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
