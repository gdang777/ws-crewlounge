import api from './api';

/**
 * Authentication service for user registration, login, and profile management
 */
const authService = {
  /**
   * Register a new user
   */
  async register(userData: {
    name: string;
    email: string;
    password: string;
    role?: string;
    airline?: string;
    position?: string;
  }) {
    const response = await api.post('/auth/register', userData);
    
    // Save token to local storage if registration is successful
    if (response.success && response.token) {
      localStorage.setItem('token', response.token);
    }
    
    return response;
  },
  
  /**
   * Login user
   */
  async login(credentials: { email: string; password: string }) {
    const response = await api.post('/auth/login', credentials);
    
    // Save token to local storage if login is successful
    if (response.success && response.token) {
      localStorage.setItem('token', response.token);
    }
    
    return response;
  },
  
  /**
   * Logout user
   */
  async logout() {
    try {
      // Call the logout endpoint
      await api.get('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always remove token from local storage
      localStorage.removeItem('token');
    }
    
    return { success: true };
  },
  
  /**
   * Get current user profile
   */
  async getCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      return { success: false, error: 'No token found' };
    }
    
    try {
      const response = await api.get('/auth/me', true);
      return response;
    } catch (error) {
      localStorage.removeItem('token');
      return { success: false, error: 'Failed to get user profile' };
    }
  },
  
  /**
   * Update user details
   */
  async updateUserDetails(userData: {
    name?: string;
    email?: string;
    airline?: string;
    position?: string;
    bio?: string;
    phoneNumber?: string;
  }) {
    return api.put('/auth/updatedetails', userData, true);
  },
  
  /**
   * Update user password
   */
  async updatePassword(passwordData: {
    currentPassword: string;
    newPassword: string;
  }) {
    return api.put('/auth/updatepassword', passwordData, true);
  },
  
  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem('token');
    return !!token;
  },
};

export default authService;
