import React, { useState } from "react";
import LocationInput from "../../components/LocationInput";
import {
  calculateDistance,
  calculateDrivingTime,
} from "../../services/LocationService";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PriceCalculator from "../../components/PriceCalculator";
import { useNavigate } from "react-router-dom";

export default function DrivingDistance() {
  const [path, setPath] = useState("driving-distance"); // default selection -> Driving Distance
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [type, setType] = useState("hotel");
  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const navigate = useNavigate();

  const singleInputOptions = [
    "nearest-airport",
    "cities-near",
    "stopping-points",
    "hotels-near",
    "currency",
    "lat-long",
  ];

  const titleMap = {
    "flying-time": "Flying Time",
    distance: "Distance",
    "driving-time": "Driving Time",
    "driving-distance": "Driving Distance",
    "nearest-airport": "Closest Airport",
    default: "Travel Calculations",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);

    // For flying-time we need both locations
    if (!fromLocation || !toLocation) {
      alert("Please select both From and To locations from suggestions.");
      return;
    }

    setLoading(true);
    try {
      const fLat = Number(fromLocation.latitude ?? fromLocation.lat ?? 0);
      const fLon = Number(fromLocation.longitude ?? fromLocation.lon ?? 0);
      const tLat = Number(toLocation.latitude ?? toLocation.lat ?? 0);
      const tLon = Number(toLocation.longitude ?? toLocation.lon ?? 0);

      const km = calculateDistance(fLat, fLon, tLat, tLon);
      const drivingHours = calculateDrivingTime(km);

      setResult({ km: km.toFixed(0), drivingHours });
    } catch (err) {
      console.error(err);
      alert("Error calculating. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    alert(`Searching ${type} in ${city} from ${checkIn} to ${checkOut}`);
  };

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto py-12 px-6 mt-4">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* LEFT SIDE - Main Content */}
          <main className="flex-1">
            <div className="w-full">
              <form
                onSubmit={handleSubmit}
                className="w-full bg-white p-8 shadow-xl space-y-6 rounded-lg"
              >
                <h1 className="text-2xl font-medium mb-2 text-left">
                  <span className="text-[#00205b] pr-1">
                    {titleMap[path] || titleMap.default}
                  </span>
                  <span className="text-yellow-400 font-bold">Calculator</span>
                </h1>

                <select
                  value={path}
                  onChange={(e) => setPath(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3"
                >
                  <option value="from">All calculations</option>
                  <option value="distance">Distance</option>
                  <option value="driving-distance">Driving Distance</option>
                  <option value="flying-time">Flying Time</option>
                  <option value="driving-time">Driving Time</option>
                  <option value="nearest-airport">Closest airport</option>
                  <option value="cost-of-driving">Cost of driving</option>
                  <option value="halfway">Halfway point</option>
                  <option value="time-change">Time difference</option>
                  <option value="cities-near">Cities near</option>
                  <option value="stopping-points">Stopping points</option>
                  <option value="fly-or-drive">Fly or drive</option>
                  <option value="nonstop-flight">Direct flights</option>
                  <option value="airlines-serving">Airlines serving</option>
                  <option value="hotels-near">Hotels in the area</option>
                  <option value="currency">Currency converter</option>
                  <option value="lat-long">Latitude/Longitude</option>
                </select>

                {singleInputOptions.includes(path) ? (
                  <LocationInput
                    placeholder="Enter location (city or airport)"
                    value={from}
                    onChange={setFrom}
                    onSelectLocation={setFromLocation}
                  />
                ) : (
                  <div className="flex flex-col md:flex-row gap-4">
                    <LocationInput
                      placeholder="From"
                      value={from}
                      onChange={setFrom}
                      onSelectLocation={setFromLocation}
                    />
                    <LocationInput
                      placeholder="To"
                      value={to}
                      onChange={setTo}
                      onSelectLocation={setToLocation}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#ffdd00] text-[#00205b] font-semibold px-8 py-3 rounded-md w-full text-lg transition-all duration-300 border-2 border-transparent hover:border-[#ffdd00] hover:bg-[#00205b] hover:text-[#ffdd00] disabled:opacity-50"
                >
                  {loading ? "CALCULATING..." : "GO"}
                </button>

                {result && (
                  <div className="mt-4 p-4 bg-gray-50 rounded">
                    <div className="font-semibold">Results</div>
                    <div className="text-sm mt-2">Distance: {result.km} km</div>
                    <div className="text-sm">
                      Estimated driving time: {result.drivingHours} hour(s)
                    </div>
                  </div>
                )}
              </form>

              <article className="prose prose-lg text-gray-700 mt-10">
                <h2 className="text-2xl font-bold text-[#05296B] pb-2">Driving Distance Between Two Cities</h2>
                <p>
                  Use the driving time calculator to estimate how long a road trip will take between two points. Enter cities, towns, or addresses and we compute an approximate driving distance and time using typical driving speeds and route assumptions.
                </p>

                <p>
                  This tool is useful for planning trips, estimating fuel costs, or comparing whether it's faster to drive or fly. For long distances the driving time will often be significantly longer than flying time, so check both options when planning.
                </p>
              </article>
            </div>
          </main>

          {/* RIGHT SIDE - Sticky Sidebar */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="lg:sticky lg:top-28 space-y-6">
              <PriceCalculator
                type={type}
                setType={setType}
                fromQuery={from}
                setFromQuery={setFrom}
                toQuery={to}
                setToQuery={setTo}
                fromLocation={fromLocation}
                setFromLocation={setFromLocation}
                toLocation={toLocation}
                setToLocation={setToLocation}
                city={city}
                setCity={setCity}
                checkIn={checkIn}
                setCheckIn={setCheckIn}
                checkOut={checkOut}
                setCheckOut={setCheckOut}
                navigate={navigate}
                handleSearch={handleSearch}
              />
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </>
  );
}
