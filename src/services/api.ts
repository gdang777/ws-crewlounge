/**
 * Base API service for handling HTTP requests to the backend
 */

// API base URL - will be different in development vs production
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002/api/v1';

// Enable mock mode for development when backend is not available
const MOCK_MODE = false; // Now connecting to the real backend

// Default headers for JSON API requests
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

/**
 * Handle API response and error checking
 */
async function handleResponse(response: Response) {
  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  
  if (!response.ok) {
    let errorMessage;
    try {
      if (isJson) {
        const errorData = await response.json();
        errorMessage = errorData.error || `API error: ${response.status}`;
      } else {
        errorMessage = `API error: ${response.status}`;
      }
    } catch (e) {
      errorMessage = `API error: ${response.status}`;
    }
    throw new Error(errorMessage);
  }
  
  if (isJson) {
    return response.json();
  }
  
  return { success: true };
}

/**
 * Get authentication token from local storage
 */
function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
}

/**
 * Add authentication headers if user is logged in
 */
function getAuthHeaders(): HeadersInit {
  const token = getAuthToken();
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

/**
 * Mock API responses for development
 */
type MockResponseMap = {
  [key: string]: (data?: any) => any;
};

const mockResponses: MockResponseMap = {
  '/auth/login': (data: any) => {
    // Check if email and password match our mock user
    if (data.email === 'test@example.com' && data.password === 'password') {
      return {
        success: true,
        token: 'mock-jwt-token',
        message: 'Login successful'
      };
    } else {
      return {
        success: false,
        error: 'Invalid email or password'
      };
    }
  },
  '/auth/register': (data: any) => {
    return {
      success: true,
      token: 'mock-jwt-token',
      message: 'Registration successful'
    };
  },
  '/auth/me': () => {
    return {
      success: true,
      data: {
        _id: 'mock-user-id',
        name: 'Test User',
        email: 'test@example.com',
        role: 'host',
        airline: 'Mock Airlines',
        position: 'Pilot',
        status: 'approved',
        createdAt: new Date().toISOString(),
        verificationDocuments: ['mock-document.pdf']
      }
    };
  },
  '/auth/logout': () => {
    return {
      success: true,
      message: 'Logout successful'
    };
  }
};

/**
 * Get base URL for API requests
 */
function getBaseUrl(): string {
  return API_BASE_URL;
}

/**
 * API service methods
 */
const api = {
  /**
   * GET request
   */
  async get(endpoint: string, authenticated = false) {
    // Use mock response if in mock mode
    if (MOCK_MODE && Object.prototype.hasOwnProperty.call(mockResponses, endpoint)) {
      console.log('MOCK API GET:', endpoint);
      return mockResponses[endpoint]();
    }
    
    const headers = {
      ...DEFAULT_HEADERS,
      ...(authenticated ? getAuthHeaders() : {}),
    };
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers,
      credentials: 'include',
    });
    
    return handleResponse(response);
  },
  
  /**
   * POST request
   */
  async post(endpoint: string, data: any, authenticated = false) {
    // Use mock response if in mock mode
    if (MOCK_MODE && Object.prototype.hasOwnProperty.call(mockResponses, endpoint)) {
      console.log('MOCK API POST:', endpoint, data);
      return mockResponses[endpoint](data);
    }
    
    const headers = {
      ...DEFAULT_HEADERS,
      ...(authenticated ? getAuthHeaders() : {}),
    };
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
      credentials: 'include',
    });
    
    return handleResponse(response);
  },
  
  /**
   * PUT request
   */
  async put(endpoint: string, data: any, authenticated = false) {
    const headers = {
      ...DEFAULT_HEADERS,
      ...(authenticated ? getAuthHeaders() : {}),
    };
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
      credentials: 'include',
    });
    
    return handleResponse(response);
  },
  
  /**
   * DELETE request
   */
  async delete(endpoint: string, authenticated = false) {
    const headers = {
      ...DEFAULT_HEADERS,
      ...(authenticated ? getAuthHeaders() : {}),
    };
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers,
      credentials: 'include',
    });
    
    return handleResponse(response);
  },

  // Helper methods
  getBaseUrl,
  getAuthHeaders,
  handleResponse
};

export default api;
