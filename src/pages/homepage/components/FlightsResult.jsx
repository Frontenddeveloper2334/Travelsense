import React, { useMemo, useState, useEffect } from "react";
import { FaPlane, FaCar } from "react-icons/fa";
import {
  calculateDistance,
  calculateFlightTime,
  getLocationSuggestions,
} from "../../../services/LocationService";
import LocationInput from "../../../components/LocationInput";

function formatHoursMinutes(hoursFloat) {
  const totalMinutes = Math.round(hoursFloat * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h} hour${h !== 1 ? "s" : ""}, ${m} minute${m !== 1 ? "s" : ""}`;
}

export default function FlightsResult({ from, to }) {
  const [fromQuery, setFromQuery] = useState(
    from ? `${from.name}${from.country ? ", " + from.country : ""}` : ""
  );
  const [toQuery, setToQuery] = useState(
    to ? `${to.name}${to.country ? ", " + to.country : ""}` : ""
  );
  const [selectedFrom, setSelectedFrom] = useState(from || null);
  const [selectedTo, setSelectedTo] = useState(to || null);
  const [expandedRow, setExpandedRow] = useState(null);

  // When user types text (but hasn't selected a suggestion), attempt to
  // resolve the text to a location (debounced) so results below update.
  useEffect(() => {
    let t;
    const tryResolve = async () => {
      if (!fromQuery || selectedFrom) return;
      const res = await getLocationSuggestions(fromQuery);
      if (res && res.length) {
        setSelectedFrom(res[0]);
      }
    };
    t = setTimeout(tryResolve, 700);
    return () => clearTimeout(t);
  }, [fromQuery, selectedFrom]);

  useEffect(() => {
    let t;
    const tryResolve = async () => {
      if (!toQuery || selectedTo) return;
      const res = await getLocationSuggestions(toQuery);
      if (res && res.length) {
        setSelectedTo(res[0]);
      }
    };
    t = setTimeout(tryResolve, 700);
    return () => clearTimeout(t);
  }, [toQuery, selectedTo]);

  const data = useMemo(() => {
    const a = selectedFrom || from;
    const b = selectedTo || to;
    if (!a || !b) return null;

    const fLat = Number(a.latitude ?? a.lat ?? a.latitud ?? 0);
    const fLon = Number(a.longitude ?? a.lon ?? a.lng ?? 0);
    const tLat = Number(b.latitude ?? b.lat ?? b.latitud ?? 0);
    const tLon = Number(b.longitude ?? b.lon ?? b.lng ?? 0);

    const km = calculateDistance(fLat, fLon, tLat, tLon);
    const miles = (km * 0.621371).toFixed(0);
    const flightHours = calculateFlightTime(km);

    // approximate driving distance (route is longer) and time (assume 60 km/h)
    const drivingKm = Math.round(km * 1.22);
    const drivingMiles = Math.round(drivingKm * 0.621371);
    const drivingHours = Math.floor(drivingKm / 60);
    const drivingMinutes = Math.round(((drivingKm / 60) % 1) * 60);

    // Determine whether driving is a realistic option. Simple heuristic:
    // require both coordinates and driving distance under 2000 km.
    const drivingPossible = 
      fLat !== 0 && fLon !== 0 && tLat !== 0 && tLon !== 0 && drivingKm <= 2000;

    const costPerKm = 0.12; // USD per km estimate
    const costDriving = (drivingKm * costPerKm).toFixed(2);

    // simple placeholder lists — you can replace these with real data later
    const airports = b.name
      ? `Nearest airport: ${b.name} International Airport (${b.country || ""})`
      : "";
    const stoppingPoints = ["Jaipur, India", "Udaipur, India", "Surat, India"];
    const nearbyCities = ["Navi Mumbai, India", "Thane, India", "Panvel, India"];

    return {
      km: km.toFixed(0),
      miles,
      flightHours,
      drivingKm,
      drivingMiles,
      drivingHours,
      drivingMinutes,
      costDriving,
      airports,
      drivingPossible,
      stoppingPoints,
      nearbyCities,
    };
  }, [from, to, selectedFrom, selectedTo]);

  if (!data) return null;

  const displayFrom = selectedFrom || from;
  const displayTo = selectedTo || to;

  const handleSwap = () => {
    const a = selectedFrom || from;
    const b = selectedTo || to;
    setSelectedFrom(b);
    setSelectedTo(a);
    setFromQuery(b ? `${b.name}${b.country ? ", " + b.country : ""}` : "");
    setToQuery(a ? `${a.name}${a.country ? ", " + a.country : ""}` : "");
  };

  const handleReset = () => {
    setSelectedFrom(from || null);
    setSelectedTo(to || null);
    setFromQuery(from ? `${from.name}${from.country ? ", " + from.country : ""}` : "");
    setToQuery(to ? `${to.name}${to.country ? ", " + to.country : ""}` : "");
    setExpandedRow(null);
  };

  const openDetails = (key) => setExpandedRow(key === expandedRow ? null : key);

  return (
    <div className="w-full py-8">
      {/* Top inputs (editable) */}
      <div className="max-w-7xl mx-auto mb-6 px-4">
        <div className="bg-white rounded-xl p-6 shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="flex items-center gap-3">
              <label className="w-16 font-semibold text-sm">From:</label>
              <LocationInput
                placeholder="From (city or country)"
                value={fromQuery}
                onChange={(v) => {
                  setFromQuery(v);
                  setSelectedFrom(null);
                }}
                onSelectLocation={(loc) => {
                  setSelectedFrom(loc);
                  setFromQuery(`${loc.name}${loc.country ? ", " + loc.country : ""}`);
                }}
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="w-16 font-semibold text-sm">To:</label>
              <LocationInput
                placeholder="To (city or country)"
                value={toQuery}
                onChange={(v) => {
                  setToQuery(v);
                  setSelectedTo(null);
                }}
                onSelectLocation={(loc) => {
                  setSelectedTo(loc);
                  setToQuery(`${loc.name}${loc.country ? ", " + loc.country : ""}`);
                }}
              />

              <div className="flex items-center gap-2 ml-3">
                <button
                  title="Swap"
                  className="bg-[#ffdd00] hover:bg-[#00205b] text-[#00205b] hover:text-[#ffdd00] px-3 py-2 rounded-md shadow"
                  onClick={handleSwap}
                >
                  ⇅
                </button>
                <button
                  title="Reset"
                  className="bg-[#ffdd00] hover:bg-[#00205b] text-[#00205b] hover:text-[#ffdd00] px-3 py-2 rounded-md shadow"
                  onClick={handleReset}
                >
                  ⟳
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-4 font-semibold text-sm text-gray-700">
        CLICK on any row below to view more detailed calculations.
      </div>

      <div className={`grid grid-cols-1 ${data.drivingPossible ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-6`}>
        {/* Flying */}
        <div className="bg-white rounded-xl shadow">
          <div className="bg-[#00205b] text-white px-6 py-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center gap-3 text-lg">
              <FaPlane className="text-xl" />
              <span className="font-semibold">Flying</span>
            </div>
          </div>
          <div className="p-4 space-y-2">
            <div
              className="grid grid-cols-2 items-center p-3 rounded hover:bg-yellow-50"
              onClick={() => openDetails("flight-distance")}
            >
              <div className="font-semibold text-sm">Flight Distance</div>
              <div className="text-sm text-right">{data.miles} miles / {data.km} km</div>
            </div>

            <div
              className="grid grid-cols-2 items-center p-3 rounded bg-gray-50 hover:bg-yellow-50"
              onClick={() => openDetails("flight-time")}
            >
              <div className="font-semibold text-sm">Flight Time</div>
              <div className="text-sm text-right">{formatHoursMinutes(data.flightHours)}</div>
            </div>

            <div
              className="grid grid-cols-2 items-start p-3 rounded hover:bg-yellow-50"
              onClick={() => openDetails("airports")}
            >
              <div className="font-semibold text-sm">Airports near Destination</div>
              <div className="text-sm text-right">{data.airports}</div>
            </div>

            <div className="grid grid-cols-2 items-center p-3 rounded">
              <div className="font-semibold text-sm">Book a Flight</div>
              <div className="text-right">
                <a
                  onClick={(e) => e.stopPropagation()}
                  href={`https://www.google.com/search?q=flights+to+${encodeURIComponent(displayTo.name || "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#ffdd00] hover:bg-[#00205b] text-[#00205b] hover:text-[#ffdd00] px-4 py-2 rounded-md shadow inline-block text-sm"
                >
                  SEARCH
                </a>
              </div>
            </div>

            <div
              className="grid grid-cols-2 items-center p-3 bg-gray-50 rounded hover:bg-yellow-50"
              onClick={() => openDetails("direct-flights")}
            >
              <div className="font-semibold text-sm">Direct Flights</div>
              <div className="text-sm text-right">Air India Express</div>
            </div>

            <div className="grid grid-cols-2 items-start p-3 rounded">
              <div className="font-semibold text-sm">Book a Hotel</div>
              <div className="text-sm text-right">
                <a
                  onClick={(e) => e.stopPropagation()}
                  href={`https://www.google.com/search?q=hotels+in+${encodeURIComponent(displayTo.name || "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#ffdd00] hover:bg-[#00205b] text-[#00205b] hover:text-[#ffdd00] px-4 py-2 rounded-md inline-block shadow"
                >
                  SEARCH
                </a>
                <div className="mt-2 text-xs text-gray-600 text-right">
                  Hotel New Deepak<br />Hotel Tip Top<br />Hotel Sahil
                </div>
              </div>
            </div>

            <div className="text-right">
              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(displayTo.name || "")}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-sm"
              >
                View Map
              </a>
            </div>
          </div>
        </div>

        {/* Driving */}
        

        {/* Driving (actual card when drivingPossible) */}
        {data.drivingPossible && (
        <div className="bg-white rounded-xl shadow">
          <div className="bg-[#00205b] text-white px-6 py-4 rounded-t-xl flex items-center gap-3">
            <FaCar />
            <span className="font-semibold">Driving</span>
          </div>
          <div className="p-4 space-y-2">
            <div className="grid grid-cols-2 items-center p-3 rounded">
              <div className="font-semibold text-sm">Driving Distance</div>
              <div className="text-sm text-right">{data.drivingMiles} miles / {data.drivingKm} km</div>
            </div>

            <div className="grid grid-cols-2 items-center p-3 rounded bg-gray-50">
              <div className="font-semibold text-sm">Driving Time</div>
              <div className="text-sm text-right">{data.drivingHours} hours, {data.drivingMinutes} minutes</div>
            </div>

            <div className="grid grid-cols-2 items-center p-3 rounded">
              <div className="font-semibold text-sm">Cost of Driving</div>
              <div className="text-sm text-right">${data.costDriving}</div>
            </div>

            <div className="grid grid-cols-2 items-start p-3 rounded">
              <div className="font-semibold text-sm mb-2">Stopping Points</div>
              <div className="text-sm text-right">
                {data.stoppingPoints.map((s, i) => (
                  <div key={i}>{s}</div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 items-start p-3 rounded bg-gray-50">
              <div className="font-semibold text-sm mb-2">Cities near Destination</div>
              <div className="text-sm text-right">
                {data.nearbyCities.map((c, i) => (
                  <div key={i}>{c}</div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 items-center p-3 rounded">
              <div className="font-semibold text-sm">Rent a Car</div>
              <div className="text-right">
                <a
                  href={`https://www.google.com/search?q=rent+a+car+in+${encodeURIComponent(displayTo.name || "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#ffdd00] hover:bg-[#00205b] text-[#00205b] hover:text-[#ffdd00] px-4 py-2 rounded-md inline-block shadow"
                >
                  SEARCH
                </a>
              </div>
            </div>

            <div className="text-right">
              <a
                href={`https://www.google.com/maps/dir/${encodeURIComponent(displayFrom.name || "")}/${encodeURIComponent(displayTo.name || "")}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-sm"
              >
                View Map
              </a>
            </div>
          </div>
        </div>
        )}
      </div>
      {/* Details panel */}
      {expandedRow && (
        <div className="max-w-7xl mx-auto mt-6 px-4">
          <div className="bg-white rounded-xl p-4 shadow">
            <div className="flex justify-between items-center mb-2">
              <div className="font-semibold">Details: {expandedRow.replace(/-/g, ' ')}</div>
              <button onClick={() => setExpandedRow(null)} className="text-sm text-gray-600">Close</button>
            </div>
            <div className="text-sm text-gray-700">
              {expandedRow === 'flight-distance' && (
                <div>Straight-line distance: {data.km} km ({data.miles} miles). This is great-circle distance estimated by Haversine formula.</div>
              )}
              {expandedRow === 'flight-time' && (
                <div>Estimated flight time: {formatHoursMinutes(data.flightHours)} (including average cruising speed estimate).</div>
              )}
              {expandedRow === 'airports' && (
                <div>{data.airports || 'No nearby airport data available.'}</div>
              )}
              {expandedRow === 'direct-flights' && (
                <div>Example carrier: Air India Express. Use the SEARCH button to find real flights.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
