import React from "react";
import Button from "./Button";

export default function CommunityCTASection() {
  return (
    <section className="py-16 bg-gray-50 flex flex-col items-center text-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-2">Join Our Aviation Community Today</h2>
      <p className="text-gray mb-6 max-w-xl">
        Connect with thousands of aviation professionals, find the perfect crashpad, discover layover recommendations, or earn extra income through gigs.
      </p>
      <div className="flex gap-3 justify-center">
        <Button variant="primary">Browse Properties</Button>
        <Button variant="secondary">Layover Tips</Button>
      </div>
    </section>
  );
}
