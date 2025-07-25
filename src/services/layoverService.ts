import api from './api';

/**
 * Layover service for managing layover information
 */
const layoverService = {
  /**
   * Get all layovers with optional filtering
   */
  async getLayovers(params = {}) {
    // Convert params object to query string
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    const endpoint = queryString ? `/layovers?${queryString}` : '/layovers';
    
    try {
      const response = await api.get(endpoint);
      return response;
    } catch (error) {
      throw error;
    }
  },
  
  /**
   * Get a single layover by ID
   */
  async getLayover(id: string) {
    return api.get(`/layovers/${id}`);
  },
  
  /**
   * Create a new layover with image upload (requires authentication)
   */
  async createLayover(layoverData: any) {
    try {
      const formData = new FormData();
      
      // Add all fields to formData
      Object.keys(layoverData).forEach(key => {
        if (key === 'image' && layoverData[key] instanceof File) {
          formData.append('image', layoverData[key]);
        } else if (layoverData[key] !== undefined && layoverData[key] !== null) {
          formData.append(key, layoverData[key].toString());
        }
      });

      const response = await fetch(`${api.getBaseUrl()}/layovers`, {
        method: 'POST',
        headers: {
          ...api.getAuthHeaders()
        },
        body: formData,
        credentials: 'include'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create layover');
      }

      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to create layover');
    }
  },
  
  /**
   * Update a layover (requires authentication)
   */
  async updateLayover(id: string, layoverData: any) {
    return api.put(`/layovers/${id}`, layoverData, true);
  },
  
  /**
   * Delete a layover (requires admin authentication)
   */
  async deleteLayover(id: string) {
    return api.delete(`/layovers/${id}`, true);
  },
  
  /**
   * Get reviews for a layover
   */
  async getLayoverReviews(id: string) {
    return api.get(`/layovers/${id}/reviews`);
  },
  
  /**
   * Add a review to a layover (requires authentication)
   */
  async addLayoverReview(id: string, reviewData: {
    title: string;
    text: string;
    rating: number;
  }) {
    return api.post(`/layovers/${id}/reviews`, reviewData, true);
  },

  /**
   * Get recommendations for a layover
   */
  async getRecommendations(layoverId: string) {
    return api.get(`/layovers/${layoverId}/recommendations`);
  },

  /**
   * Get a single recommendation
   */
  async getRecommendation(layoverId: string, recommendationId: string) {
    return api.get(`/layovers/${layoverId}/recommendations/${recommendationId}`);
  },

  /**
   * Add a recommendation to a layover (requires authentication)
   */
  async addRecommendation(layoverId: string, recommendationData: {
    name: string;
    type: string;
    description: string;
    address?: string;
    website?: string;
    image?: string;
    rating?: number;
    crewDiscount?: string;
    recommendedBy: string;
  }) {
    return api.post(`/layovers/${layoverId}/recommendations`, recommendationData, true);
  },

  /**
   * Add a comment to a recommendation (requires authentication)
   */
  async addRecommendationComment(layoverId: string, recommendationId: string, commentData: {
    text: string;
  }) {
    return api.post(`/layovers/${layoverId}/recommendations/${recommendationId}/comments`, commentData, true);
  },

  /**
   * Get travel tips for a layover
   */
  async getTravelTips(layoverId: string) {
    return api.get(`/layovers/${layoverId}/travelTips`);
  },

  /**
   * Add a travel tip to a layover (requires authentication)
   */
  async addTravelTip(layoverId: string, tipData: {
    text: string;
    mood: 'happy' | 'neutral' | 'sad';
  }) {
    return api.post(`/layovers/${layoverId}/travelTips`, tipData, true);
  },

  /**
   * Delete a travel tip (requires authentication and ownership)
   */
  async deleteTravelTip(layoverId: string, tipId: string) {
    return api.delete(`/layovers/${layoverId}/travelTips/${tipId}`, true);
  },

  /**
   * Upload an image for a layover (requires authentication)
   */
  async uploadLayoverImage(id: string, imageFile: File) {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await fetch(`${api.getBaseUrl()}/layovers/${id}/image`, {
      method: 'PUT',
      headers: {
        ...api.getAuthHeaders()
      },
      body: formData,
      credentials: 'include'
    });
    
    return api.handleResponse(response);
  },
};

export default layoverService;
