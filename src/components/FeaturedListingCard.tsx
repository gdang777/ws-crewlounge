"use client";

import React, { useState } from "react";
import Card from "./Card";

interface FeaturedListingCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  type: string;
}

const FeaturedListingCard: React.FC<FeaturedListingCardProps> = ({ image, title, location, price, type }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  return (
    <Card className="w-full max-w-xs p-0 overflow-hidden relative cursor-pointer" animateHover={true}>
      {/* Favorite Button */}
      <button 
        onClick={(e) => { e.stopPropagation(); setIsFavorite(!isFavorite); }}
        className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-all duration-200 hover:scale-110 z-10"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <svg className="w-4 h-4" fill={isFavorite ? "#ef4444" : "none"} stroke={isFavorite ? "#ef4444" : "currentColor"} strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
      
      <img src={image} alt={title} className="w-full h-40 object-cover rounded-t-lg" />
      <div className="p-4">
        <span className="inline-block bg-gray text-xs text-white px-2 py-1 rounded mb-2">{type}</span>
        <h3 className="font-semibold text-lg text-navy mb-1">{title}</h3>
        <p className="text-sm text-gray mb-2">{location}</p>
        <span className="text-orange font-bold text-base">{price}</span>
        <span className="text-sm text-gray"> / night</span>
      </div>
    </Card>
  );
};

export default FeaturedListingCard;
