// API Request Types
export interface LoginRequest {
  emailOrUsername: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  preferences?: any;
}

// API Response Types
export interface LoginResponse {
  token: string;
  tokenType: string;
  userId: string;
  username: string;
  email: string;
}

export interface UserProfileDto {
  userId: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface UserValidationResponse {
  id: string;
  username: string;
  email: string;
  isActive: boolean;
}

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    VALIDATE: '/api/auth/validate',
  },
  USERS: {
    PROFILE: '/api/users/profile',
    BY_ID: (userId: string) => `/api/users/${userId}`,
    BY_USERNAME: (username: string) => `/api/users/username/${username}`,
    BY_EMAIL: (email: string) => `/api/users/email/${email}`,
  },
} as const;

// API Error types
export interface ApiError {
  message: string;
  status: number;
  details?: any;
}