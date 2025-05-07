import api from './api';

/**
 * Gig service for managing aviation gig opportunities
 */
const gigService = {
  /**
   * Get all gigs with optional filtering
   */
  async getGigs(params = {}) {
    // Convert params object to query string
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    const endpoint = queryString ? `/gigs?${queryString}` : '/gigs';
    
    return api.get(endpoint);
  },
  
  /**
   * Get a single gig by ID
   */
  async getGig(id: string) {
    return api.get(`/gigs/${id}`);
  },
  
  /**
   * Create a new gig (requires authentication)
   */
  async createGig(gigData: {
    title: string;
    description: string;
    type: string;
    airline?: string;
    location: string;
    airport: string;
    compensation: string;
    startDate: Date;
    endDate?: Date;
    isFlexible?: boolean;
    requirements?: string[];
    contactEmail: string;
    contactPhone?: string;
  }) {
    return api.post('/gigs', gigData, true);
  },
  
  /**
   * Update a gig (requires authentication)
   */
  async updateGig(id: string, gigData: any) {
    return api.put(`/gigs/${id}`, gigData, true);
  },
  
  /**
   * Delete a gig (requires authentication)
   */
  async deleteGig(id: string) {
    return api.delete(`/gigs/${id}`, true);
  },
  
  /**
   * Get gigs by airport code
   */
  async getGigsByAirport(airportCode: string) {
    return api.get(`/gigs/airport/${airportCode}`);
  },
};

export default gigService;
