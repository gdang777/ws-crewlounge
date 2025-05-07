import Card from "../../components/Card";
import Button from "../../components/Button";

const layoverCities = [
  {
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    city: "New York",
    country: "USA",
    code: "JFK",
    recommendations: 12,
  },
  {
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    city: "London",
    country: "UK",
    code: "LHR",
    recommendations: 9,
  },
  {
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3d41?auto=format&fit=crop&w=400&q=80",
    city: "Paris",
    country: "France",
    code: "CDG",
    recommendations: 7,
  },
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    city: "Tokyo",
    country: "Japan",
    code: "NRT",
    recommendations: 8,
  },
  {
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
    city: "Sydney",
    country: "Australia",
    code: "SYD",
    recommendations: 6,
  },
  {
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80",
    city: "Delhi",
    country: "India",
    code: "DEL",
    recommendations: 5,
  },
];

export default function LayoversPage() {
  return (
    <div className="flex flex-col gap-10 px-4 pt-10 pb-20 max-w-7xl mx-auto">
      <section className="flex flex-col items-center text-center gap-4 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-navy mb-2">Featured Layovers</h1>
        <p className="text-lg text-gray max-w-2xl">
          Discover crew-recommended spots in popular layover destinations around the world.
        </p>
      </section>
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {layoverCities.map((city, idx) => (
            <Card key={idx} className="p-0 overflow-hidden">
              <img src={city.image} alt={city.city} className="w-full h-36 object-cover" />
              <div className="p-4 flex flex-col gap-1">
                <span className="bg-navy text-white text-xs px-2 py-0.5 rounded self-start mb-1">{city.code}</span>
                <h3 className="font-semibold text-lg text-navy">{city.city}</h3>
                <p className="text-gray text-sm">{city.country}</p>
                <p className="text-xs text-gray mb-2">{city.recommendations} crew recommendations</p>
                <Button className="mt-2 w-full" variant="primary">View Recommendations</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
