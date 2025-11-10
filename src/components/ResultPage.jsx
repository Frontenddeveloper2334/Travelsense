import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaClock, FaCar, FaPlane } from "react-icons/fa";

export default function ResultPage() {
  const [params] = useSearchParams();
  const path = params.get("path");
  const from = params.get("from");
  const to = params.get("to");

  const [duration, setDuration] = useState(null);

  // ✅ Fetch real data using Google Distance Matrix API
  useEffect(() => {
    const getDistance = async () => {
      try {
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
            from
          )}&destinations=${encodeURIComponent(
            to
          )}&mode=driving&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
        );
        const data = await res.json();
        const dur = data.rows?.[0]?.elements?.[0]?.duration?.text || "N/A";
        setDuration(dur);
      } catch {
        setDuration("Error fetching data");
      }
    };
    getDistance();
  }, [from, to]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-800 mb-2">
          {path?.replace("-", " ")} from {from} to {to}
        </h1>
        <p className="text-gray-600 mb-6">
          Below is your estimated travel information using Google Maps.
        </p>

        <div className="flex items-center gap-3 bg-blue-50 p-5 rounded-xl border border-blue-100">
          <FaClock className="text-blue-700 text-2xl" />
          <div>
            <p className="text-lg font-semibold text-blue-800">
              Estimated {path?.replace("-", " ")}:
            </p>
            <p className="text-gray-700">{duration}</p>
          </div>
        </div>

        {/* --- Mini Calculator Box --- */}
        <div className="mt-10 border-t pt-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">
            Trip Calculator
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* left form */}
            <div className="bg-gray-50 p-5 rounded-xl border">
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                placeholder="Enter city"
                className="w-full border rounded-lg px-3 py-2 mb-3"
              />
              <div className="flex gap-3 mb-3">
                <input type="date" className="flex-1 border rounded-lg px-3 py-2" />
                <input type="date" className="flex-1 border rounded-lg px-3 py-2" />
              </div>
              <select className="w-full border rounded-lg px-3 py-2 mb-4">
                <option>Hotel</option>
                <option>Flight Time</option>
                <option>Driving Time</option>
                <option>Distance</option>
              </select>
              <div className="flex justify-between">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold">
                  SEARCH
                </button>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold">
                  CALCULATE
                </button>
              </div>
            </div>

            {/* right info */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-blue-800 flex items-center gap-2">
                <FaCar /> {path?.replace("-", " ")} Calculator
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                This calculator uses Google Maps to estimate real-world travel time and distance.  
                Plan routes, compare flying vs driving, and find nearby hotels with ease.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
