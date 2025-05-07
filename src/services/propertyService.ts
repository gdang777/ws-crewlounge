import api from './api';

/**
 * Property service for managing property listings (crashpads and vacation rentals)
 */
const propertyService = {
  /**
   * Get all properties with optional filtering
   */
  async getProperties(params = {}) {
    // Convert params object to query string
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    const endpoint = queryString ? `/properties?${queryString}` : '/properties';
    
    return api.get(endpoint);
  },
  
  /**
   * Get properties by category (crashpad or vacation)
   */
  async getPropertiesByCategory(category: 'crashpad' | 'vacation') {
    return api.get(`/properties?category=${category}`);
  },
  
  /**
   * Get a single property by ID
   */
  async getProperty(id: string) {
    return api.get(`/properties/${id}`);
  },
  
  /**
   * Create a new property (requires authentication)
   */
  async createProperty(propertyData: {
    title: string;
    description: string;
    type: string;
    category: 'crashpad' | 'vacation';
    price: number;
    address: string;
    nearestAirport: string;
    distanceToAirport: number;
    beds: number;
    baths: number;
    maxGuests: number;
    amenities?: Record<string, boolean>;
    mainImage: string;
  }) {
    return api.post('/properties', propertyData, true);
  },
  
  /**
   * Update a property (requires authentication)
   */
  async updateProperty(id: string, propertyData: any) {
    return api.put(`/properties/${id}`, propertyData, true);
  },
  
  /**
   * Delete a property (requires authentication)
   */
  async deleteProperty(id: string) {
    return api.delete(`/properties/${id}`, true);
  },
  
  /**
   * Get properties within a radius of a zipcode
   */
  async getPropertiesInRadius(zipcode: string, distance: number) {
    return api.get(`/properties/radius/${zipcode}/${distance}`);
  },
  
  /**
   * Get reviews for a property
   */
  async getPropertyReviews(id: string) {
    return api.get(`/properties/${id}/reviews`);
  },
  
  /**
   * Add a review to a property (requires authentication)
   */
  async addPropertyReview(id: string, reviewData: {
    title: string;
    text: string;
    rating: number;
  }) {
    return api.post(`/properties/${id}/reviews`, reviewData, true);
  },
};

export default propertyService;
