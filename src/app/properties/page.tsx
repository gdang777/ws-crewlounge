"use client";
import { useState } from "react";
import Button from "../../components/Button";

const propertyListings = [
  {
    image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?auto=format&fit=crop&w=600&q=80",
    title: "Cozy Crashpad Near YYZ Airport",
    location: "Toronto, ON",
    price: "$65",
    type: "Private Room",
    host: "Maria S. (Air Canada)",
    rating: 4.9,
    reviews: 28,
    distance: "3.2 km to YYZ",
    beds: 1,
    baths: 1,
    wifi: true,
  },
  {
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
    title: "Modern Crashpad with Dedicated Workspace",
    location: "Vancouver, BC",
    price: "$75",
    type: "Private Room",
    host: "John M. (WestJet)",
    rating: 4.7,
    reviews: 42,
    distance: "5.1 km to YVR",
    beds: 1,
    baths: 1,
    wifi: true,
  },
  {
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
    title: "Entire Apartment for Flight Crew",
    location: "Calgary, AB",
    price: "$120",
    type: "Entire Apartment",
    host: "Sarah K. (Swoop)",
    rating: 4.8,
    reviews: 15,
    distance: "2.8 km to YYC",
    beds: 2,
    baths: 1,
    wifi: true,
  },
  {
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80",
    title: "Shared Crashpad with Airport Shuttle",
    location: "Montreal, QC",
    price: "$55",
    type: "Shared Room",
    host: "Alex T. (Air Transat)",
    rating: 4.6,
    reviews: 37,
    distance: "4.5 km to YUL",
    beds: 1,
    baths: 1.5,
    wifi: true,
  },
  {
    image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=600&q=80",
    title: "Quiet and Spacious Crew Stay",
    location: "Ottawa, ON",
    price: "$85",
    type: "Private Room",
    host: "James R. (Porter)",
    rating: 4.9,
    reviews: 19,
    distance: "3.7 km to YOW",
    beds: 1,
    baths: 1,
    wifi: true,
  },
  {
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
    title: "Cozy Studio near Airport",
    location: "Halifax, NS",
    price: "$70",
    type: "Studio",
    host: "Emma L. (Air Canada)",
    rating: 4.7,
    reviews: 24,
    distance: "6.2 km to YHZ",
    beds: 1,
    baths: 1,
    wifi: true,
  },
];

export default function PropertiesPage() {
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [activeTab, setActiveTab] = useState("crashpads");
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (idx: number) => {
    if (favorites.includes(idx)) {
      setFavorites(favorites.filter(i => i !== idx));
    } else {
      setFavorites([...favorites, idx]);
    }
  };

  const filteredListings = propertyListings.filter(listing => {
    const q = search.toLowerCase();
    const matchesSearch = (
      listing.title.toLowerCase().includes(q) ||
      listing.location.toLowerCase().includes(q) ||
      listing.type.toLowerCase().includes(q) ||
      listing.host.toLowerCase().includes(q)
    );
    
    // Filter by tab
    if (activeTab === "crashpads" && !listing.type.includes("Private") && !listing.type.includes("Shared") && !listing.type.includes("Studio")) {
      return false;
    }
    if (activeTab === "vacation" && (listing.type.includes("Private") || listing.type.includes("Shared") || listing.type.includes("Studio"))) {
      return false;
    }
    
    return matchesSearch;
  });

  return (
    <div className="flex flex-col gap-8 pb-20 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="w-full bg-blue-600 text-white py-10 px-4 rounded-b-3xl shadow-md flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center gap-3">
          <span role="img" aria-label="house">🏠</span> Explore Properties
        </h1>
        <p className="text-lg max-w-2xl text-center">
          Find crashpads and vacation rentals from fellow aviation professionals.
        </p>
      </section>
      
      {/* Search Bar */}
      <div className="w-full flex flex-col gap-3 px-4 mt-[-2rem]">
        <div className="sticky top-0 z-10 bg-white shadow-sm rounded py-3 px-4">
          <div className="flex flex-wrap items-center justify-between gap-3 max-w-7xl mx-auto">
            <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2 min-w-[280px]">
              <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <input
                type="text"
                placeholder="Search locations..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 outline-none bg-transparent text-gray-700"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-full transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 17a4 4 0 01-6 0"/><path d="M12 3v4m0 0a4 4 0 004 4h4m-8-4a4 4 0 00-4 4H4m8-4V3"/></svg>
                <span className="text-sm font-medium">Near Me</span>
              </button>
              <button className="flex items-center gap-1 text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-full transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"/></svg>
                <span className="text-sm font-medium">Add Property</span>
              </button>
              <button className="flex items-center gap-1 text-gray-700 border border-gray-300 hover:bg-gray-100 px-3 py-2 rounded-full transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
                <span className="text-sm font-medium">Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex gap-2 px-4 mt-4 mb-2">
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'crashpads' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTab('crashpads')}
          >
            Crashpads
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-sm font-medium ${activeTab === 'vacation' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setActiveTab('vacation')}
          >
            Vacation Rentals
          </button>
        </div>

        {/* Modals */}
        {showFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full flex flex-col gap-4">
              <h2 className="text-lg font-semibold mb-2">Filters (Demo)</h2>
              <p className="text-gray-500 text-sm">Filter options would go here.</p>
              <Button variant="secondary" onClick={() => setShowFilters(false)}>Close</Button>
            </div>
          </div>
        )}
        {showAddProperty && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full flex flex-col gap-4">
              <h2 className="text-lg font-semibold mb-2">Add Property (Demo)</h2>
              <p className="text-gray-500 text-sm">Property creation form would go here.</p>
              <Button variant="secondary" onClick={() => setShowAddProperty(false)}>Close</Button>
            </div>
          </div>
        )}
      </div>

      {/* Property Cards Grid */}
      <section className="px-4 py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing, idx) => (
            <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-sm border transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01] cursor-pointer">
              <div className="relative">
                <img src={listing.image} alt={listing.title} className="w-full h-48 object-cover" />
                <button 
                  onClick={() => toggleFavorite(idx)} 
                  className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                  aria-label={favorites.includes(idx) ? "Remove from favorites" : "Add to favorites"}
                >
                  <svg className="w-5 h-5" fill={favorites.includes(idx) ? "#ef4444" : "none"} stroke={favorites.includes(idx) ? "#ef4444" : "currentColor"} strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center text-sm mb-1">
                  <span className="text-gray-600">{listing.type}</span>
                  <div className="flex items-center ml-auto">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="font-medium">{listing.rating}</span>
                    <span className="text-gray-400 ml-1">({listing.reviews})</span>
                  </div>
                </div>
                
                <div className="flex items-center text-xs text-gray-600 mb-2">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{listing.host}</span>
                </div>
                
                <h3 className="font-semibold text-lg mb-1">{listing.title}</h3>
                
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{listing.location}</span>
                  <span className="mx-1">•</span>
                  <span>{listing.distance}</span>
                </div>
                
                <div className="flex items-center text-xs text-gray-500 mb-3">
                  <div className="flex items-center mr-3">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span>{listing.beds} {listing.beds === 1 ? 'bed' : 'beds'}</span>
                  </div>
                  <div className="flex items-center mr-3">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{listing.baths} {listing.baths === 1 ? 'bath' : 'baths'}</span>
                  </div>
                  {listing.wifi && (
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                      </svg>
                      <span>Wifi</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <span className="font-bold text-lg">{listing.price}</span>
                    <span className="text-gray-500 text-sm"> / night</span>
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
