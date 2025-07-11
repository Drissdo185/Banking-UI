import { apiClient, handleApiError } from '../config/api';
import { 
  LoginRequest, 
  RegisterRequest, 
  LoginResponse, 
  UserProfileDto,
  API_ENDPOINTS 
} from '../types/api';

class AuthService {
  /**
   * Login user with email/username and password
   */
  async login(loginData: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        loginData
      );
      
      // Store token and user info in localStorage
      const { token, userId, username, email } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify({ userId, username, email }));
      
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  /**
   * Register new user
   */
  async register(registerData: RegisterRequest): Promise<UserProfileDto> {
    try {
      const response = await apiClient.post<UserProfileDto>(
        API_ENDPOINTS.AUTH.REGISTER,
        registerData
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      // Log error but don't throw - we still want to clear local storage
      console.error('Logout API error:', error);
    } finally {
      // Always clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  }

  /**
   * Validate current token
   */
  async validateToken(): Promise<boolean> {
    try {
      const response = await apiClient.get<boolean>(API_ENDPOINTS.AUTH.VALIDATE);
      return response.data;
    } catch (error) {
      // If token validation fails, clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      return false;
    }
  }

  /**
   * Get current user from localStorage
   */
  getCurrentUser(): { userId: string; username: string; email: string } | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  /**
   * Get auth token
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}

export const authService = new AuthService();