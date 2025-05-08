"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useContext } from 'react';
import AuthContext from '../../../context/AuthContext';

// Mock data for travel tips
const travelTipsData = {
  delhi: [
    {
      id: 1,
      tip: "Too many crew forms to fill",
      addedBy: "john@airline.com",
      addedOn: "Mar 21, 2025",
      mood: "sad"
    },
    {
      id: 2,
      tip: "Carry local currency for street food vendors",
      addedBy: "sarah@airline.com",
      addedOn: "Apr 15, 2025",
      mood: "neutral"
    },
    {
      id: 3,
      tip: "Uber works well for getting around the city",
      addedBy: "test@example.com",
      addedOn: "May 1, 2025",
      mood: "happy"
    }
  ],
  chicago: [
    {
      id: 1,
      tip: "Weather changes quickly - always bring a jacket",
      addedBy: "mike@airline.com",
      addedOn: "Feb 10, 2025",
      mood: "neutral"
    }
  ],
  london: [
    {
      id: 1,
      tip: "Oyster card is the best way to use public transport",
      addedBy: "emma@airline.com",
      addedOn: "Apr 28, 2025",
      mood: "happy"
    }
  ]
};

// Mock data for city recommendations
const cityData = {
  delhi: {
    name: "Delhi",
    code: "DEL",
    country: "India",
    heroImage: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1600&q=80",
    recommendations: [
      {
        id: 1,
        name: "Good Cafe",
        type: "Food & Restaurant",
        rating: 4.2,
        description: "The coffee is great",
        address: "123 Robson st",
        website: "",
        image: "",
        crewDiscount: "15% off with crew ID",
        recommendedBy: "mary@flymail.com"
      },
      {
        id: 2,
        name: "Hidden Gem",
        type: "Attraction",
        rating: 4.5,
        description: "Off the beaten path but absolutely worth the visit. A truly unique experience.",
        address: "579 Secret Path",
        website: "hidden-gem.com",
        image: "",
        recommendedBy: "Emma Davis"
      },
      {
        id: 3,
        name: "Shopping District",
        type: "Food & Restaurant",
        rating: 5.0,
        description: "Great for picking up souvenirs or just browsing. Many local artisans sell their crafts here.",
        address: "987 Market Street",
        website: "shopping-district.com",
        image: "https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&w=600&q=80",
        recommendedBy: "John Doe"
      },
      {
        id: 4,
        name: "Historic Museum",
        type: "Attraction",
        rating: 4.8,
        description: "Learn about the local history and culture. Only takes about 2 hours to see everything.",
        address: "31 Museum Lane",
        website: "city-museum.org",
        image: "",
        recommendedBy: "Michael Brown"
      }
    ]
  },
  chicago: {
    name: "Chicago",
    code: "ORD",
    country: "USA",
    heroImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1600&q=80",
    recommendations: [
      {
        id: 1,
        name: "Deep Dish Pizza Place",
        type: "Food & Restaurant",
        rating: 4.8,
        description: "Best deep dish in the city",
        address: "456 Michigan Ave",
        website: "deepdishpizza.com",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80",
        crewDiscount: "20% off for airline crew",
        recommendedBy: "pilot123@airline.com"
      },
      {
        id: 2,
        name: "Millennium Park",
        type: "Attraction",
        rating: 4.7,
        description: "Beautiful park with the famous Cloud Gate sculpture",
        address: "201 E Randolph St",
        website: "millenniumpark.org",
        image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&w=600&q=80",
        recommendedBy: "Sarah Johnson"
      }
    ]
  },
  london: {
    name: "London",
    code: "LHR",
    country: "UK",
    heroImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80",
    recommendations: [
      {
        id: 1,
        name: "British Museum",
        type: "Attraction",
        rating: 4.9,
        description: "World-class museum with incredible artifacts",
        address: "Great Russell St",
        website: "britishmuseum.org",
        image: "https://images.unsplash.com/photo-1574144113084-b6f450cc5e0c?auto=format&fit=crop&w=600&q=80",
        recommendedBy: "flight_attendant22@email.com"
      }
    ]
  }
};

