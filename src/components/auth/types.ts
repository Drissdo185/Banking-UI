// LoginForm types
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

// RegisterForm types
export interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  marketingEmails: boolean;
}

// Auth context and service types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  roles: string[];
  emailVerified: boolean;
  avatar?: string;
  createdAt: Date;
  lastLoginAt?: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
}

export interface AuthContextValue extends AuthState {
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  register: (userData: Omit<RegisterFormData, 'confirmPassword' | 'acceptTerms'>) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  clearError: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  resendEmailVerification: () => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
}

// API response types
export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresAt: string;
}

export interface RegisterResponse {
  user: User;
  token: string;
  refreshToken: string;
  message: string;
}

export interface ApiError {
  message: string;
  code: string;
  field?: string;
  details?: Record<string, any>;
}

// Form handler types
export interface AuthFormProps {
  isLoading?: boolean;
  error?: string;
  onSubmit: (data: any) => Promise<void>;
}

// Route protection types
export interface RoutePermissions {
  requiredRoles?: string[];
  requireEmailVerification?: boolean;
  requireTwoFactor?: boolean;
}

// Token types
export interface TokenPayload {
  sub: string; // user ID
  email: string;
  roles: string[];
  iat: number;
  exp: number;
}

// Password reset types
export interface ForgotPasswordFormData {
  email: string;
}

export interface ResetPasswordFormData {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Two-factor authentication types
export interface TwoFactorFormData {
  code: string;
}

export interface TwoFactorSetupData {
  secret: string;
  qrCode: string;
  backupCodes: string[];
}

// Email verification types
export interface EmailVerificationFormData {
  email: string;
}

// Social authentication types
export interface SocialAuthProvider {
  name: string;
  icon: string;
  color: string;
  enabled: boolean;
}

export interface SocialAuthResponse {
  user: User;
  token: string;
  isNewUser: boolean;
}