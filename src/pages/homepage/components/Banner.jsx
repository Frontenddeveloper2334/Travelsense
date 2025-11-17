import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationInput from "../../../components/LocationInput";

export default function Banner() {
  const navigate = useNavigate();
  const [path, setPath] = useState("from");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const singleInputOptions = [
    "nearest-airport",
    "cities-near",
    "airlines-serving",
    "hotels-near",
    "lat-long",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (singleInputOptions.includes(path)) {
      if (!from) return alert("Please enter the location!");
      navigate(`/results`, {
        state: { calculationType: path, location: fromLocation || { name: from } }
      });
      return;
    }

    if (!from || !to) {
      alert("Please enter both 'From' and 'To' locations!");
      return;
    }

    setLoading(true);
    navigate(`/results`, {
      state: {
        calculationType: path,
        from: fromLocation || { name: from },
        to: toLocation || { name: to }
      }
    });
    setLoading(false);
  };

  const description =
    "We are a leading provider of personalized travel services, technology, and resources for modern explorers.";

  return (
    <div className="main">
      {/* ✅ Banner Section */}
      <section
        className="relative flex flex-col lg:flex-row py-16 items-stretch justify-between min-h-[90vh] bg-cover bg-center"
        style={{
          backgroundImage: "url('/Image/banner.jpg')",
        }}
      >
        {/* ✅ Left Text Section */}
        <div className="relative w-full lg:w-[45%] bg-[#00205b] text-white flex flex-col justify-center">
          <div className="max-w-xxl w-full absolute top-30 left-40 space-y-5">
            <h1 className="w-full text-3xl md:text-5xl font-bold leading-tight">
              <span className="bg-[#ffdd00] text-[#00205b] px-3 py-1 leading-[1.5]">
                Travel Sense: Where You Want To Explore
              </span>
            </h1>
            <p className="text-base md:text-lg max-w-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* ✅ Right Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-10">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white p-8 shadow-xl space-y-6"
          >
            <h1 className="text-2xl font-medium mb-6 text-left">
              <span className="text-[#00205b] pr-1">Travel</span>
              <span className="text-yellow-400 font-bold">Calculations</span>
            </h1>

            <select
              value={path}
              onChange={(e) => setPath(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="from">All calculations</option>
              <option value="distance">Distance</option>
              <option value="flying-time">Flight time</option>
              <option value="driving-time">Driving time</option>
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

            {/* ✅ CONDITIONAL INPUTS WITH LOCATION SUGGESTIONS */}
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

            <button
              type="submit"
              disabled={loading}
              className="bg-[#ffdd00] text-[#00205b] font-semibold px-8 py-3 rounded-md w-full text-lg transition-all duration-300 border-2 border-transparent hover:border-[#ffdd00] hover:bg-[#00205b] hover:text-[#ffdd00] disabled:opacity-50"
            >
              {loading ? "CALCULATING..." : "GO"}
            </button>
          </form>
        </div>
      </section>

      {/* ...existing code... */}
    </div>
  );
}