import React from "react";
import LocationInput from "./LocationInput";

export default function PriceCalculator({
  type,
  setType,
  fromQuery,
  setFromQuery,
  toQuery,
  setToQuery,
  fromLocation,
  setFromLocation,
  toLocation,
  setToLocation,
  city,
  setCity,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  navigate,
  handleSearch,
}) {
  return (
    <div className="p-6 bg-white rounded-xl shadow space-y-4">
      <h3 className="text-2xl font-bold text-[#05296B]">Check Prices</h3>
      <select
        className="border p-3 rounded w-full"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="hotel">Hotel</option>
        <option value="car">Car</option>
        <option value="flight">Flight</option>
      </select>

      {type === "flight" ? (
        <>
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
            onClick={() => {
              if (!fromLocation || !toLocation) {
                alert("Please select both From and To locations from suggestions.");
                return;
              }
              navigate("/flight-result", {
                state: { from: fromLocation, to: toLocation },
              });
            }}
            className="bg-[#ffdd00] w-full py-2 rounded font-semibold hover:bg-[#00205b] hover:text-[#ffdd00]  hover:border-[#ffdd00] transition-all"
          >
            SEARCH FLIGHTS
          </button>
        </>
      ) : (
        <>
          <input
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <input
            type="date"
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />

          <input
            type="date"
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />

          <button
            onClick={handleSearch}
            className="bg-[#ffdd00] w-full py-2 rounded text-[#00205b] font-semibold hover:bg-[#00205b] hover:text-[#ffdd00]  hover:border-[#ffdd00] transition-all"
          >
            SEARCH
          </button>
        </>
      )}
    </div>
  );
}