// Component for rating stars
const RatingStars = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {hasHalfStar && (
        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
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
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

export default function CityPage() {
  const params = useParams();
  const citySlug = typeof params.city === 'string' ? params.city.toLowerCase() : '';
  const [activeTab, setActiveTab] = useState('all');
  const [city, setCity] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [travelTips, setTravelTips] = useState<any[]>([]);
  const [newTip, setNewTip] = useState('');
  const [showAddTipForm, setShowAddTipForm] = useState(false);
  const [selectedMood, setSelectedMood] = useState<'happy' | 'neutral' | 'sad' | null>(null);
  const [showAddRecommendationForm, setShowAddRecommendationForm] = useState(false);
  const [newRecommendation, setNewRecommendation] = useState({
    title: '',
    description: '',
    address: '',
    category: 'Food & Restaurants',
    website: '',
    imageUrl: '',
    crewDiscount: '',
  });
  const { user, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    // Get city data based on the URL parameter
    const cityInfo = (cityData as any)[citySlug];
    if (cityInfo) {
      setCity(cityInfo);
      // Get recommendations for this city
      setRecommendations(cityInfo.recommendations || []);
    }
    
    // Get travel tips for this city
    const cityTips = (travelTipsData as any)[citySlug] || [];
    setTravelTips(cityTips);
  }, [citySlug]);
  
  // Function to handle adding a new recommendation
  const handleAddRecommendation = () => {
    if (!newRecommendation.title || !newRecommendation.description || !newRecommendation.category) return;
    
    const newRecommendationObj = {
      id: Date.now(),
      name: newRecommendation.title,
      type: newRecommendation.category,
      rating: 5.0, // Default rating
      description: newRecommendation.description,
      address: newRecommendation.address,
      website: newRecommendation.website,
      image: newRecommendation.imageUrl || '',
      crewDiscount: newRecommendation.crewDiscount || 'None',
      recommendedBy: user?.email || 'anonymous@user.com'
    };
    
    // Add the new recommendation to the recommendations array
    setRecommendations([...recommendations, newRecommendationObj]);
    
    // Reset the form
    setNewRecommendation({
      title: '',
      description: '',
      address: '',
      category: 'Food & Restaurants',
      website: '',
      imageUrl: '',
      crewDiscount: ''
    });
    
    // Close the modal
    setShowAddRecommendationForm(false);
  };
  
  // Function to handle adding a new travel tip
  const handleAddTip = () => {
    if (!newTip.trim() || !selectedMood) return;
    
    const newTipObj = {
      id: Date.now(),
      tip: newTip.trim(),
      addedBy: user?.email || 'anonymous@user.com',
      addedOn: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      mood: selectedMood
    };
    
    setTravelTips([...travelTips, newTipObj]);
    setNewTip('');
    setSelectedMood(null);
    setShowAddTipForm(false);
  };
  
  // Function to handle deleting a travel tip
  const handleDeleteTip = (tipId: number) => {
    setTravelTips(travelTips.filter(tip => tip.id !== tipId));
  };

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700">City not found</h1>
          <p className="mt-2 text-gray-500">We couldn't find information for this city.</p>
          <Link href="/layovers" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Back to All Cities
          </Link>
        </div>
      </div>
    );
  }

  // Filter recommendations based on active tab
  const filteredRecommendations = recommendations.filter((rec: any) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'food' && rec.type.toLowerCase().includes('food')) return true;
    if (activeTab === 'cafes' && rec.type.toLowerCase().includes('cafe')) return true;
    if (activeTab === 'attractions' && rec.type.toLowerCase().includes('attraction')) return true;
    if (activeTab === 'stay' && rec.type.toLowerCase().includes('stay')) return true;
    return false;
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 z-10"></div>
        <img 
          src={city.heroImage} 
          alt={city.name} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 z-20 text-white">
          <div className="flex gap-2 mb-2">
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
              {city.code}
            </span>
            <span className="bg-gray-700 bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
              {city.country}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white">{city.name}</h1>
        </div>
      </div>

      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <Link href="/layovers" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Cities
        </Link>

        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <Link href="/layovers" className="hover:text-blue-600">Layovers</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{city.name}</span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-gray-700">{city.code}</span>
        </div>

        {/* Recommendations Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Crew Recommendations <span className="text-blue-600">@{city.code}</span></h2>
            <button 
              onClick={() => isAuthenticated ? setShowAddRecommendationForm(true) : alert('Please log in to add a recommendation')}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Listing
            </button>
          </div>
          <p className="text-gray-600 text-sm mt-1">
            Discover the best spots during your layover in {city.name}.
          </p>

          {/* Filter Tabs */}
          <div className="flex overflow-x-auto space-x-2 mt-6 pb-2">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                activeTab === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setActiveTab('food')}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                activeTab === 'food' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Food
            </button>
            <button 
              onClick={() => setActiveTab('cafes')}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                activeTab === 'cafes' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Cafés
            </button>
            <button 
              onClick={() => setActiveTab('attractions')}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                activeTab === 'attractions' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Attractions
            </button>
            <button 
              onClick={() => setActiveTab('stay')}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap ${
                activeTab === 'stay' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Stay
            </button>
          </div>

          {/* Recommendation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filteredRecommendations.map((recommendation: any) => (
              <Link 
                key={recommendation.id} 
                href={`/layovers/${citySlug}/${recommendation.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                {recommendation.image ? (
                  <img 
                    src={recommendation.image} 
                    alt={recommendation.name} 
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">No image available</span>
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-md mr-2">
                      {recommendation.type}
                    </span>
                    <div className="flex items-center">
                      <RatingStars rating={recommendation.rating} />
                    </div>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{recommendation.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{recommendation.description}</p>
                  
                  {recommendation.address && (
                    <div className="flex items-start mb-2">
                      <svg className="w-4 h-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm text-gray-600">{recommendation.address}</span>
                    </div>
                  )}
                  
                  {recommendation.website && (
                    <div className="flex items-center mb-2">
                      <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      <span className="text-sm text-blue-600">{recommendation.website}</span>
                    </div>
                  )}
                  
                  {recommendation.crewDiscount && recommendation.crewDiscount !== 'None' && (
                    <div className="flex items-center mb-3 bg-green-50 p-2 rounded-md border border-green-100">
                      <svg className="w-4 h-4 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <span className="text-sm font-medium text-green-800">Crew Discount: {recommendation.crewDiscount}</span>
                    </div>
                  )}
                  
                  <div className="border-t pt-3 mt-2">
                    <p className="text-xs text-gray-500">
                      Recommended by <span className="font-medium">{recommendation.recommendedBy}</span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredRecommendations.length === 0 && (
            <div className="bg-gray-50 rounded-lg p-8 text-center mt-6">
              <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No recommendations found</h3>
              <p className="text-gray-500 mb-4">
                There are no recommendations in this category yet.
              </p>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                Add the first recommendation
              </button>
            </div>
          )}
        </div>
        
        {/* Travel Tips Section */}
        <div className="mt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800">Travel Tips</h2>
            {isAuthenticated && (
              <button 
                onClick={() => setShowAddTipForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Tip
              </button>
            )}
          </div>
          <p className="text-gray-600 text-sm mt-1 mb-4">
            Helpful tips from crew members who have visited {city.name}.
          </p>
          
          {/* Add Recommendation Modal */}
          {showAddRecommendationForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Add New Recommendation</h2>
                    <button 
                      onClick={() => setShowAddRecommendationForm(false)} 
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    handleAddRecommendation();
                  }}>
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Amazing Coffee Shop" 
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newRecommendation.title}
                        onChange={(e) => setNewRecommendation({...newRecommendation, title: e.target.value})}
                        required
                      />
                    </div>
                    
                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea 
                        placeholder="Share details about this place..." 
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        value={newRecommendation.description}
                        onChange={(e) => setNewRecommendation({...newRecommendation, description: e.target.value})}
                        required
                      />
                    </div>
                    
                    {/* Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 123 Main St, New York, NY" 
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newRecommendation.address}
                        onChange={(e) => setNewRecommendation({...newRecommendation, address: e.target.value})}
                      />
                    </div>
                    
                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <div className="grid grid-cols-2 gap-3">
                        <label className={`flex items-center p-3 border rounded-md cursor-pointer ${newRecommendation.category === 'Food & Restaurants' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
                          <input 
                            type="radio" 
                            name="category" 
                            className="sr-only" 
                            checked={newRecommendation.category === 'Food & Restaurants'}
                            onChange={() => setNewRecommendation({...newRecommendation, category: 'Food & Restaurants'})}
                          />
                          <span className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Food & Restaurants
                          </span>
                        </label>
                        
                        <label className={`flex items-center p-3 border rounded-md cursor-pointer ${newRecommendation.category === 'Cafés & Drinks' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
                          <input 
                            type="radio" 
                            name="category" 
                            className="sr-only" 
                            checked={newRecommendation.category === 'Cafés & Drinks'}
                            onChange={() => setNewRecommendation({...newRecommendation, category: 'Cafés & Drinks'})}
                          />
                          <span className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Cafés & Drinks
                          </span>
                        </label>
                        
                        <label className={`flex items-center p-3 border rounded-md cursor-pointer ${newRecommendation.category === 'Attractions & Sights' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
                          <input 
                            type="radio" 
                            name="category" 
                            className="sr-only" 
                            checked={newRecommendation.category === 'Attractions & Sights'}
                            onChange={() => setNewRecommendation({...newRecommendation, category: 'Attractions & Sights'})}
                          />
                          <span className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Attractions & Sights
                          </span>
                        </label>
                        
                        <label className={`flex items-center p-3 border rounded-md cursor-pointer ${newRecommendation.category === 'Stay & Accommodation' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
                          <input 
                            type="radio" 
                            name="category" 
                            className="sr-only" 
                            checked={newRecommendation.category === 'Stay & Accommodation'}
                            onChange={() => setNewRecommendation({...newRecommendation, category: 'Stay & Accommodation'})}
                          />
                          <span className="flex items-center">
                            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Stay & Accommodation
                          </span>
                        </label>
                      </div>
                    </div>
                    
                    {/* Website */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                      <input 
                        type="url" 
                        placeholder="https://example.com" 
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newRecommendation.website}
                        onChange={(e) => setNewRecommendation({...newRecommendation, website: e.target.value})}
                      />
                    </div>
                    
                    {/* Crew Discount */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Crew Discount</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 10% off with crew ID" 
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newRecommendation.crewDiscount}
                        onChange={(e) => setNewRecommendation({...newRecommendation, crewDiscount: e.target.value})}
                      />
                    </div>
                    
                    {/* Image URL */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                      <input 
                        type="url" 
                        placeholder="https://example.com/image.jpg" 
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newRecommendation.imageUrl}
                        onChange={(e) => setNewRecommendation({...newRecommendation, imageUrl: e.target.value})}
                      />
                    </div>
                    
                    {/* Upload Images */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Upload Images</label>
                      <div className="border border-gray-300 rounded-md p-2">
                        <label className="flex items-center justify-center p-2 border border-dashed border-gray-300 rounded cursor-pointer hover:bg-gray-50">
                          <span className="text-sm text-gray-500">Choose Files</span>
                          <span className="ml-2 text-xs text-gray-400">No file chosen</span>
                          <input type="file" className="hidden" />
                        </label>
                      </div>
                    </div>
                    
                    {/* Submit Button */}
                    <div className="flex justify-end pt-2">
                      <button 
                        type="submit" 
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                        disabled={!newRecommendation.title || !newRecommendation.description}
                      >
                        Add Recommendation
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
          
          {/* Add Tip Modal */}
          {showAddTipForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">Add a Travel Tip</h2>
                  <p className="text-gray-600 text-sm mb-4">
                    Share your insights about this destination to help other crew members.
                  </p>
                  
                  <div className="mb-4">
                    <textarea
                      value={newTip}
                      onChange={(e) => setNewTip(e.target.value)}
                      placeholder="Share your tip here..."
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select a mood for this tip:
                    </label>
                    <div className="flex space-x-3">
                      <button 
                        type="button"
                        onClick={() => setSelectedMood('happy')}
                        className={`flex items-center justify-center px-4 py-2 rounded-md border ${selectedMood === 'happy' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                      >
                        <svg className="w-5 h-5 mr-2 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-3.5 6a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" clipRule="evenodd" />
                        </svg>
                        Happy
                      </button>
                      <button 
                        type="button"
                        onClick={() => setSelectedMood('neutral')}
                        className={`flex items-center justify-center px-4 py-2 rounded-md border ${selectedMood === 'neutral' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                      >
                        <svg className="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        Neutral
                      </button>
                      <button 
                        type="button"
                        onClick={() => setSelectedMood('sad')}
                        className={`flex items-center justify-center px-4 py-2 rounded-md border ${selectedMood === 'sad' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                      >
                        <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2zm-3 8a5 5 0 100-10 5 5 0 000 10z" clipRule="evenodd" />
                        </svg>
                        Sad
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => setShowAddTipForm(false)}
                      className="px-4 py-2 text-gray-700 hover:text-gray-900"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleAddTip}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      disabled={!newTip.trim() || !selectedMood}
                    >
                      Add Tip
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Tips List */}
          <div className="space-y-4">
            {travelTips.length > 0 ? (
              travelTips.map((tip) => (
                <div key={tip.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 relative">
                  {isAuthenticated && user?.email === tip.addedBy && (
                    <button 
                      onClick={() => handleDeleteTip(tip.id)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                      aria-label="Delete tip"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3">
                      {tip.mood === 'happy' && (
                        <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-3.5 6a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" clipRule="evenodd" />
                        </svg>
                      )}
                      {tip.mood === 'neutral' && (
                        <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                      )}
                      {tip.mood === 'sad' && (
                        <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm6 0a1 1 0 100-2 1 1 0 000 2zm-3 8a5 5 0 100-10 5 5 0 000 10z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800">{tip.tip}</p>
                      <div className="mt-2 text-xs text-gray-500 flex items-center justify-between">
                        <span>Added on {tip.addedOn}</span>
                        <span className="text-gray-400">by {tip.addedBy}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-gray-50 rounded-lg p-6 text-center">
                <p className="text-gray-500">No travel tips yet. Be the first to add one!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
