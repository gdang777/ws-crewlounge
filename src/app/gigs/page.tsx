"use client";
import { useState } from "react";
import Button from "../../components/Button";

const gigCategories = [
  "All Categories",
  "Transportation",
  "Pet Care",
  "Home Care",
  "Customer Service",
  "Education"
];

const gigs = [
  {
    title: "Airport Transportation for Crew",
    poster: "David C. (Air Canada)",
    category: "Transportation",
    location: "Toronto, ON",
    dateRange: "Aug 15 - Aug 20",
    duration: "5-6 hours",
    pay: "$25/hr",
    description: "Looking for someone to provide transportation for flight crew between airport and hotel for 5 days. Must have own vehicle and clean driving record.",
    skills: ["Driving", "Punctuality", "Communication"],
    status: "Open",
    postedDaysAgo: 2,
    rating: 4.8,
    reviews: 12,
    icon: "🚗"
  },
  {
    title: "Pet Sitting During 4-Day Trip",
    poster: "Sarah M. (WestJet)",
    category: "Pet Care",
    location: "Calgary, AB",
    dateRange: "Aug 23 - Aug 27",
    duration: "4 days",
    pay: "$40/day",
    description: "Need a pet sitter for my two cats while I'm away on a flight assignment. Feeding twice daily and some playtime required.",
    skills: ["Pet Care", "Reliability", "Attention to Detail"],
    status: "Open",
    postedDaysAgo: 5,
    rating: 4.9,
    reviews: 24,
    icon: "🐾"
  },
  {
    title: "Airport Lounge Assistant",
    poster: "Robert L. (CATSA)",
    category: "Customer Service",
    location: "Vancouver, BC",
    dateRange: "Aug 30 - Sept 10",
    duration: "Part-time",
    pay: "$22/hr",
    description: "Seeking a fellow aviation professional to help in the airport lounge during peak hours. Customer service experience preferred.",
    skills: ["Customer Service", "Problem Solving", "Multi-tasking"],
    status: "Open",
    postedDaysAgo: 1,
    rating: 4.7,
    reviews: 8,
    icon: "🛎️"
  },
  {
    title: "House Sitting & Plant Watering",
    poster: "Michelle K. (Air Transat)",
    category: "Home Care",
    location: "Montreal, QC",
    dateRange: "Sept 5 - Sept 15",
    duration: "10 days",
    pay: "$30/day",
    description: "Need someone to check on my apartment, water plants, and collect mail while I'm away on an extended flight assignment.",
    skills: ["Responsibility", "Basic Plant Care", "Trustworthiness"],
    status: "Open",
    postedDaysAgo: 3,
    rating: 4.6,
    reviews: 15,
    icon: "🏠"
  },
  {
    title: "Aviation English Tutor",
    poster: "Jean P. (Air Canada)",
    category: "Education",
    location: "Remote",
    dateRange: "Flexible",
    duration: "Ongoing",
    pay: "$40/hr",
    description: "Looking for a native English speaker to help with aviation English proficiency. 2-3 sessions per week, schedule flexible.",
    skills: ["Teaching", "Aviation Knowledge", "Patience"],
    status: "Open",
    postedDaysAgo: 7,
    rating: 5,
    reviews: 17,
    icon: "📚"
  },
  {
    title: "Luggage Delivery Service",
    poster: "Karia S. (Porter)",
    category: "Transportation",
    location: "Ottawa, ON",
    dateRange: "Ongoing",
    duration: "As needed",
    pay: "$15/delivery + expenses",
    description: "Need someone to occasionally transport delayed luggage from airport to passengers in the Ottawa area. On-call basis.",
    skills: ["Reliability", "Driving", "Problem Solving"],
    status: "Open",
    postedDaysAgo: 2,
    rating: 4.8,
    reviews: 21,
    icon: "🧳"
  },

];

