import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { Icon } from '../ui';

// Types
interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  isLoading?: boolean;
  redirectTo?: string;
  requireEmailVerification?: boolean;
  isEmailVerified?: boolean;
  requiredRoles?: string[];
  userRoles?: string[];
  fallbackComponent?: React.ComponentType;
}

interface AuthCheckingProps {
  message?: string;
}

// Loading spinner animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

// Styled components for loading state
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.neutrals.gray50};
  animation: ${fadeIn} ${({ theme }) => theme.animations.duration.slow} ${({ theme }) => theme.animations.easing.default};
`;

const LoadingSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid ${({ theme }) => theme.colors.neutrals.gray200};
  border-top: 4px solid ${({ theme }) => theme.colors.primary.brand};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const LoadingText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  color: ${({ theme }) => theme.colors.neutrals.gray600};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  text-align: center;
  max-width: 300px;
`;

const LoadingIcon = styled.div`
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary.brand};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

// Styled components for unauthorized access
const UnauthorizedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.neutrals.gray50};
  padding: ${({ theme }) => theme.spacing.xl};
  animation: ${fadeIn} ${({ theme }) => theme.animations.duration.slow} ${({ theme }) => theme.animations.easing.default};
`;

const UnauthorizedCard = styled.div`
  background: ${({ theme }) => theme.colors.neutrals.white};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing['3xl']};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  text-align: center;
  max-width: 480px;
  width: 100%;
`;

const UnauthorizedIcon = styled.div`
  font-size: 4rem;
  color: ${({ theme }) => theme.colors.semantic.warning};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const UnauthorizedTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.neutrals.gray800};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const UnauthorizedMessage = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  color: ${({ theme }) => theme.colors.neutrals.gray600};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ActionButton = styled.button`
  background: ${({ theme }) => theme.colors.primary.brand};
  color: ${({ theme }) => theme.colors.neutrals.white};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  font-size: ${({ theme }) => theme.typography.fontSizes.base};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.animations.duration.normal} ${({ theme }) => theme.animations.easing.default};
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};

  &:hover {
    background: ${({ theme }) => theme.colors.primary.brandDark};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  &:active {
    transform: translateY(0);
  }
`;

// Loading component
const AuthChecking: React.FC<AuthCheckingProps> = ({ 
  message = "Verifying your access..." 
}) => (
  <LoadingContainer>
    <LoadingIcon>
      <Icon name="fas fa-shield-alt" />
    </LoadingIcon>
    <LoadingSpinner />
    <LoadingText>{message}</LoadingText>
  </LoadingContainer>
);

// Unauthorized access component
const UnauthorizedAccess: React.FC<{
  title?: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
  showHomeButton?: boolean;
}> = ({
  title = "Access Denied",
  message = "You don't have permission to access this page. Please contact your administrator if you believe this is an error.",
  actionText = "Go to Login",
  onAction,
  showHomeButton = true
}) => (
  <UnauthorizedContainer>
    <UnauthorizedCard>
      <UnauthorizedIcon>
        <Icon name="fas fa-lock" />
      </UnauthorizedIcon>
      <UnauthorizedTitle>{title}</UnauthorizedTitle>
      <UnauthorizedMessage>{message}</UnauthorizedMessage>
      {showHomeButton && (
        <ActionButton onClick={onAction || (() => window.location.href = '/login')}>
          <Icon name="fas fa-sign-in-alt" size="sm" />
          {actionText}
        </ActionButton>
      )}
    </UnauthorizedCard>
  </UnauthorizedContainer>
);

// Email verification required component
const EmailVerificationRequired: React.FC<{
  onResendVerification?: () => void;
  isResending?: boolean;
}> = ({ onResendVerification, isResending = false }) => (
  <UnauthorizedContainer>
    <UnauthorizedCard>
      <UnauthorizedIcon>
        <Icon name="fas fa-envelope-open" />
      </UnauthorizedIcon>
      <UnauthorizedTitle>Email Verification Required</UnauthorizedTitle>
      <UnauthorizedMessage>
        Please verify your email address to access this page. 
        Check your inbox for a verification link.
      </UnauthorizedMessage>
      {onResendVerification && (
        <ActionButton 
          onClick={onResendVerification}
          disabled={isResending}
        >
          {isResending ? (
            <>
              <Icon name="fas fa-spinner" size="sm" />
              Sending...
            </>
          ) : (
            <>
              <Icon name="fas fa-paper-plane" size="sm" />
              Resend Verification Email
            </>
          )}
        </ActionButton>
      )}
    </UnauthorizedCard>
  </UnauthorizedContainer>
);

// Utility function to check role-based access
const hasRequiredRole = (userRoles: string[] = [], requiredRoles: string[] = []): boolean => {
  if (requiredRoles.length === 0) return true;
  return requiredRoles.some(role => userRoles.includes(role));
};

// Main ProtectedRoute component
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAuthenticated,
  isLoading = false,
  redirectTo = '/login',
  requireEmailVerification = false,
  isEmailVerified = true,
  requiredRoles = [],
  userRoles = [],
  fallbackComponent: FallbackComponent
}) => {
  const location = useLocation();
  const [showDelayedLoading, setShowDelayedLoading] = useState(false);

  // Show loading state after a brief delay to prevent flash
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setShowDelayedLoading(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setShowDelayedLoading(false);
    }
  }, [isLoading]);

  // Show loading state
  if (isLoading && showDelayedLoading) {
    return <AuthChecking />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <Navigate 
        to={redirectTo} 
        state={{ from: location.pathname }}
        replace 
      />
    );
  }

  // Check email verification if required
  if (requireEmailVerification && !isEmailVerified) {
    return (
      <EmailVerificationRequired 
        onResendVerification={() => {
          // This would typically call an API to resend verification email
          console.log('Resending verification email...');
        }}
      />
    );
  }

  // Check role-based access
  if (!hasRequiredRole(userRoles, requiredRoles)) {
    if (FallbackComponent) {
      return <FallbackComponent />;
    }
    
    return (
      <UnauthorizedAccess
        title="Insufficient Permissions"
        message={`You need ${requiredRoles.join(' or ')} access to view this page.`}
        actionText="Go Back"
        onAction={() => window.history.back()}
      />
    );
  }

  // Render protected content
  return <>{children}</>;
};

// Higher-order component version for class components
export const withProtectedRoute = <P extends object>(
  Component: React.ComponentType<P>,
  protectionOptions: Omit<ProtectedRouteProps, 'children'>
) => {
  return (props: P) => (
    <ProtectedRoute {...protectionOptions}>
      <Component {...props} />
    </ProtectedRoute>
  );
};

// Hook for route protection in functional components
export const useRouteProtection = (
  isAuthenticated: boolean,
  options: {
    redirectTo?: string;
    requireEmailVerification?: boolean;
    isEmailVerified?: boolean;
    requiredRoles?: string[];
    userRoles?: string[];
  } = {}
) => {
  const location = useLocation();
  
  return {
    isAccessAllowed: isAuthenticated && 
      (!options.requireEmailVerification || options.isEmailVerified) &&
      hasRequiredRole(options.userRoles, options.requiredRoles),
    redirectPath: options.redirectTo || '/login',
    currentPath: location.pathname
  };
};

// Export types for use in other components
export type { ProtectedRouteProps };
export { AuthChecking, UnauthorizedAccess, EmailVerificationRequired };