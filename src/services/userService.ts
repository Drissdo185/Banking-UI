import { apiClient, handleApiError } from '../config/api';
import { 
  UserProfileDto, 
  UpdateProfileRequest,
  UserValidationResponse,
  API_ENDPOINTS 
} from '../types/api';

class UserService {
  /**
   * Get current user's profile
   */
  async getCurrentUserProfile(): Promise<UserProfileDto> {
    try {
      const response = await apiClient.get<UserProfileDto>(API_ENDPOINTS.USERS.PROFILE);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  /**
   * Update current user's profile
   */
  async updateProfile(updateData: UpdateProfileRequest): Promise<UserProfileDto> {
    try {
      const response = await apiClient.put<UserProfileDto>(
        API_ENDPOINTS.USERS.PROFILE,
        updateData
      );
      
      // Update user info in localStorage if it exists
      const currentUser = localStorage.getItem('user');
      if (currentUser) {
        try {
          const user = JSON.parse(currentUser);
          const updatedUser = { ...user, ...response.data };
          localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (error) {
          console.error('Error updating localStorage user info:', error);
        }
      }
      
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<UserProfileDto> {
    try {
      const response = await apiClient.get<UserProfileDto>(
        API_ENDPOINTS.USERS.BY_ID(userId)
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  /**
   * Get user by username
   */
  async getUserByUsername(username: string): Promise<UserProfileDto> {
    try {
      const response = await apiClient.get<UserProfileDto>(
        API_ENDPOINTS.USERS.BY_USERNAME(username)
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email: string): Promise<UserProfileDto> {
    try {
      const response = await apiClient.get<UserProfileDto>(
        API_ENDPOINTS.USERS.BY_EMAIL(email)
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  /**
   * Delete current user account
   */
  async deleteAccount(): Promise<void> {
    try {
      await apiClient.delete(API_ENDPOINTS.USERS.PROFILE);
      
      // Clear local storage after successful deletion
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    } catch (error) {
      throw handleApiError(error);
    }
  }

  /**
   * Validate user by ID (internal service endpoint)
   */
  async validateUserById(userId: string): Promise<UserValidationResponse> {
    try {
      const response = await apiClient.get<UserValidationResponse>(
        `/api/users/internal/validate/${userId}`
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
}

export const userService = new UserService();