"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useContext } from 'react';
import AuthContext from '../../../../context/AuthContext';

// Rating stars component
const RatingStars = ({ rating, showCount = true }: { rating: number, showCount?: boolean }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {hasHalfStar && (
        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-star-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path fill="url(#half-star-gradient)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {showCount && <span className="ml-2 text-gray-600 text-sm">({rating}/5)</span>}
    </div>
  );
};

// Mock data for city recommendations
const cityData = {
  delhi: {
    name: "Delhi",
    code: "DEL",
    country: "India",
    recommendations: [
      {
        id: 1,
        name: "Good Cafe",
        type: "Food & Restaurant",
        rating: 4.2,
        description: "The coffee is great",
        address: "123 Robson st",
        city: "Delhi",
        country: "India",
        website: "",
        image: "",
        crewDiscount: "15% off with crew ID",
        recommendedBy: {
          name: "Mary Johnson",
          email: "mary@flymail.com",
          role: "Crew Member"
        },
        comments: [
          {
            id: 1,
            user: {
              initials: "MT",
              name: "User MT",
              email: "user@example.com"
            },
            date: "Mar 21, 2025, 02:51 PM",
            text: "Awesome place"
          }
        ]
      },
      // Other recommendations...
    ]
  },
  chicago: {
    name: "Chicago",
    code: "ORD",
    country: "USA",
    recommendations: [
      {
        id: 1,
        name: "Deep Dish Pizza Place",
        type: "Food & Restaurant",
        rating: 4.8,
        description: "Best deep dish in the city",
        address: "456 Michigan Ave",
        city: "Chicago",
        country: "USA",
        website: "deepdishpizza.com",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
        crewDiscount: "20% off for airline crew",
        recommendedBy: {
          name: "John Smith",
          email: "pilot123@airline.com",
          role: "Pilot"
        },
        comments: []
      }
    ]
  }
};

export default function ListingDetailPage() {
  const params = useParams();
  const citySlug = typeof params.city === 'string' ? params.city.toLowerCase() : '';
  const listingId = typeof params.listing === 'string' ? parseInt(params.listing) : 0;
  
  const [listing, setListing] = useState<any>(null);
  const [city, setCity] = useState<any>(null);
  const [comment, setComment] = useState('');
  const { user, isAuthenticated } = useContext(AuthContext);
  
  useEffect(() => {
    // Get city data
    const cityInfo = (cityData as any)[citySlug];
    if (cityInfo) {
      setCity(cityInfo);
      
      // Find the specific listing
      const foundListing = cityInfo.recommendations.find((rec: any) => rec.id === listingId);
      if (foundListing) {
        setListing(foundListing);
      }
    }
  }, [citySlug, listingId]);
  
  // Function to handle adding a new comment
  const handleAddComment = () => {
    if (!comment.trim() || !isAuthenticated) return;
    
    const newComment = {
      id: Date.now(),
      user: {
        initials: user?.name?.split(' ').map((n: string) => n[0]).join('') || 'U',
        name: user?.name || 'Anonymous',
        email: user?.email || 'user@example.com'
      },
      date: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      text: comment.trim()
    };
    
    // Add the comment to the listing
    setListing({
      ...listing,
      comments: [...(listing.comments || []), newComment]
    });
    
    // Clear the comment input
    setComment('');
  };
  
  if (!listing || !city) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700">Listing not found</h1>
          <p className="mt-2 text-gray-500">We couldn't find this recommendation.</p>
          <Link href={`/layovers/${citySlug}`} className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Back to {citySlug.charAt(0).toUpperCase() + citySlug.slice(1)}
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href={`/layovers/${citySlug}`} className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 mb-6">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to {city.name}
        </Link>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-64 bg-gray-200">
            {listing.image ? (
              <img 
                src={listing.image} 
                alt={listing.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
            
            {/* Share Button */}
            <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
          
          {/* Listing Header */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{listing.name}</h1>
                <div className="flex items-center mb-2">
                  <svg className="w-5 h-5 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-600">{listing.address}</span>
                </div>
                <div className="flex items-center space-x-4 mb-4">
                  <RatingStars rating={listing.rating} />
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {listing.type}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Crew Discount */}
            {listing.crewDiscount && (
              <div className="bg-green-50 border border-green-100 rounded-md p-4 mb-6 flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <div>
                  <h3 className="font-medium text-green-800 mb-1">Crew Discount Available</h3>
                  <p className="text-green-700">{listing.crewDiscount}</p>
                </div>
              </div>
            )}
            
            {/* About Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">About this place</h2>
              <p className="text-gray-600">{listing.description}</p>
            </div>
            
            {/* Location Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Location</h2>
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-gray-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-gray-600">{listing.address}</p>
                    <p className="text-gray-600">{listing.city}, {listing.country}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recommended By Section */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Recommended By</h2>
              <div className="bg-blue-50 p-4 rounded-md">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-medium">
                      {listing.recommendedBy.name.split(' ').map((n: string) => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{listing.recommendedBy.email}</p>
                    <p className="text-sm text-gray-600">{listing.recommendedBy.role || 'Crew Member'}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Comments Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Comments
              </h2>
              
              {/* Comment Form */}
              <div className="mb-6 flex">
                <div className="mr-3 flex-shrink-0">
                  <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center">
                    <span className="text-blue-600 font-medium text-sm">
                      {isAuthenticated 
                        ? (user?.name?.split(' ').map((n: string) => n[0]).join('') || 'U')
                        : 'G'}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <textarea
                    placeholder={isAuthenticated ? "Add a comment..." : "Log in to add a comment"}
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    rows={2}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    disabled={!isAuthenticated}
                  />
                  <div className="flex justify-end">
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                      onClick={handleAddComment}
                      disabled={!isAuthenticated || !comment.trim()}
                    >
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Comments List */}
              {listing.comments && listing.comments.length > 0 ? (
                <div className="space-y-4">
                  {listing.comments.map((comment: any) => (
                    <div key={comment.id} className="flex">
                      <div className="mr-3 flex-shrink-0">
                        <div className="bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center">
                          <span className="text-gray-600 font-medium text-sm">{comment.user.initials}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <span className="font-medium mr-2">{comment.user.name}</span>
                          <span className="text-xs text-gray-500">{comment.date}</span>
                        </div>
                        <p className="text-gray-700">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No comments yet. Be the first to share your thoughts!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
