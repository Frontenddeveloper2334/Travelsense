import React, { useState } from "react";
import LocationInput from "../../../components/LocationInput";
import PriceCalculator from "../../../components/PriceCalculator";
import { useNavigate } from "react-router-dom";

function Content() {
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [fromLocation, setFromLocation] = useState(null);
  const [toLocation, setToLocation] = useState(null);
  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [type, setType] = useState("hotel");

  const navigate = useNavigate();

  const handleCalculate = () => {
    if (!fromLocation || !toLocation) {
      alert("Please select both From and To locations from suggestions.");
      return;
    }

    navigate("/flight-result", {
      state: { from: fromLocation, to: toLocation },
    });
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
          <div className="p-6 bg-white rounded-xl shadow space-y-4 border border-gray-200">
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

            <LocationInput
              placeholder="From (city or country)"
              value={fromQuery}
              onChange={(v) => setFromQuery(v)}
              onSelectLocation={(loc) => {
                setFromLocation(loc);
                setFromQuery(`${loc.name}, ${loc.country}`);
              }}
            />

            <LocationInput
              placeholder="To (city or country)"
              value={toQuery}
              onChange={(v) => setToQuery(v)}
              onSelectLocation={(loc) => {
                setToLocation(loc);
                setToQuery(`${loc.name}, ${loc.country}`);
              }}
            />

            <button
              onClick={handleCalculate}
              className="bg-[#ffdd00] w-full py-2 rounded font-semibold text-[#00205b] hover:bg-[#00205b] hover:text-[#ffdd00]  hover:border-[#ffdd00] transition-all"
            >
              CALCULATE
            </button>
          </div>

          

          <PriceCalculator
            type={type}
            setType={setType}
            fromQuery={fromQuery}
            setFromQuery={setFromQuery}
            toQuery={toQuery}
            setToQuery={setToQuery}
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
      </div>
    </>
  );
}

export default Content;
