import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t py-12 mt-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-between gap-8">
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex items-center gap-2 font-bold text-navy text-lg">
            <span role="img" aria-label="plane">✈️</span> Crew Lounge
          </div>
          <div className="text-gray-600 text-sm max-w-xs">
            The premier platform for aviation professionals to find crashpads, vacation rentals, and gig opportunities throughout North America.
          </div>
          <div className="flex gap-3 mt-2 text-gray-400">
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div>
            <div className="font-semibold mb-2 text-navy">COMPANY</div>
            <ul className="text-gray-600 text-sm space-y-1">
              <li><a href="#">About</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2 text-navy">SUPPORT</div>
            <ul className="text-gray-600 text-sm space-y-1">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Safety Center</a></li>
              <li><a href="#">Community Guidelines</a></li>
              <li><a href="#">Improvement Suggestions</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2 text-navy">LEGAL</div>
            <ul className="text-gray-600 text-sm space-y-1">
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t mt-10 pt-4 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
        <div>
          © 2025 Crew Lounge. All rights reserved.
        </div>
        <div className="mt-2 md:mt-0">
          Made with <span className="text-pink-500">♥</span> for aviation professionals worldwide
        </div>
      </div>
    </footer>
  );
}
