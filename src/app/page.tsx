import FeaturedListingCard from "../components/FeaturedListingCard";
import Card from "../components/Card";
import Button from "../components/Button";

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
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    city: "New York",
    country: "USA",
    code: "JFK",
  },
  {
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    city: "London",
    country: "UK",
    code: "LHR",
  },
  {
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3d41?auto=format&fit=crop&w=400&q=80",
    city: "Paris",
    country: "France",
    code: "CDG",
  },
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    city: "Tokyo",
    country: "Japan",
    code: "NRT",
  },
  {
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
    city: "Sydney",
    country: "Australia",
    code: "SYD",
  },
  {
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80",
    city: "Delhi",
    country: "India",
    code: "DEL",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-16 px-4 pt-10 pb-20 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center gap-6 py-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-navy mb-2">The Aviation Professional Platform</h1>
        <p className="text-lg text-gray max-w-2xl">
          Find crashpads, vacation rentals, layover recommendations, and gig opportunities tailored for aviation professionals across North America.
        </p>
        <Button className="mt-4" variant="primary">Join the Community</Button>
      </section>

      {/* Featured Listings Section */}
      <section>
        <h2 className="text-2xl font-semibold text-navy mb-2">Featured Listings</h2>
        <p className="text-gray mb-6">Discover top-rated crashpads and vacation properties from our community</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredListings.map((listing, idx) => (
            <FeaturedListingCard key={idx} {...listing} />
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <Button variant="secondary">See All</Button>
        </div>
      </section>

      {/* Featured Layovers Section */}
      <section>
        <h2 className="text-2xl font-semibold text-navy mb-2">Featured Layovers</h2>
        <p className="text-gray mb-6">Discover crew-recommended spots in popular layover destinations</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {featuredLayovers.map((layover, idx) => (
            <Card key={idx} className="p-0 overflow-hidden">
              <img src={layover.image} alt={layover.city} className="w-full h-36 object-cover" />
              <div className="p-4 flex flex-col gap-1">
                <span className="bg-navy text-white text-xs px-2 py-0.5 rounded self-start mb-1">{layover.code}</span>
                <h3 className="font-semibold text-lg text-navy">{layover.city}</h3>
                <p className="text-gray text-sm">{layover.country}</p>
                <Button className="mt-2 w-full" variant="primary">View Recommendations</Button>
              </div>
            </Card>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <Button variant="secondary">See All</Button>
        </div>
      </section>
    </div>
  );
}

        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
