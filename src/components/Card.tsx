"use client";

import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  animateHover?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = "", 
  animateHover = true 
}) => {
  return (
    <div 
      className={`
        bg-white rounded-lg shadow-md p-4 
        ${animateHover ? 'transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01]' : ''} 
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
