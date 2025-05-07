"use client";

import React from "react";

const testimonials = [
  {
    name: "Sarah J.",
    role: "Flight Attendant, Air Canada",
    text: "AviatorHaven has made finding crashpads so much easier. I've been using it for 6 months and found great places near all my layover cities.",
    rating: 5,
  },
  {
    name: "Michael T.",
    role: "First Officer, WestJet",
    text: "As a pilot constantly on the move, finding short-term accommodation was always a challenge. This platform solved that problem completely.",
    rating: 5,
  },
  {
    name: "Emma L.",
    role: "Flight Attendant, Porter Airlines",
    text: "The extra income from gigs between flights has been fantastic. I've connected with other aviation professionals and found great opportunities.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-white flex flex-col items-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-2 text-center">Loved by Aviation Professionals</h2>
      <p className="text-gray mb-8 text-center">Hear what our users have to say about their experiences with AviatorHaven.</p>
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        {testimonials.map((t, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-6 max-w-xs flex-1 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01] cursor-pointer">
            <div className="flex gap-1 mb-2">
              {Array.from({ length: t.rating }).map((_, i) => (
                <span key={i} className="text-yellow-400">★</span>
              ))}
            </div>
            <p className="text-gray-700 mb-4">"{t.text}"</p>
            <div className="font-semibold text-navy">{t.name}</div>
            <div className="text-xs text-gray-500">{t.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
