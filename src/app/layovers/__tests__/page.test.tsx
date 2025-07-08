import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import LayoversPage from '../page';
import layoverService from '../../../services/layoverService';

// Mock the layover service
jest.mock('../../../services/layoverService');

// Mock the AuthContext
jest.mock('../../../context/AuthContext', () => ({
  __esModule: true,
  default: {
    Consumer: ({ children }: any) => children({
      isAuthenticated: true,
      user: { email: 'test@example.com' },
    }),
    Provider: ({ children }: any) => children,
  },
}));

describe('LayoversPage', () => {
  const mockLayovers = [
    {
      city: 'London',
      country: 'UK',
      airport: 'LHR',
      description: 'Test description',
      image: 'test.jpg',
      transportation: 'Test transport',
      recommendations: [],
    },
    {
      city: 'Paris',
      country: 'France',
      airport: 'CDG',
      description: 'Test description',
      image: 'test.jpg',
      transportation: 'Test transport',
      recommendations: [],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (layoverService.getLayovers as jest.Mock).mockResolvedValue({
      success: true,
      data: mockLayovers,
    });
  });

  it('renders loading state initially', () => {
    render(<LayoversPage />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders layover list after loading', async () => {
    await act(async () => {
      render(<LayoversPage />);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
  });

  it('filters layovers based on search input', async () => {
    await act(async () => {
      render(<LayoversPage />);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText(/search cities/i), { target: { value: 'london' } });
    });

    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.queryByText('Paris')).not.toBeInTheDocument();
  });

  it('shows error state when API call fails', async () => {
    const error = new Error('Failed to fetch');
    (layoverService.getLayovers as jest.Mock).mockRejectedValue(error);

    await act(async () => {
      render(<LayoversPage />);
    });

    await waitFor(() => {
      expect(screen.getByText(/error loading layovers/i)).toBeInTheDocument();
    });
  });

  it('opens add city modal when clicking add button', async () => {
    await act(async () => {
      render(<LayoversPage />);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId('add-city-button'));
    });

    expect(screen.getByText('Add New Layover City')).toBeInTheDocument();
  });

  it('creates new layover when submitting form', async () => {
    const newLayover = {
      city: 'Tokyo',
      country: 'Japan',
      code: 'NRT',
      description: 'Test description',
      transportation: 'Test transport',
    };

    (layoverService.createLayover as jest.Mock).mockResolvedValue({
      success: true,
      data: { ...newLayover, id: '123' },
    });

    await act(async () => {
      render(<LayoversPage />);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    // Open modal
    await act(async () => {
      fireEvent.click(screen.getByTestId('add-city-button'));
    });

    // Fill form
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText(/e\.g\., london/i), {
        target: { value: newLayover.city },
      });
      fireEvent.change(screen.getByPlaceholderText(/e\.g\., united kingdom/i), {
        target: { value: newLayover.country },
      });
      fireEvent.change(screen.getByPlaceholderText(/e\.g\., lhr/i), {
        target: { value: newLayover.code },
      });
    });

    // Submit form
    await act(async () => {
      fireEvent.click(screen.getByText('Add City'));
    });

    await waitFor(() => {
      expect(layoverService.createLayover).toHaveBeenCalledWith(expect.objectContaining({
        city: newLayover.city,
        country: newLayover.country,
        code: newLayover.code,
      }));
    });
  });

  it('handles form validation errors', async () => {
    await act(async () => {
      render(<LayoversPage />);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    // Open modal
    await act(async () => {
      fireEvent.click(screen.getByTestId('add-city-button'));
    });

    // Try to submit empty form
    await act(async () => {
      fireEvent.click(screen.getByText('Add City'));
    });

    // Check for validation error messages
    expect(screen.getByText('City name is required')).toBeInTheDocument();
    expect(screen.getByText('Country is required')).toBeInTheDocument();
    expect(screen.getByText('Airport code is required')).toBeInTheDocument();
  });

  it('handles image upload errors', async () => {
    const newLayover = {
      city: 'Tokyo',
      country: 'Japan',
      code: 'NRT',
      image: new File(['test'], 'test.jpg', { type: 'image/jpeg' }),
    };

    const error = new Error('Image upload failed');
    (layoverService.createLayover as jest.Mock).mockRejectedValue(error);

    await act(async () => {
      render(<LayoversPage />);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    // Open modal
    await act(async () => {
      fireEvent.click(screen.getByTestId('add-city-button'));
    });

    // Fill form
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText(/e\.g\., london/i), {
        target: { value: newLayover.city },
      });
      fireEvent.change(screen.getByPlaceholderText(/e\.g\., united kingdom/i), {
        target: { value: newLayover.country },
      });
      fireEvent.change(screen.getByPlaceholderText(/e\.g\., lhr/i), {
        target: { value: newLayover.code },
      });
    });

    // Submit form
    await act(async () => {
      fireEvent.click(screen.getByText('Add City'));
    });

    expect(screen.getByText('Error creating layover: Image upload failed')).toBeInTheDocument();
  });

  it('handles search with no results', async () => {
    await act(async () => {
      render(<LayoversPage />);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText(/search cities/i), { target: { value: 'nonexistent' } });
    });

    expect(screen.queryByText('London')).not.toBeInTheDocument();
    expect(screen.queryByText('Paris')).not.toBeInTheDocument();
    expect(screen.getByText('No cities found matching your search')).toBeInTheDocument();
  });

  it('refreshes layover list after adding new city', async () => {
    const newLayover = {
      city: 'Tokyo',
      country: 'Japan',
      code: 'NRT',
      description: 'Test description',
      transportation: 'Test transport',
    };

    (layoverService.createLayover as jest.Mock).mockResolvedValue({
      success: true,
      data: { ...newLayover, id: '123' },
    });

    await act(async () => {
      render(<LayoversPage />);
    });

    // Initial list
    await waitFor(() => {
      expect(screen.getByText('London')).toBeInTheDocument();
      expect(screen.getByText('Paris')).toBeInTheDocument();
    });

    // Add new city
    await act(async () => {
      fireEvent.click(screen.getByTestId('add-city-button'));
    });

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText(/e\.g\., london/i), {
        target: { value: newLayover.city },
      });
      fireEvent.change(screen.getByPlaceholderText(/e\.g\., united kingdom/i), {
        target: { value: newLayover.country },
      });
      fireEvent.change(screen.getByPlaceholderText(/e\.g\., lhr/i), {
        target: { value: newLayover.code },
      });
    });

    // Mock the updated list including the new city
    const updatedLayovers = [...mockLayovers, {
      city: 'Tokyo',
      country: 'Japan',
      airport: 'NRT',
      description: 'Test description',
      image: 'test.jpg',
      transportation: 'Test transport',
      recommendations: [],
    }];

    (layoverService.getLayovers as jest.Mock).mockResolvedValue({
      success: true,
      data: updatedLayovers,
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Add City'));
    });

    // Verify the list is updated
    await waitFor(() => {
      expect(screen.getByText('London')).toBeInTheDocument();
      expect(screen.getByText('Paris')).toBeInTheDocument();
      expect(screen.getByText('Tokyo')).toBeInTheDocument();
    });
  });

  it('handles network errors during layover creation', async () => {
    const networkError = new Error('Network error');
    (layoverService.createLayover as jest.Mock).mockRejectedValue(networkError);

    await act(async () => {
      render(<LayoversPage />);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    // Open modal
    await act(async () => {
      fireEvent.click(screen.getByTestId('add-city-button'));
    });

    // Fill form with valid data
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText(/e\.g\., london/i), {
        target: { value: 'Tokyo' },
      });
      fireEvent.change(screen.getByPlaceholderText(/e\.g\., united kingdom/i), {
        target: { value: 'Japan' },
      });
      fireEvent.change(screen.getByPlaceholderText(/e\.g\., lhr/i), {
        target: { value: 'NRT' },
      });
    });

    // Submit form
    await act(async () => {
      fireEvent.click(screen.getByText('Add City'));
    });

    expect(screen.getByText('Error creating layover: Network error')).toBeInTheDocument();
  });

  it('handles invalid file types during image upload', async () => {
    await act(async () => {
      render(<LayoversPage />);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    // Open modal
    await act(async () => {
      fireEvent.click(screen.getByTestId('add-city-button'));
    });

    // Try to upload invalid file
    const invalidFile = new File(['test'], 'test.txt', { type: 'text/plain' });
    await act(async () => {
      fireEvent.change(screen.getByLabelText('Image'), {
        target: { files: [invalidFile] },
      });
    });

    expect(screen.getByText('Please upload an image file (jpg, jpeg, png, or gif)')).toBeInTheDocument();
  });

  it('handles large file size during image upload', async () => {
    await act(async () => {
      render(<LayoversPage />);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    // Open modal
    await act(async () => {
      fireEvent.click(screen.getByTestId('add-city-button'));
    });

    // Create a large file (6MB)
    const largeFile = new File([new ArrayBuffer(6 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' });
    await act(async () => {
      fireEvent.change(screen.getByLabelText('Image'), {
        target: { files: [largeFile] },
      });
    });

    expect(screen.getByText('File size must be less than 5MB')).toBeInTheDocument();
  });

  it('handles pagination correctly', async () => {
    // Mock 12 layovers (more than one page)
    const manyLayovers = Array.from({ length: 12 }, (_, i) => ({
      city: `City ${i}`,
      country: 'Test Country',
      airport: 'TST',
      description: 'Test description',
      image: 'test.jpg',
      transportation: 'Test transport',
      recommendations: [],
    }));

    (layoverService.getLayovers as jest.Mock).mockResolvedValue({
      success: true,
      data: manyLayovers,
    });

    await act(async () => {
      render(<LayoversPage />);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    // Check that only first page items are shown initially
    expect(screen.getByText('City 0')).toBeInTheDocument();
    expect(screen.queryByText('City 11')).not.toBeInTheDocument();

    // Go to next page
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /next/i }));
    });

    // Check that second page items are shown
    expect(screen.queryByText('City 0')).not.toBeInTheDocument();
    expect(screen.getByText('City 11')).toBeInTheDocument();
  });

  it('preserves search state after modal operations', async () => {
    await act(async () => {
      render(<LayoversPage />);
    });

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });

    // Search for 'London'
    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText(/search cities/i), { target: { value: 'london' } });
    });

    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.queryByText('Paris')).not.toBeInTheDocument();

    // Open and close modal
    await act(async () => {
      fireEvent.click(screen.getByTestId('add-city-button'));
    });
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
    });

    // Check that search state is preserved
    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.queryByText('Paris')).not.toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search cities/i)).toHaveValue('london');
  });
}); 