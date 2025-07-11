import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService, userService } from '../services';
import { LoginRequest, RegisterRequest, UserProfileDto, ApiError } from '../types/api';

interface AuthContextType {
  user: UserProfileDto | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (loginData: LoginRequest) => Promise<void>;
  register: (registerData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (updateData: any) => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfileDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        if (authService.isAuthenticated()) {
          // Validate token and get user profile
          const isValid = await authService.validateToken();
          if (isValid) {
            const userProfile = await userService.getCurrentUserProfile();
            setUser(userProfile);
          } else {
            // Token invalid, clear auth state
            authService.logout();
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        authService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (loginData: LoginRequest): Promise<void> => {
    try {
      setError(null);
      setIsLoading(true);
      
      await authService.login(loginData);
      
      // Get full user profile after login
      const userProfile = await userService.getCurrentUserProfile();
      setUser(userProfile);
    } catch (error: any) {
      const apiError = error as ApiError;
      setError(apiError.message || 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (registerData: RegisterRequest): Promise<void> => {
    try {
      setError(null);
      setIsLoading(true);
      
      await authService.register(registerData);
      
      // After successful registration, log the user in
      await login({
        emailOrUsername: registerData.email,
        password: registerData.password
      });
    } catch (error: any) {
      const apiError = error as ApiError;
      setError(apiError.message || 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if API call fails
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (updateData: any): Promise<void> => {
    try {
      setError(null);
      const updatedProfile = await userService.updateProfile(updateData);
      setUser(updatedProfile);
    } catch (error: any) {
      const apiError = error as ApiError;
      setError(apiError.message || 'Profile update failed');
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateUserProfile,
    error,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};