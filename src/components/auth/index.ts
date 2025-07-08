// Main authentication components
export { LoginForm } from './LoginForm';
export { RegisterForm } from './RegisterForm';
export { 
  ProtectedRoute, 
  withProtectedRoute, 
  useRouteProtection 
} from './ProtectedRoute';

// Sub-components and utilities from ProtectedRoute
export { 
  AuthChecking, 
  UnauthorizedAccess, 
  EmailVerificationRequired 
} from './ProtectedRoute';

// Type exports for TypeScript support
export type { ProtectedRouteProps } from './ProtectedRoute';

// Re-export any additional auth-related types that might be needed
// These would typically be defined in the individual component files
export type { 
  LoginFormData,
  RegisterFormData 
} from './types';

// Future auth components can be added here as they're created
// export { ForgotPasswordForm } from './ForgotPasswordForm';
// export { ResetPasswordForm } from './ResetPasswordForm';
// export { ChangePasswordForm } from './ChangePasswordForm';
// export { TwoFactorAuthForm } from './TwoFactorAuthForm';
// export { EmailVerificationForm } from './EmailVerificationForm';