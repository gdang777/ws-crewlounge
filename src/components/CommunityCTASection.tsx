import React from "react";
import Button from "./Button";
import Link from "next/link";

export default function CommunityCTASection() {
  return (
    <section className="py-16 bg-gray-50 flex flex-col items-center text-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-2">Join Our Aviation Community Today</h2>
      <p className="text-gray mb-6 max-w-xl">
        Connect with thousands of aviation professionals, find the perfect crashpad, discover layover recommendations, or earn extra income through gigs.
      </p>
      <div className="flex gap-3 justify-center flex-wrap">
        <Link href="/auth/register">
          <Button variant="primary">Join the Community</Button>
        </Link>
        <Link href="/properties">
          <Button variant="secondary">Browse Properties</Button>
        </Link>
        <Link href="/layovers">
          <Button variant="secondary">Layover Tips</Button>
        </Link>
      </div>
    </section>
  );
}
