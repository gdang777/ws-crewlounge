import FeaturedListingCard from "../components/FeaturedListingCard";
import Card from "../components/Card";
import Button from "../components/Button";
import TestimonialsSection from "../components/TestimonialsSection";
import FeaturesSection from "../components/FeaturesSection";
import CommunityCTASection from "../components/CommunityCTASection";
import Link from "next/link";


const featuredListings = [
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    title: "Cozy Crashpad Near Airport",
    location: "Toronto, ON",
    price: "$65",
    type: "Private Room",
  },
  {
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80",
    title: "Modern Crashpad with Amenities",
    location: "Vancouver, BC",
    price: "$75",
    type: "Private Room",
  },
  {
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    title: "Entire Apartment for Crew",
    location: "Calgary, AB",
    price: "$120",
    type: "Entire Apartment",
  },
  {
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
    title: "Lakeside Cottage with View",
    location: "Whistler, BC",
    price: "$250",
    type: "Entire Cottage",
  },
  {
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3d41?auto=format&fit=crop&w=400&q=80",
    title: "Beachfront Condo in City",
    location: "Vancouver, BC",
    price: "$195",
    type: "Condo",
  },
  {
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80",
    title: "Mountain Cabin with Views",
    location: "Banff, AB",
    price: "$220",
    type: "Cabin",
  },
];

const featuredLayovers = [
  {
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=600&q=80",
    city: "New York",
    country: "USA",
    code: "JFK",
  },
  {
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80",
    city: "London",
    country: "UK",
    code: "LHR",
  },
  {
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80",
    city: "Paris",
    country: "France",
    code: "CDG",
  },
  {
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80",
    city: "Tokyo",
    country: "Japan",
    code: "NRT",
  },
  {
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80",
    city: "Sydney",
    country: "Australia",
    code: "SYD",
  },
  {
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=600&q=80",
    city: "Delhi",
    country: "India",
    code: "DEL",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section with Image */}
      <section className="relative flex flex-col items-center text-center gap-6 py-28 sm:py-40 bg-blue-50 overflow-hidden min-h-[420px]">
        <img
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80"
          alt="Aviation Hero"
          className="absolute inset-0 w-full h-full object-cover opacity-35 pointer-events-none select-none"
          style={{ zIndex: 1 }}
        />
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-navy mb-2 drop-shadow-md">The Aviation Professional Platform</h1>
          <p className="text-lg text-gray-700 max-w-2xl mb-4 drop-shadow">Find crashpads, vacation rentals, layover recommendations, and gig opportunities tailored for aviation professionals across North America.</p>
          <Link href="/auth/register">
            <button 
              className="mt-6 text-lg px-8 py-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded" 
            >
              Join the Community
            </button>
          </Link>
        </div>
      </section>

      <main className="flex flex-col gap-16 px-4 max-w-7xl mx-auto">
        {/* Featured Layovers Section (above Listings) */}
        <section className="py-8">
          <h2 className="text-2xl font-semibold text-center mb-1">Featured Layovers</h2>
          <p className="text-gray-600 text-center mb-8">Discover crew-recommended spots in popular layover destinations</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredLayovers.map((layover, idx) => (
              <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-md relative transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01] cursor-pointer">
                <div className="absolute top-2 right-2 bg-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                  {layover.code}
                </div>
                <img src={layover.image} alt={layover.city} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{layover.city}</h3>
                  <p className="text-gray-600 text-sm">{layover.country}</p>
                  <p className="text-xs text-gray-500 mt-2 mb-3 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    Explore crew recommendations
                  </p>
                  <Link href={`/layovers/${layover.city.toLowerCase()}`} passHref>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors">
                      View Recommendations
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-6">
            <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              See All
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </a>
          </div>
        </section>

        {/* Featured Listings Section */}
        <section className="py-8 bg-gray-50">
          <h2 className="text-2xl font-semibold text-center mb-1">Featured Listings</h2>
          <p className="text-gray-600 text-center mb-8">Discover top-rated crashpads and vacation properties from our community</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredListings.map((listing, idx) => (
              <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01] cursor-pointer">
                <div className="relative">
                  <img src={listing.image} alt={listing.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-2 left-2 bg-white text-xs font-medium px-2 py-1 rounded-md shadow-sm">
                    {listing.type}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{listing.title}</h3>
                  <p className="text-gray-600 text-sm">{listing.location}</p>
                  <p className="text-blue-600 font-bold mt-2 mb-3">{listing.price} <span className="text-gray-500 font-normal text-sm">/ night</span></p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-6">
            <a href="#" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              See All
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </a>
          </div>
        </section>

        {/* Features Section */}
        <FeaturesSection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Community CTA Section */}
        <CommunityCTASection />
      </main>


    </>
  );
}
