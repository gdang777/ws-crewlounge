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
    // Call the logout endpoint
    await api.get('/auth/logout');
    
    // Remove token from local storage
    localStorage.removeItem('token');
    
    return { success: true };
  },
  
  /**
   * Get current user profile
   */
  async getCurrentUser() {
    return api.get('/auth/me', true);
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
    return !!localStorage.getItem('token');
  },
};

export default authService;
