import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../services';

// Define the User type
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  airline?: string;
  position?: string;
  avatar?: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
  verificationDocuments?: string[];
}

// Define the context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: any) => Promise<void>;
  isAuthenticated: boolean;
  isApproved: boolean;
  canAddListings: boolean;
  uploadVerificationDocument: (file: File) => Promise<void>;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  updateProfile: async () => {},
  isAuthenticated: false,
  isApproved: false,
  canAddListings: false,
  uploadVerificationDocument: async () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component that wraps the app and makes auth available to any child component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [canAddListings, setCanAddListings] = useState(false);

  // Load user on initial render if token exists
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          setLoading(true);
          const response = await authService.getCurrentUser();
          if (response.success && response.data) {
            setUser(response.data);
            setIsAuthenticated(true);
            // Update approval status
            setIsApproved(response.data.status === 'approved');
            setCanAddListings(
              response.data.status === 'approved' && 
              (response.data.role === 'host' || response.data.role === 'admin')
            );
          } else {
            // Token might be invalid or expired
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            setUser(null);
          }
        }
      } catch (err) {
        console.error('Error loading user:', err);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login user
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login({ email, password });
      if (response.success) {
        setUser(response.user);
        setIsAuthenticated(true);
        // Update approval status
        setIsApproved(response.user.status === 'approved');
        setCanAddListings(
          response.user.status === 'approved' && 
          (response.user.role === 'host' || response.user.role === 'admin')
        );
      } else {
        setError(response.error || 'Login failed');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const register = async (userData: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.register(userData);
      if (response.success) {
        setUser(response.user);
        setIsAuthenticated(true);
        // New users start with pending status
        setIsApproved(false);
        setCanAddListings(false);
      } else {
        setError(response.error || 'Registration failed');
      }
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (err: any) {
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (userData: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.updateUserDetails(userData);
      if (response.success) {
        setUser(response.data);
      } else {
        setError(response.error || 'Profile update failed');
      }
    } catch (err: any) {
      setError(err.message || 'Profile update failed');
    } finally {
      setLoading(false);
    }
  };

  // Upload verification document for airline employment
  const uploadVerificationDocument = async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      // This would be implemented in the authService
      // For now, we'll just simulate the API call
      console.log('Uploading verification document:', file.name);
      // In a real implementation, you would upload the file to your server
      // and update the user's verification documents
      
      // Simulate success
      if (user) {
        const updatedUser = {
          ...user,
          verificationDocuments: [...(user.verificationDocuments || []), 'new-document-id']
        };
        setUser(updatedUser);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to upload document');
    } finally {
      setLoading(false);
    }
  };
  
  // Check if the user can add listings based on their approval status and role
  useEffect(() => {
    if (user) {
      // User is approved and is either a host or admin
      const approved = user.status === 'approved';
      setIsApproved(approved);
      setCanAddListings(approved && (user.role === 'host' || user.role === 'admin'));
    } else {
      setIsApproved(false);
      setCanAddListings(false);
    }
  }, [user]);

  // Context value
  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated,
    isApproved,
    canAddListings,
    uploadVerificationDocument,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
