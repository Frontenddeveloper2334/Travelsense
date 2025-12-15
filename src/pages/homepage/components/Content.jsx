import React, { useState } from "react";

function Content() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [type, setType] = useState("hotel");

  const handleCalculate = () => {
    alert(`Calculating distance from ${from} to ${to}`);
  };

  const handleSearch = () => {
    alert(`Searching ${type} in ${city} from ${checkIn} to ${checkOut}`);
  };

  return (
    <>
      {/* ============================
          HERO INFO SECTION
      ============================= */}
      <div className="max-w-7xl mx-auto py-20 px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-10">

          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="p-6 bg-white rounded-xl shadow space-y-3">
              <h3 className="text-xl font-bold text-[#05296B]">Who uses TravelSense?</h3>
              <p className="text-gray-700 leading-relaxed">
                Major airlines like United, Southwest & Ryanair use TravelSense for routing data.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow space-y-3">
              <h3 className="text-xl font-bold text-[#05296B]">As Seen On</h3>
              <div className="flex gap-3">
                <div className="bg-orange-500 px-4 py-2 text-white rounded-lg font-bold">n</div>
                <div className="bg-blue-500 px-4 py-2 text-white rounded-lg font-bold">p</div>
                <div className="bg-gray-700 px-4 py-2 text-white rounded-lg font-bold">r</div>
              </div>
            </div>

          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="p-6 bg-white rounded-xl shadow space-y-4">
              <h3 className="text-xl font-bold text-[#05296B]">Celebrities Love TravelSense</h3>

              <div className="flex gap-4">
                <img
                  src="https://tpc.googlesyndication.com/simgad/12345-example-ad1"
                  className="rounded-lg w-24 shadow"
                  alt=""
                />
                <p className="text-gray-700 italic text-sm leading-snug">
                  "TravelSense is the one app I couldn't live without!"
                  <br />— Drew Barrymore
                </p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-xl shadow space-y-3">
              <h3 className="text-xl font-bold text-[#05296B]">Hygiene Studies</h3>
              <p className="text-gray-700 leading-relaxed">
                Explore our detailed research on transit & hotel hygiene.
                <span className="block underline mt-1 cursor-pointer">Read full study</span>
              </p>
            </div>

          </div>

          {/* Row 3 — Long Body Text */}
          <div className="p-6 bg-white rounded-xl shadow space-y-4">
            <h3 className="text-2xl font-bold text-[#05296B]">What is TravelSense?</h3>
            <p className="text-gray-700 leading-relaxed">
              TravelSense helps you calculate travel time, distance, and cost for any location.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Search flights, hotels, and car rentals — or compare driving routes.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow space-y-4">
            <h3 className="text-2xl font-bold text-[#05296B]">How do I search?</h3>
            <p className="text-gray-700 leading-relaxed">
              Enter an airport code, city name, state, country, or zip code to get results.
            </p>
          </div>

        </div>

        {/* ============================
            RIGHT — CALCULATORS
        ============================= */}
        <div className="space-y-10">

          {/* Quick Calculator */}
          <div className="p-6 bg-white rounded-xl shadow space-y-4">
            <h3 className="text-2xl font-bold text-[#05296B]">Quick Calculator</h3>

            <input
              className="border p-3 rounded w-full"
              placeholder="From"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
            <input
              className="border p-3 rounded w-full"
              placeholder="To"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />

            <button
              onClick={handleCalculate}
              className="bg-[#ffdd00] w-full py-2 rounded font-semibold hover:bg-[#00205b] hover:text-[#ffdd00] border-2 hover:border-[#ffdd00] transition-all"
            >
              CALCULATE
            </button>
          </div>

          {/* Price Checker */}
          <div className="p-6 bg-white rounded-xl shadow space-y-4">
            <h3 className="text-2xl font-bold text-[#05296B]">Check Prices</h3>

            <input
              className="border p-3 rounded w-full"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <input
              type="date"
              className="border p-3 rounded w-full"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />

            <input
              type="date"
              className="border p-3 rounded w-full"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />

            <select
              className="border p-3 rounded w-full"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="hotel">Hotel</option>
              <option value="car">Car</option>
              <option value="flight">Flight</option>
            </select>

            <button
              onClick={handleSearch}
              className="bg-[#ffdd00] w-full py-2 rounded font-semibold hover:bg-[#00205b] hover:text-[#ffdd00] border-2 hover:border-[#ffdd00] transition-all"
            >
              SEARCH
            </button>
          </div>

        </div>
      </div>
    </>
  );
}

export default Content;
