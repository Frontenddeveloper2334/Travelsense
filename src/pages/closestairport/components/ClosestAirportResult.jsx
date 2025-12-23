import React from "react";

export default function ClosestAirportResult({ result, query, handleSearch }) {
  if (!result) return null;

  const airports = result.airports || [];
  const title = result.query || query || "this location";
  const mapLink = (lat, lon) => `https://www.google.com/maps?q=${lat},${lon}`;

  return (
    <div className="mt-4">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-extrabold text-[#00205b]">Major airports near {title}</h3>
          <div className="text-sm text-gray-600">Showing {airports.length} results</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ul className="space-y-4">
              {airports.map((a, idx) => (
                <li key={`${a.iata}-${idx}`} className="flex items-start gap-4 p-4 rounded-md hover:bg-gray-50">
                  <div className="mt-1 text-[#ffdd00] text-xl">✔</div>
                  <div className="flex-1">
                    <a href={mapLink(a.lat, a.lon)} target="_blank" rel="noreferrer" className="text-lg font-semibold text-[#05296B] hover:underline">
                      {a.km} km to {a.name}
                    </a>
                    <div className="mt-1 text-sm text-gray-600">{a.city}, {a.country} • <span className="font-medium">{a.iata}</span> / {a.icao}</div>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-gray-700">
              Search for direct flights from your hometown and find hotels near {title}. Scroll down for more international or domestic airports, or browse local airports if you're a pilot.
            </p>
          </div>

          <aside className="bg-[#f8fafc] p-4 rounded-md">
            <div className="text-sm text-gray-600 mb-3">Quick search</div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600">City</label>
                <input value={title} readOnly className="mt-1 w-full border border-gray-200 rounded px-3 py-2 bg-white text-sm" />
              </div>

              <div>
                <label className="block text-xs text-gray-600">Get</label>
                <select className="mt-1 w-full border border-gray-200 rounded px-3 py-2 bg-white text-sm">
                  <option>closest airport</option>
                  <option>international airports</option>
                  <option>domestic airports</option>
                  <option>local airports</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-600">Check-in</label>
                  <input type="date" className="mt-1 w-full border border-gray-200 rounded px-2 py-2 bg-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs text-gray-600">Check-out</label>
                  <input type="date" className="mt-1 w-full border border-gray-200 rounded px-2 py-2 bg-white text-sm" />
                </div>
              </div>

              <div className="flex gap-2 mt-2">
                <button onClick={handleSearch} className="flex-1 bg-[#ffdd00] text-[#00205b] font-semibold py-2 rounded shadow hover:opacity-95">SEARCH</button>
                <button onClick={() => window.scrollTo(0, document.body.scrollHeight)} className="bg-white border border-gray-200 text-gray-800 px-4 py-2 rounded">CALCULATE</button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

