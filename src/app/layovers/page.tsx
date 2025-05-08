"use client";
import { useState } from "react";
import Link from "next/link";
import Card from "../../components/Card";
import Button from "../../components/Button";

const layoverCities = [
  {
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=600&q=80", // Chicago
    city: "Chicago",
    country: "USA",
    code: "ORD",
    recommendations: 14,
  },
  {
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80",
    city: "Delhi",
    country: "India",
    code: "DEL",
    recommendations: 11,
  },
  {
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80",
    city: "London",
    country: "UK",
    code: "LHR",
    recommendations: 18,
  },
  {
    image: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?auto=format&fit=crop&w=600&q=80",
    city: "Miami",
    country: "USA",
    code: "MIA",
    recommendations: 9,
  },
  {
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=600&q=80",
    city: "New York",
    country: "USA",
    code: "JFK",
    recommendations: 22,
  },
  {
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
    city: "Paris",
    country: "France",
    code: "CDG",
    recommendations: 17,
  },
  {
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=600&q=80",
    city: "San Francisco",
    country: "USA",
    code: "SFO",
    recommendations: 16,
  },
  {
    image: "https://images.unsplash.com/photo-1438401171849-74ac270044ee?auto=format&fit=crop&w=600&q=80",
    city: "Seattle",
    country: "USA",
    code: "SEA",
    recommendations: 13,
  },
  {
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80",
    city: "Sydney",
    country: "Australia",
    code: "SYD",
    recommendations: 8,
  },
  {
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80",
    city: "Tokyo",
    country: "Japan",
    code: "NRT",
    recommendations: 15,
  },
];

export default function LayoversPage() {
  const [search, setSearch] = useState("");
  const [showNearMe, setShowNearMe] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddCity, setShowAddCity] = useState(false);
  const [newCity, setNewCity] = useState({
    city: "",
    country: "",
    code: "",
    image: "",
    recommendations: 0
  });
  const [cities, setCities] = useState(layoverCities);

  // Function to handle adding a new city
  const handleAddCity = () => {
    // Create a new city object
    const cityToAdd = {
      ...newCity,
      // Ensure we have a valid image URL
      image: newCity.image || "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=600&q=80"
    };
    
    // Add the new city to the cities array
    setCities([...cities, cityToAdd]);
    
    // Reset the form
    setNewCity({
      city: "",
      country: "",
      code: "",
      image: "",
      recommendations: 0
    });
    
    // Close the modal
    setShowAddCity(false);
  };

  const filteredCities = cities.filter(city => {
    const q = search.toLowerCase();
    return (
      city.city.toLowerCase().includes(q) ||
      city.country.toLowerCase().includes(q) ||
      city.code.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col gap-8 pb-20 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="w-full bg-blue-600 text-white py-10 px-4 rounded-b-3xl shadow-md flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center gap-3">
          <span role="img" aria-label="plane">✈️</span> Explore Layover Cities
        </h1>
        <p className="text-lg max-w-2xl text-center">
          Discover crew recommendations for the best spots during your layovers.
        </p>
      </section>

      {/* Search and Actions */}
      <div className="w-full flex flex-col gap-3 px-4 mt-[-2rem]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex-1 flex items-center bg-white rounded shadow px-3 py-2">
            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              type="text"
              placeholder="Search cities, airport codes, or countries"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="flex-1 outline-none bg-transparent text-gray-700"
            />
          </div>
          <div className="flex gap-2 items-center justify-end">
            <button
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 px-2 py-1 rounded transition"
              onClick={() => setSearch("")}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 19v-6m0 0V5m0 8l-3-3m3 3l3-3"/></svg>
              Refresh
            </button>
            <button
              className="flex items-center gap-1 text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded"
              onClick={() => { setShowNearMe(true); setTimeout(() => setShowNearMe(false), 2000); }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 17a4 4 0 01-6 0"/><path d="M12 3v4m0 0a4 4 0 004 4h4m-8-4a4 4 0 00-4 4H4m8-4V3"/></svg>
              Near Me
            </button>
            <Button variant="primary" className="text-xs px-3 py-1" onClick={() => setShowAddCity(true)}>+ Add City</Button>
            <button
              className="flex items-center gap-1 text-xs text-gray-600 border border-gray-300 px-2 py-1 rounded hover:bg-gray-100"
              onClick={() => setShowFilters(true)}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 16V8"/></svg>
              Filters
            </button>
          </div>
        </div>
        {/* Warning Banner */}
        <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 rounded px-4 py-2 text-xs flex items-center gap-2">
          <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01"/><path d="M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0z"/></svg>
          Location access was denied. Please enable location in your browser settings, then reload the page and try again.
        </div>
        {showNearMe && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded shadow z-50 animate-fade-in">
            Location permission demo: Access denied or unavailable.
          </div>
        )}
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
      {showAddCity && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Layover City</h2>
              <button 
                onClick={() => setShowAddCity(false)} 
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              handleAddCity();
            }}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. New York" 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCity.city}
                  onChange={(e) => setNewCity({...newCity, city: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input 
                  type="text" 
                  placeholder="e.g. USA" 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCity.country}
                  onChange={(e) => setNewCity({...newCity, country: e.target.value})}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Airport Code</label>
                <input 
                  type="text" 
                  placeholder="e.g. JFK" 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCity.code}
                  onChange={(e) => setNewCity({...newCity, code: e.target.value.toUpperCase()})}
                  maxLength={3}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City Image</label>
                <p className="text-xs text-gray-500 mb-1">Upload an image or provide an image URL</p>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                  <svg className="w-8 h-8 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="text-blue-600 font-medium text-sm">Click to upload</span>
                  <span className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (alternative to upload)</label>
                <input 
                  type="url" 
                  placeholder="https://example.com/image.jpg" 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCity.image}
                  onChange={(e) => setNewCity({...newCity, image: e.target.value})}
                />
              </div>
              
              <div className="flex justify-end pt-2">
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                  disabled={!newCity.city || !newCity.country || !newCity.code || !newCity.image}
                >
                  Add City
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* City Cards Grid */}
      <section className="px-4 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCities.map((city, idx) => (
            <Link 
              key={idx} 
              href={`/layovers/${city.city.toLowerCase()}`}
              className="bg-white rounded-lg overflow-hidden shadow-md relative transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01] cursor-pointer"
            >
              <div className="absolute top-2 right-2 bg-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                {city.code}
              </div>
              <img src={city.image} alt={city.city} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{city.city}</h3>
                <p className="text-gray-600 text-sm">{city.country}</p>
                <p className="text-xs text-gray-500 mt-2 mb-3 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                  <span>{city.recommendations} crew recommendations</span>
                </p>
                <div className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors text-center">
                  View Recommendations
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}


