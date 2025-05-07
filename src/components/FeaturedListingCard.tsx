import React from "react";
import Card from "./Card";

interface FeaturedListingCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  type: string;
}

const FeaturedListingCard: React.FC<FeaturedListingCardProps> = ({ image, title, location, price, type }) => {
  return (
    <Card className="w-full max-w-xs p-0 overflow-hidden">
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
