import React, { useState } from "react";
import LocationInput from "../../components/LocationInput";
import {
  calculateDistance,
  calculateFlightTime,
} from "../../services/LocationService";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PriceCalculator from "../../components/PriceCalculator";
import FlyingTimeResult from "./components/FlyingTimeResult";
import { useNavigate } from "react-router-dom";

export default function FlyingTime() {
  const [path, setPath] = useState("flying-time"); // default selection
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [departDate, setDepartDate] = useState(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  });
  const [returnDate, setReturnDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 6);
    return d.toISOString().slice(0, 10);
  });
  const [tripType, setTripType] = useState("round-trip");
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
    "nearest-airport": "Nearest Airport",
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
      const hours = calculateFlightTime(km);

      const resultObj = { km: km.toFixed(0), hours };
      // navigate to result page with state
      navigate('/flying-time/result', { state: { result: resultObj, from, to, fromLocation, toLocation, departDate, returnDate } });
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
                    placeholder="Enter location"
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Depart</label>
                    <input type="date" value={departDate} onChange={(e)=>setDepartDate(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 mt-1" />
                  </div>
                  {tripType !== "oneway" && (
                  <div>
                    <label className="text-sm text-gray-600">Return</label>
                    <input type="date" value={returnDate} onChange={(e)=>setReturnDate(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 mt-1" />
                  </div>
                  )}
                  <div>
                    <label className="text-sm text-gray-600">Trip</label>
                    <select value={tripType} onChange={(e)=>{ const v = e.target.value; setTripType(v); if(v==='oneway'){ setReturnDate(''); } }} className="w-full border border-gray-300 rounded-lg p-2 mt-1">
                      <option value="oneway">one-way</option>
                      <option value="round-trip">round-trip</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#ffdd00] text-[#00205b] font-semibold px-8 py-3 rounded-md w-full text-lg transition-all duration-300 border-2 border-transparent hover:border-[#ffdd00] hover:bg-[#00205b] hover:text-[#ffdd00] disabled:opacity-50"
                >
                  {loading ? "CALCULATING..." : "GO"}
                </button>

                {/* Results are shown on a separate page */}
              </form>

              <article className="prose prose-lg text-gray-700 mt-10">
                <h2 className="text-2xl font-bold text-[#05296B] pb-2">Flying Time Between Cities</h2>
                <p>
                  Travelsense provides an online flight time calculator for
                  all types of travel routes. You can enter airports, cities,
                  states, countries, or zip codes to find the flying time
                  between any two points. The database uses the great circle
                  distance and an average airspeed of a commercial airliner to
                  estimate typical flight durations.
                </p>

                <p>
                  Use the calculator above to compare flying times, distances,
                  or to check driving alternatives for the same route.
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