export default function GigsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (idx: number) => {
    if (favorites.includes(idx)) {
      setFavorites(favorites.filter(i => i !== idx));
    } else {
      setFavorites([...favorites, idx]);
    }
  };

  const filteredGigs = gigs.filter(gig => {
    const q = search.toLowerCase();
    const matchesSearch = (
      gig.title.toLowerCase().includes(q) ||
      gig.location.toLowerCase().includes(q) ||
      gig.category.toLowerCase().includes(q) ||
      gig.description.toLowerCase().includes(q) ||
      gig.poster.toLowerCase().includes(q)
    );
    
    // Filter by category
    if (activeCategory !== "All Categories" && gig.category !== activeCategory) {
      return false;
    }
    
    return matchesSearch;
  });

  return (
    <div className="flex flex-col gap-8 pb-20 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="w-full bg-blue-600 text-white py-10 px-4 rounded-b-3xl shadow-md flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 flex items-center gap-3">
          <span role="img" aria-label="briefcase">💼</span> Find & Post Aviation Gigs
        </h1>
        <p className="text-lg max-w-2xl text-center">
          Browse side job opportunities and layover recommendations posted by fellow aviation professionals.
        </p>
      </section>

      {/* Search and Actions */}
      <div className="w-full flex flex-col gap-3 px-4 mt-[-2rem]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-white rounded shadow px-4 py-3">
          <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2 min-w-[280px]">
            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              type="text"
              placeholder="Search gigs..."
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
            <button className="flex items-center gap-1 text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 17a4 4 0 01-6 0"/><path d="M12 3v4m0 0a4 4 0 004 4h4m-8-4a4 4 0 00-4 4H4m8-4V3"/></svg>
              Near Me
            </button>
            <Button variant="primary" className="text-xs px-3 py-1">+ Post a Gig</Button>
            <button className="flex items-center gap-1 text-xs text-gray-600 border border-gray-300 px-2 py-1 rounded hover:bg-gray-100">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex overflow-x-auto gap-2 px-4 py-3 border-b">
        {gigCategories.map((category, idx) => (
          <button 
            key={idx}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${activeCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gigs Cards Grid */}
      <section className="px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredGigs.map((gig, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-lg overflow-hidden shadow-sm border transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01] relative cursor-pointer flex flex-col h-[420px]"
            >
              {/* Icon and Status */}
              <div className="absolute top-3 left-3 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
                <span role="img" aria-label="icon">{gig.icon}</span>
              </div>
              <div className="absolute top-3 right-3 flex items-center gap-1">
                <div className="flex items-center gap-1 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  <span>{gig.status}</span>
                </div>
                <span className="text-xs text-gray-500">{gig.postedDaysAgo} {gig.postedDaysAgo === 1 ? 'day' : 'days'} ago</span>
              </div>
              
              {/* Poster Info */}
              <div className="pt-14 px-3 flex-1 flex flex-col">
                <div className="text-xs text-gray-600 mb-0.5">{gig.poster}</div>
                <h3 className="font-semibold text-base mb-1.5">{gig.title}</h3>
                
                {/* Category */}
                <div className="flex items-center mb-2">
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">{gig.category}</span>
                </div>
                
                {/* Location */}
                <div className="flex items-center text-xs text-gray-600 mb-1.5">
                  <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{gig.location}</span>
                </div>
                
                {/* Date Range */}
                <div className="flex items-center text-xs text-gray-600 mb-1.5">
                  <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{gig.dateRange}</span>
                </div>
                
                {/* Duration */}
                <div className="flex items-center text-xs text-gray-600 mb-1.5">
                  <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{gig.duration}</span>
                </div>
                
                {/* Pay */}
                <div className="flex items-center text-xs text-gray-600 mb-3">
                  <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{gig.pay}</span>
                </div>
                
                {/* Description */}
                <div className="h-[60px] mb-3 overflow-hidden hover:h-auto transition-all duration-200">
                  <p className="text-xs text-gray-700">{gig.description}</p>
                </div>
                
                {/* Skills */}
                <div className="flex flex-wrap gap-1 mb-3 h-[22px] overflow-hidden">
                  {gig.skills.map((skill, skillIdx) => (
                    <span key={skillIdx} className="text-xs bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded">{skill}</span>
                  ))}
                </div>
                
                {/* Spacer to push rating/actions to bottom */}
                <div className="flex-grow"></div>
                
                {/* Rating and Actions */}
                <div className="flex items-center justify-between border-t pt-3 pb-3 mt-auto">
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="font-medium text-sm">{gig.rating}</span>
                    <span className="text-gray-400 text-xs ml-1">({gig.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(idx); }}
                      className="p-1 rounded-full hover:bg-gray-100 transition-all duration-200 hover:scale-110"
                      aria-label={favorites.includes(idx) ? "Remove from favorites" : "Add to favorites"}
                    >
                      <svg className="w-4 h-4" fill={favorites.includes(idx) ? "#ef4444" : "none"} stroke={favorites.includes(idx) ? "#ef4444" : "currentColor"} strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-1 px-3 rounded transition-all duration-200 hover:shadow-md">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
