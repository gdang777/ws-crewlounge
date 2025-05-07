/**
 * Base API service for handling HTTP requests to the backend
 */

// API base URL - will be different in development vs production
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5002/api/v1';

// Default headers for JSON API requests
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

/**
 * Handle API response and error checking
 */
async function handleResponse(response: Response) {
  if (!response.ok) {
    // Try to get error message from response
    let errorMessage;
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || `API error: ${response.status}`;
    } catch (e) {
      errorMessage = `API error: ${response.status}`;
    }
    throw new Error(errorMessage);
  }
  
  return response.json();
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
 * API service methods
 */
const api = {
  /**
   * GET request
   */
  async get(endpoint: string, authenticated = false) {
    const headers = {
      ...DEFAULT_HEADERS,
      ...(authenticated ? getAuthHeaders() : {}),
    };
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers,
    });
    
    return handleResponse(response);
  },
  
  /**
   * POST request
   */
  async post(endpoint: string, data: any, authenticated = false) {
    const headers = {
      ...DEFAULT_HEADERS,
      ...(authenticated ? getAuthHeaders() : {}),
    };
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
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
    });
    
    return handleResponse(response);
  },
};

export default api;
