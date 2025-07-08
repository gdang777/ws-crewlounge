"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Card from "../../components/Card";
import Button from "../../components/Button";
import layoverService from "../../services/layoverService";

interface Layover {
  city: string;
  country: string;
  airport: string;
  description: string;
  image: string;
  transportation: string;
  recommendations?: Array<any>;
  travelTips?: Array<any>;
}

interface City {
  image: string;
  city: string;
  country: string;
  code: string;
  recommendations: number;
  description: string;
  transportation: string;
}

export default function LayoversPage() {
  const [search, setSearch] = useState("");
  const [showNearMe, setShowNearMe] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddCity, setShowAddCity] = useState(false);
  const [newCity, setNewCity] = useState<Omit<City, 'recommendations'>>({
    city: "",
    country: "",
    code: "",
    image: "",
    description: "",
    transportation: "",
  });
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLayovers();
  }, []);

  const fetchLayovers = async () => {
    try {
      setLoading(true);
      const response = await layoverService.getLayovers();
      if (response.success) {
        const formattedCities = response.data.map((layover: Layover) => ({
          image: layover.image,
          city: layover.city,
          country: layover.country,
          code: layover.airport,
          recommendations: layover.recommendations?.length || 0,
          description: layover.description,
          transportation: layover.transportation
        }));
        setCities(formattedCities);
      }
    } catch (err) {
      console.error('Error fetching layovers:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle adding a new city
  const handleAddCity = async () => {
    try {
      const response = await layoverService.createLayover(newCity);
      if (response.success) {
        // Refresh the layovers list
        await fetchLayovers();
        
        // Reset the form
        setNewCity({
          city: "",
          country: "",
          code: "",
          image: "",
          description: "",
          transportation: ""
        });
        
        // Close the modal
        setShowAddCity(false);
      }
    } catch (err) {
      console.error('Error creating layover:', err);
      // You might want to show an error message to the user here
    }
  };

  const filteredCities = cities.filter(city => {
    const q = search.toLowerCase();
    return (
      city.city.toLowerCase().includes(q) ||
      city.country.toLowerCase().includes(q) ||
      city.code.toLowerCase().includes(q)
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div 
          data-testid="loading-spinner"
          className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">Error loading layovers: {error}</div>
    );
  }

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
              onClick={fetchLayovers}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 19v-6m0 0V5m0 8l-3-3m3 3l3-3"/></svg>
              Refresh
            </button>
            <button
              data-testid="add-city-button"
              className="px-4 py-2 rounded font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 text-xs px-3 py-1"
              onClick={() => setShowAddCity(true)}
            >
              + Add City
            </button>
          </div>
        </div>
      </div>

      {/* City Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {filteredCities.map((city, index) => (
          <Link href={`/layovers/${city.city.toLowerCase()}`} key={index}>
            <Card className="h-full cursor-pointer transform transition hover:scale-105">
              <div className="relative h-48 rounded-t overflow-hidden">
                <img
                  src={city.image || "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=600&q=80"}
                  alt={city.city}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold">{city.city}</h3>
                    <p className="text-sm text-gray-600">{city.country}</p>
                  </div>
                  <span className="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {city.code}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  {city.recommendations} {city.recommendations === 1 ? 'recommendation' : 'recommendations'}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Add City Modal */}
      {showAddCity && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-6">Add New Layover City</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City Name</label>
                <input
                  type="text"
                  value={newCity.city}
                  onChange={e => setNewCity({...newCity, city: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g., London"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  value={newCity.country}
                  onChange={e => setNewCity({...newCity, country: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g., United Kingdom"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Airport Code</label>
                <input
                  type="text"
                  value={newCity.code}
                  onChange={e => setNewCity({...newCity, code: e.target.value.toUpperCase()})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g., LHR"
                  maxLength={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newCity.description}
                  onChange={e => setNewCity({...newCity, description: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Brief description of the layover location..."
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transportation Info</label>
                <textarea
                  value={newCity.transportation}
                  onChange={e => setNewCity({...newCity, transportation: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="How to get around..."
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  value={newCity.image}
                  onChange={e => setNewCity({...newCity, image: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="https://..."
                />
              </div>
              <div className="flex gap-3 mt-4">
                <Button variant="primary" onClick={handleAddCity}>Add City</Button>
                <Button variant="secondary" onClick={() => setShowAddCity(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


