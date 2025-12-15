import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RouteMap from "./RootMap";

import {
  calculateDistance,
  calculateDrivingTime,
  calculateFlightTime,
  getTimezoneDifference,
} from "../services/locationService";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { FaPlane, FaCar, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  const state = location.state || {};
  const { calculationType, from, to } = state;

  useEffect(() => {
    const calculateResults = async () => {
      setLoading(true);
      let resultData = { type: calculationType, from, to };

      try {
        if (calculationType === "distance" && from && to) {
          const distance = calculateDistance(
            from.latitude,
            from.longitude,
            to.latitude,
            to.longitude
          );
          resultData.distance = distance.toFixed(2);
          resultData.message = `Distance between ${from.name} and ${to.name}`;
        }

        if (calculationType === "flying-time" && from && to) {
          const distance = calculateDistance(
            from.latitude,
            from.longitude,
            to.latitude,
            to.longitude
          );
          const flightTime = calculateFlightTime(distance);
          resultData.distance = distance.toFixed(2);
          resultData.flightTime = flightTime;
          resultData.message = `Flight time from ${from.name} to ${to.name}`;
        }

        if (calculationType === "driving-time" && from && to) {
          const distance = calculateDistance(
            from.latitude,
            from.longitude,
            to.latitude,
            to.longitude
          );
          const drivingTime = calculateDrivingTime(distance);
          resultData.distance = distance.toFixed(2);
          resultData.drivingTime = drivingTime;
          resultData.message = `Driving time from ${from.name} to ${to.name}`;
        }

        if (calculationType === "time-change" && from && to) {
          const tzData = await getTimezoneDifference(
            from.latitude,
            from.longitude,
            to.latitude,
            to.longitude
          );
          resultData.timezone = tzData;
          resultData.message = `Time difference between ${from.name} and ${to.name}`;
        }

        if (calculationType === "lat-long" && state.location) {
          resultData.latitude = state.location.latitude;
          resultData.longitude = state.location.longitude;
          resultData.message = `Coordinates for ${state.location.name}`;
        }

        if (calculationType === "halfway" && from && to) {
          const midLat = (from.latitude + to.latitude) / 2;
          const midLon = (from.longitude + to.longitude) / 2;
          resultData.midLatitude = midLat.toFixed(4);
          resultData.midLongitude = midLon.toFixed(4);
          resultData.message = `Halfway point between ${from.name} and ${to.name}`;
        }

        setResults(resultData);
      } catch (error) {
        setResults({ error: "Error calculating results" });
      }
      setLoading(false);
    };

    if (calculationType) calculateResults();
  }, [calculationType, from, to, state.location]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-2xl text-[#00205b] font-semibold">
            Loading...
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      {/* TOP BANNER */}
      {/* TOP BANNER */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-12 text-center text-white shadow-lg">
        <h1 className="text-4xl font-bold mb-2">Your Travel Results</h1>
        <p className="text-lg opacity-90">
          Find distances, travel times & halfway points instantly
        </p>
      </div>

      {/* MAIN GRID */}
      <div className="max-w-7xl mx-auto py-12 px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT CONTENT (2 columns) */}
        <div className="lg:col-span-2 space-y-10">
          {/* BACK BUTTON */}
          <button
            onClick={() => navigate("/")}
            className="bg-[#00205b] text-white px-6 py-2 rounded-lg hover:bg-blue-900 transition"
          >
            ← Back to Calculator
          </button>

          {/* RESULTS BOX */}
          <div className="bg-white shadow-2xl rounded-2xl p-8 space-y-6 border border-gray-100">
            <h1 className="text-3xl font-bold text-[#00205b] text-left mb-4">
              {results?.message}
            </h1>

            {/* FROM */}
            {results?.from && (
              <div className="bg-blue-50 p-5 rounded-xl flex items-center gap-4 shadow-sm">
                <FaMapMarkerAlt className="text-blue-600 text-2xl" />
                <div>
                  <h3 className="font-semibold text-[#00205b]">From</h3>
                  <p className="text-lg">{results.from.name}</p>
                  <p className="text-sm text-gray-600">
                    {results.from.latitude.toFixed(4)},{" "}
                    {results.from.longitude.toFixed(4)}
                  </p>
                </div>
              </div>
            )}

            {/* TO */}
            {results?.to && (
              <div className="bg-blue-50 p-5 rounded-xl flex items-center gap-4 shadow-sm">
                <FaMapMarkerAlt className="text-blue-600 text-2xl" />
                <div>
                  <h3 className="font-semibold text-[#00205b]">To</h3>
                  <p className="text-lg">{results.to.name}</p>
                  <p className="text-sm text-gray-600">
                    {results.to.latitude.toFixed(4)},{" "}
                    {results.to.longitude.toFixed(4)}
                  </p>
                </div>
              </div>
            )}

            {/* DISTANCE */}
            {results?.distance && (
              <div className="bg-yellow-50 border-2 border-yellow-400 p-5 rounded-xl flex items-center gap-4 shadow-sm">
                <FaMapMarkerAlt className="text-yellow-600 text-3xl" />
                <p className="text-3xl font-bold text-yellow-600">
                  {results.distance} km
                </p>
              </div>
            )}

            {/* FLIGHT */}
            {results?.flightTime && (
              <div className="bg-green-50 border-2 border-green-500 p-5 rounded-xl flex items-center gap-4 shadow-sm">
                <FaPlane className="text-green-700 text-3xl" />
                <p className="text-3xl font-bold text-green-700">
                  {results.flightTime} hours
                </p>
              </div>
            )}

            {/* DRIVING */}
            {results?.drivingTime && (
              <div className="bg-green-50 border-2 border-green-500 p-5 rounded-xl flex items-center gap-4 shadow-sm">
                <FaCar className="text-green-700 text-3xl" />
                <p className="text-3xl font-bold text-green-700">
                  {results.drivingTime} hours
                </p>
              </div>
            )}

            {/* TIMEZONE */}
            {results?.timezone && (
              <div className="bg-purple-50 border-2 border-purple-500 p-5 rounded-xl shadow-sm">
                <h3 className="font-bold text-[#00205b] flex items-center gap-2">
                  <FaClock /> Timezone Difference
                </h3>
                <p className="text-lg mt-1">{results.timezone.from_tz}</p>
                <p className="text-lg">{results.timezone.to_tz}</p>
              </div>
            )}

            {/* HALFWAY */}
            {results?.midLatitude && (
              <div className="bg-orange-50 border-2 border-orange-500 p-5 rounded-xl shadow-sm">
                <h3 className="font-bold text-[#00205b] mb-2">Halfway Point</h3>
                <p className="text-lg">Latitude: {results.midLatitude}°</p>
                <p className="text-lg">Longitude: {results.midLongitude}°</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="bg-white shadow-xl rounded-2xl p-8 h-fit border border-gray-100">
          <h2 className="text-2xl font-bold text-[#00205b] mb-4">
            Distance Calculator
          </h2>
          <p className="text-gray-700 mb-4">
            Get accurate distances, flight duration, timezone data and more.
          </p>
          <p className="text-gray-700 mb-4">
            Uses GPS coordinates and great-circle calculations.
          </p>
          <p className="text-gray-700">Plan your trip easily.</p>
        </div>
      </div>

    <div class="max-w-7xl mx-auto w-full bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h1 class="text-2xl font-bold text-blue-900 mb-4 text-left">
            Distance from Delhi to Dubai
          </h1>

          <div class="space-y-3 text-gray-700 text-lg">
            <p>
              <span class="font-semibold">Straight Line Flight Distance:</span>{" "}
              1,373 miles
            </p>
            <p>
              <span class="font-semibold">Equivalent:</span> 2,210 kilometers or
              1,194 nautical miles
            </p>
            <p>
              <span class="font-semibold">Trip Begins:</span> Delhi, India
            </p>
            <p>
              <span class="font-semibold">Trip Ends:</span> Dubai, United Arab
              Emirates
            </p>
            <p>
              <span class="font-semibold">Flight Direction:</span> West (-95°
              from North)
            </p>
          </div>

          <div class="mt-6 text-left">
            <p class="text-gray-500 text-sm">
              This tool calculates the straight line flying distance ("as the
              crow flies") and driving distance if available.
            </p>
          </div>
        </div>

      <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* LEFT CITY */}
        <div className="bg-white shadow-xl rounded-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-[#00205b] mb-3">
            {results?.from?.name}
          </h2>

          <p className="mt-3">
            <span className="font-semibold">City:</span> {results?.from?.name}
          </p>

          <p>
            <span className="font-semibold">Country:</span>{" "}
            {results?.from?.country || "Not available"}
          </p>

          <h3 className="text-xl font-bold text-[#00205b] mt-5 mb-3">
            Related Links
          </h3>

          <ul className="space-y-2 text-blue-700">
            <li>✓ airlines serving {results?.from?.name}</li>
            <li>✓ hotels near {results?.from?.name}</li>
            <li>✓ airports near {results?.from?.name}</li>
            <li>✓ cities near {results?.from?.name}</li>
          </ul>
        </div>

        {/* RIGHT CITY */}
        <div className="bg-white shadow-xl rounded-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-[#00205b] mb-3">
            {results?.to?.name}
          </h2>

          <p className="mt-3">
            <span className="font-semibold">City:</span> {results?.to?.name}
          </p>

          <p>
            <span className="font-semibold">Country:</span>{" "}
            {results?.to?.country || "Not available"}
          </p>

          <h3 className="text-xl font-bold text-[#00205b] mt-5 mb-3">
            Related Links
          </h3>

          <ul className="space-y-2 text-blue-700">
            <li>✓ airlines serving {results?.to?.name}</li>
            <li>✓ hotels near {results?.to?.name}</li>
            <li>✓ airports near {results?.to?.name}</li>
            <li>✓ cities near {results?.to?.name}</li>
          </ul>
        </div>
      </div>

      {/* MAP FIXED AT BOTTOM */}
      {results?.from && results?.to && (
        <div className="mt-12">
          <RouteMap from={results.from} to={results.to} />
        </div>
      )}

      <Footer />
    </>
  );
}
