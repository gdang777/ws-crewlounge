import FeaturedListingCard from "../../components/FeaturedListingCard";
import Button from "../../components/Button";

const propertyListings = [
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

export default function PropertiesPage() {
  return (
    <div className="flex flex-col gap-10 px-4 pt-10 pb-20 max-w-7xl mx-auto">
      <section className="flex flex-col items-center text-center gap-4 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-2">Crashpads & Vacation Rentals</h1>
        <p className="text-lg text-gray max-w-2xl">
          Browse top-rated crashpads and vacation properties from our aviation community. Find your next stay!
        </p>
      </section>
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {propertyListings.map((listing, idx) => (
            <FeaturedListingCard key={idx} {...listing} />
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <Button variant="secondary">Add Property</Button>
        </div>
      </section>
    </div>
  );
}
