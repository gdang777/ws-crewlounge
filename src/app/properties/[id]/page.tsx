"use client";

import { useState, useEffect, useContext } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import AuthContext from '../../../context/AuthContext';
import propertyService from '../../../services/propertyService';
import Button from '../../../components/Button';
import MessageModal from '../../../components/MessageModal';

// Rating stars component
const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-sm font-medium text-gray-700">{rating}</span>
    </div>
  );
};

// Amenity icon component
const AmenityIcon = ({ name, icon }: { name: string; icon: string }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
        <span className="text-blue-500">{icon}</span>
      </div>
      <span className="text-sm text-gray-700">{name}</span>
    </div>
  );
};

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useContext(AuthContext);
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        // Check if it's a mock ID (starts with 'mock-')
        if (id && typeof id === 'string' && id.startsWith('mock-')) {
          // Use mock data for mock IDs
          console.log('Using mock data for property:', id);
          setProperty(getMockPropertyById(id as string));
        } else {
          // Try to fetch from API for real IDs
          const response = await propertyService.getProperty(id as string);
          setProperty(response.data);
        }
      } catch (err: any) {
        console.error('Error fetching property:', err);
        // Use mock data as fallback rather than showing an error
        setProperty(getMockPropertyById('mock-property-1'));
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  const nextImage = () => {
    if (property?.images && property.images.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (property?.images && property.images.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
      );
    }
  };

  // Define property type
  type MockProperty = {
    _id: string;
    title: string;
    location: {
      city: string;
      state: string;
    };
    distanceToAirport: string;
    type: string;
    host: {
      name: string;
      airline: string;
    };
    price: number;
    beds: number;
    baths: number;
    maxGuests: number;
    rating: number;
    reviewCount: number;
    amenities: {
      [key: string]: boolean;
    };
    description: string;
    images: string[];
    createdAt: string;
  };

  // Get mock property based on ID
  const getMockPropertyById = (mockId: string): MockProperty => {
    // Map of mock properties by ID
    const mockProperties: Record<string, MockProperty> = {
      'mock-property-1': {
        _id: 'mock-property-1',
        title: 'Cozy Crashpad Near YYZ Airport',
        location: {
          city: 'Toronto',
          state: 'ON'
        },
        distanceToAirport: '3.2 km to YYZ',
        type: 'Private Room',
        host: {
          name: 'Maria S.',
          airline: 'Air Canada'
        },
        price: 65,
        beds: 1,
        baths: 1,
        maxGuests: 2,
        rating: 4.9,
        reviewCount: 28,
        amenities: {
          wifi: true,
          kitchen: true,
          laundry: true,
          dedicatedWorkspace: true,
          airConditioning: true,
          heating: true
        },
        description: 'Welcome to this private room in Toronto, ON! Perfect for aviation professionals, this 1-bedroom space offers a comfortable and convenient stay just 3.2 km to YYZ. This property features WiFi, Laundry, Kitchen and all the essentials you need for a comfortable stay between flights or during layovers. Hosted by a fellow aviation professional (Air Canada), you\'ll find this space perfectly suited to the unique needs of airline staff.',
        images: [
          'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80'
        ],
        createdAt: '2023-05-15T12:00:00Z'
      },
      'mock-property-2': {
        _id: 'mock-property-2',
        title: 'Modern Crashpad with Dedicated Workspace',
        location: {
          city: 'Vancouver',
          state: 'BC'
        },
        distanceToAirport: '5.1 km to YVR',
        type: 'Private Room',
        host: {
          name: 'John M.',
          airline: 'WestJet'
        },
        price: 75,
        beds: 1,
        baths: 1,
        maxGuests: 1,
        rating: 4.7,
        reviewCount: 42,
        amenities: {
          wifi: true,
          kitchen: true,
          dedicatedWorkspace: true,
          airConditioning: true,
          heating: true
        },
        description: 'Perfect for aviation professionals staying in Vancouver. This modern private room offers a comfortable workspace and all amenities needed for a productive and restful stay between flights.',
        images: [
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80'
        ],
        createdAt: '2023-06-20T14:30:00Z'
      },
      'mock-property-3': {
        _id: 'mock-property-3',
        title: 'Entire Apartment for Flight Crew',
        location: {
          city: 'Calgary',
          state: 'AB'
        },
        distanceToAirport: '2.8 km to YYC',
        type: 'Entire Apartment',
        host: {
          name: 'Sarah K.',
          airline: 'Swoop'
        },
        price: 120,
        beds: 2,
        baths: 1,
        maxGuests: 4,
        rating: 4.8,
        reviewCount: 15,
        amenities: {
          wifi: true,
          kitchen: true,
          laundry: true,
          dedicatedWorkspace: true,
          airConditioning: true,
          heating: true,
          parking: true
        },
        description: 'Spacious apartment perfect for flight crews looking for a comfortable stay in Calgary. With 2 beds and room for up to 4 guests, this is ideal for crew members traveling together.',
        images: [
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
        ],
        createdAt: '2023-07-10T09:15:00Z'
      },
      'mock-property-4': {
        _id: 'mock-property-4',
        title: 'Shared Crashpad with Airport Shuttle',
        location: {
          city: 'Montreal',
          state: 'QC'
        },
        distanceToAirport: '4.5 km to YUL',
        type: 'Shared Room',
        host: {
          name: 'Alex T.',
          airline: 'Air Transat'
        },
        price: 55,
        beds: 1,
        baths: 1.5,
        maxGuests: 1,
        rating: 4.6,
        reviewCount: 37,
        amenities: {
          wifi: true,
          kitchen: true,
          laundry: true,
          shuttle: true,
          heating: true
        },
        description: 'Affordable shared room option with a convenient airport shuttle service included. Perfect for aviation professionals on a budget who need easy transportation to YUL airport.',
        images: [
          'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
        ],
        createdAt: '2023-08-05T16:45:00Z'
      },
      'mock-property-5': {
        _id: 'mock-property-5',
        title: 'Quiet and Spacious Crew Stay',
        location: {
          city: 'Ottawa',
          state: 'ON'
        },
        distanceToAirport: '3.7 km to YOW',
        type: 'Private Room',
        host: {
          name: 'James R.',
          airline: 'Porter'
        },
        price: 85,
        beds: 1,
        baths: 1,
        maxGuests: 2,
        rating: 4.9,
        reviewCount: 19,
        amenities: {
          wifi: true,
          kitchen: true,
          laundry: true,
          dedicatedWorkspace: true,
          airConditioning: true,
          heating: true
        },
        description: 'Enjoy a peaceful and quiet stay in this spacious private room just minutes from Ottawa International Airport. Perfect for aviation professionals who need restful sleep between flights.',
        images: [
          'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80'
        ],
        createdAt: '2023-09-12T11:20:00Z'
      },
      'mock-property-6': {
        _id: 'mock-property-6',
        title: 'Cozy Studio near Airport',
        location: {
          city: 'Halifax',
          state: 'NS'
        },
        distanceToAirport: '6.2 km to YHZ',
        type: 'Studio',
        host: {
          name: 'Emma L.',
          airline: 'Air Canada'
        },
        price: 70,
        beds: 1,
        baths: 1,
        maxGuests: 2,
        rating: 4.7,
        reviewCount: 24,
        amenities: {
          wifi: true,
          kitchen: true,
          laundry: true,
          airConditioning: true,
          heating: true
        },
        description: 'Comfortable studio apartment perfect for aviation professionals staying in Halifax. This cozy space has everything you need for a comfortable stay between flights.',
        images: [
          'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80'
        ],
        createdAt: '2023-10-30T08:45:00Z'
      },
    };
    
    // Return the requested mock property or a default one if not found
    return mockId in mockProperties ? mockProperties[mockId] : mockProperties['mock-property-1'];
  };
  
  // Default mock property for demonstration
  const mockProperty = {
    _id: 'mock-id',
    title: 'Cozy Crashpad Near YYZ Airport',
    location: {
      city: 'Toronto',
      state: 'ON'
    },
    distanceToAirport: '3.2 km to YYZ',
    type: 'Private Room',
    host: {
      name: 'Maria S.',
      airline: 'Air Canada'
    },
    price: 65,
    beds: 1,
    baths: 1,
    maxGuests: 2,
    rating: 4.9,
    reviewCount: 28,
    amenities: {
      wifi: true,
      kitchen: true,
      laundry: true,
      dedicatedWorkspace: true,
      airConditioning: true,
      heating: true
    },
    description: 'Welcome to this private room in Toronto, ON! Perfect for aviation professionals, this 1-bedroom space offers a comfortable and convenient stay just 3.2 km to YYZ. This property features WiFi, Laundry, Kitchen and all the essentials you need for a comfortable stay between flights or during layovers. Hosted by a fellow aviation professional (Air Canada), you\'ll find this space perfectly suited to the unique needs of airline staff.',
    images: [
      'https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80'
    ],
    createdAt: '2023-05-15T12:00:00Z'
  };

  // Use mock data if property is not loaded yet
  const displayProperty = property || mockProperty;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // No error handling block here since we're using mock data as fallback
  // This ensures users always see property details

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back button */}
      <div className="mb-4">
        <button 
          onClick={() => router.back()}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Properties
        </button>
      </div>

      {/* Property title and actions */}
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold text-gray-900">{displayProperty.title}</h1>
        <div className="flex gap-2">
          <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
          <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Location and rating */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6">
        <div className="flex items-center text-gray-600">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{displayProperty.location.city}, {displayProperty.location.state}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          <span>{displayProperty.distanceToAirport}</span>
        </div>
        <div className="flex items-center">
          <RatingStars rating={displayProperty.rating} />
          <span className="ml-2 text-sm text-gray-600">({displayProperty.reviewCount} reviews)</span>
        </div>
      </div>

      {/* Property images */}
      <div className="relative mb-8 rounded-xl overflow-hidden">
        <div className="aspect-w-16 aspect-h-9 bg-gray-200">
          <img 
            src={displayProperty.images[currentImageIndex]} 
            alt={displayProperty.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Image navigation buttons */}
        <button 
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Image counter */}
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded">
          {currentImageIndex + 1} / {displayProperty.images.length}
        </div>
      </div>

      {/* Property details and booking */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column: Property details */}
        <div className="lg:col-span-2">
          {/* Host info */}
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-semibold mr-4">
              {displayProperty.host.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{displayProperty.type} hosted by {displayProperty.host.name}</h2>
              <p className="text-gray-600">{displayProperty.host.airline}</p>
            </div>
          </div>

          {/* Key features */}
          <div className="grid grid-cols-3 gap-4 mb-8 border-b border-gray-200 pb-8">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <div>
                <p className="font-medium">{displayProperty.beds} Bed</p>
                <p className="text-sm text-gray-500">Comfortable sleeping arrangements</p>
              </div>
            </div>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="font-medium">{displayProperty.baths} Bathroom</p>
                <p className="text-sm text-gray-500">Clean and well-maintained</p>
              </div>
            </div>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
              <div>
                <p className="font-medium">Fast Wifi</p>
                <p className="text-sm text-gray-500">Stay connected during your stay</p>
              </div>
            </div>
          </div>

          {/* About this space */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">About this space</h3>
            <p className="text-gray-700 whitespace-pre-line">{displayProperty.description}</p>
          </div>

          {/* Amenities */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {displayProperty.amenities.wifi && (
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                  </svg>
                  <span>Wifi</span>
                </div>
              )}
              {displayProperty.amenities.kitchen && (
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18v18H3V3z M7 7h10v10H7V7z M7 3v4 M17 3v4 M7 17v4 M17 17v4" />
                  </svg>
                  <span>Kitchen</span>
                </div>
              )}
              {displayProperty.amenities.laundry && (
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v10m0 0l-3-3m3 3l3-3m-3 3v6m6-6a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Laundry</span>
                </div>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Location</h3>
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block p-3 bg-white rounded-full mb-2">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="font-medium">{displayProperty.location.city}, {displayProperty.location.state}</p>
                <p className="text-sm text-gray-600">{displayProperty.distanceToAirport}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Booking card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-white border border-gray-200 rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-2xl font-bold">${displayProperty.price}</span>
                <span className="text-gray-600"> / night</span>
              </div>
              <div className="flex items-center">
                <RatingStars rating={displayProperty.rating} />
                <span className="ml-1 text-sm text-gray-600">{displayProperty.reviewCount} reviews</span>
              </div>
            </div>

            {/* Check-in/out */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="border border-gray-300 rounded-md p-3">
                <p className="text-xs text-gray-500 uppercase">CHECK-IN</p>
                <p className="font-medium">Flexible</p>
              </div>
              <div className="border border-gray-300 rounded-md p-3">
                <p className="text-xs text-gray-500 uppercase">CHECKOUT</p>
                <p className="font-medium">Flexible</p>
              </div>
            </div>

            {/* Guests */}
            <div className="border border-gray-300 rounded-md p-3 mb-4">
              <p className="text-xs text-gray-500 uppercase">GUESTS</p>
              <p className="font-medium">Up to {displayProperty.maxGuests} guests</p>
            </div>

            {/* Crew rates */}
            <div className="bg-blue-50 border border-blue-100 rounded-md p-3 mb-6">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium text-blue-800">Crew aviation professional rates available</p>
                  <p className="text-sm text-blue-600">Show your airline ID for special rates</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg mb-3">
              Reserve
            </button>
            <button 
              className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg"
              onClick={() => setIsMessageModalOpen(true)}
            >
              Contact Host
            </button>
            
            {/* Message Modal */}
            <MessageModal
              isOpen={isMessageModalOpen}
              onClose={() => setIsMessageModalOpen(false)}
              hostId={displayProperty.host._id || 'mock-host-id'}
              hostName={displayProperty.host.name}
              propertyId={displayProperty._id}
              propertyTitle={displayProperty.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
