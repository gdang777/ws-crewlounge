"use client";

import React from "react";

const features = [
  {
    icon: "\uD83C\uDFE0",
    title: "Crashpads & Rentals",
    desc: "Find comfortable crashpads and vacation rentals for every layover.",
  },
  {
    icon: "\u2708\uFE0F",
    title: "Layover Tips",
    desc: "Discover crew-recommended spots and activities in every city.",
  },
  {
    icon: "\uD83D\uDCBC",
    title: "Aviation Gigs",
    desc: "Earn extra income with gigs tailored for aviation professionals.",
  },
  {
    icon: "\uD83D\uDD11",
    title: "Verified Hosts",
    desc: "Book with confidence—only trusted, verified hosts allowed.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 bg-gray-50 flex flex-col items-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-2 text-center">Designed Specifically for Aviation Professionals</h2>
      <p className="text-gray mb-8 text-center max-w-2xl">Our platform connects flight attendants and pilots with the resources they need for comfortable stays, layover tips, and additional income opportunities.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
        {features.map((f, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:scale-[1.01] cursor-pointer">
            <div className="text-3xl mb-3">{f.icon}</div>
            <div className="font-semibold text-lg text-navy mb-1">{f.title}</div>
            <div className="text-gray-600 text-sm">{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
