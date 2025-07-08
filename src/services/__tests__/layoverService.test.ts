import api from '../api';
import layoverService from '../layoverService';

interface LayoverReview {
  title: string;
  text: string;
  rating: number;
  id?: string;
}

interface Layover {
  city: string;
  country: string;
  airport: string;
  description: string;
  image?: string;
  transportation: string;
}

// Mock FormData
const mockAppend = jest.fn();
global.FormData = jest.fn().mockImplementation(() => ({
  append: mockAppend,
}));

// Mock fetch
global.fetch = jest.fn();

jest.mock('../api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('layoverService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getLayovers', () => {
    it('should fetch layovers successfully', async () => {
      const mockLayovers = [
        {
          city: 'London',
          country: 'UK',
          airport: 'LHR',
          description: 'Test description',
          image: 'test.jpg',
          transportation: 'Test transport',
        },
      ];

      (api.get as jest.Mock).mockResolvedValue({
        success: true,
        data: mockLayovers,
      });

      const result = await layoverService.getLayovers();

      expect(api.get).toHaveBeenCalledWith('/layovers');
      expect(result).toEqual({
        success: true,
        data: mockLayovers,
      });
    });

    it('should handle errors when fetching layovers', async () => {
      const error = new Error('Failed to fetch');
      (api.get as jest.Mock).mockRejectedValue(error);

      await expect(layoverService.getLayovers()).rejects.toThrow('Failed to fetch');
    });
  });

  describe('createLayover', () => {
    it('should create a layover successfully', async () => {
      const newLayover = {
        city: 'Paris',
        country: 'France',
        code: 'CDG',
        description: 'Test description',
        transportation: 'Test transport',
      };

      const mockResponse = {
        success: true,
        data: { ...newLayover, id: '123' },
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await layoverService.createLayover(newLayover);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:5002/api/v1/layovers',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Authorization': 'Bearer test-token',
          }),
        })
      );

      // Verify FormData was created correctly
      expect(FormData).toHaveBeenCalled();
      Object.entries(newLayover).forEach(([key, value]) => {
        expect(mockAppend).toHaveBeenCalledWith(key, value);
      });

      expect(result).toEqual(mockResponse);
    });

    it('should handle errors when creating a layover', async () => {
      const newLayover = {
        city: 'Paris',
        country: 'France',
        code: 'CDG',
      };

      (global.fetch as jest.Mock).mockRejectedValue(new Error('Failed to create'));

      await expect(layoverService.createLayover(newLayover)).rejects.toThrow('Failed to create');
    });
  });

  describe('getLayover', () => {
    it('should fetch a single layover successfully', async () => {
      const mockLayover = {
        city: 'London',
        country: 'UK',
        airport: 'LHR',
        description: 'Test description',
        image: 'test.jpg',
        transportation: 'Test transport',
      };

      (api.get as jest.Mock).mockResolvedValue({
        success: true,
        data: mockLayover,
      });

      const result = await layoverService.getLayover('123');

      expect(api.get).toHaveBeenCalledWith('/layovers/123');
      expect(result).toEqual({
        success: true,
        data: mockLayover,
      });
    });

    it('should handle errors when fetching a single layover', async () => {
      const error = new Error('Layover not found');
      (api.get as jest.Mock).mockRejectedValue(error);

      await expect(layoverService.getLayover('123')).rejects.toThrow('Layover not found');
    });
  });

  describe('uploadLayoverImage', () => {
    it('should upload an image successfully', async () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const mockResponse = {
        success: true,
        data: {
          url: 'https://example.com/test.jpg',
        },
      };

      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await layoverService.uploadLayoverImage('123', mockFile);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:5002/api/v1/layovers/123/image',
        expect.objectContaining({
          method: 'PUT',
          headers: expect.objectContaining({
            'Authorization': 'Bearer test-token',
          }),
        })
      );

      // Verify FormData was created correctly
      expect(FormData).toHaveBeenCalled();
      expect(mockAppend).toHaveBeenCalledWith('image', mockFile);

      expect(result).toEqual(mockResponse);
    });

    it('should handle errors when uploading an image', async () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Upload failed'));

      await expect(layoverService.uploadLayoverImage('123', mockFile)).rejects.toThrow('Upload failed');
    });
  });

  describe('getLayoverReviews', () => {
    it('should fetch reviews successfully', async () => {
      const mockReviews = [
        {
          title: 'Great city',
          text: 'Loved it',
          rating: 5,
        },
      ];

      (api.get as jest.Mock).mockResolvedValue({
        success: true,
        data: mockReviews,
      });

      const result = await layoverService.getLayoverReviews('123');

      expect(api.get).toHaveBeenCalledWith('/layovers/123/reviews');
      expect(result).toEqual({
        success: true,
        data: mockReviews,
      });
    });

    it('should handle errors when fetching reviews', async () => {
      const error = new Error('Failed to fetch reviews');
      (api.get as jest.Mock).mockRejectedValue(error);

      await expect(layoverService.getLayoverReviews('123')).rejects.toThrow('Failed to fetch reviews');
    });
  });

  describe('addLayoverReview', () => {
    it('should add a review successfully', async () => {
      const mockReview = {
        title: 'Great city',
        text: 'Loved it',
        rating: 5,
      };

      (api.post as jest.Mock).mockResolvedValue({
        success: true,
        data: { ...mockReview, id: '456' },
      });

      const result = await layoverService.addLayoverReview('123', mockReview);

      expect(api.post).toHaveBeenCalledWith('/layovers/123/reviews', mockReview, true);
      expect(result).toEqual({
        success: true,
        data: { ...mockReview, id: '456' },
      });
    });

    it('should handle errors when adding a review', async () => {
      const mockReview = {
        title: 'Great city',
        text: 'Loved it',
        rating: 5,
      };

      const error = new Error('Failed to add review');
      (api.post as jest.Mock).mockRejectedValue(error);

      await expect(layoverService.addLayoverReview('123', mockReview)).rejects.toThrow('Failed to add review');
    });
  });
}); 