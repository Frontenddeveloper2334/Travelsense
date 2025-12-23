import React from "react";

export default function DrivingTimeResult({
  from,
  to,
  fromLocation,
  toLocation,
  result,
  departDate,
  returnDate,
  handleSearch,
  handleSubmit,
}) {
  if (!result) return null;
  const hours = Math.floor(result.hours);
  const minutes = Math.round((result.hours % 1) * 60);

  const fromName = fromLocation?.name || from;
  const toName = toLocation?.name || to;

  const mapLink = (lat, lon) => `https://www.google.com/maps?q=${lat},${lon}`;

  return (
    <div className="mt-10">
      <div className="max-w-6xl mx-auto bg-white rounded-lg p-8 shadow-md">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div>
            <div className="text-sm text-gray-500">Driving time</div>
            <div className="mt-2 text-2xl font-semibold text-[#00205b]">{fromName} <span className="text-yellow-400">→</span> {toName}</div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-[#fff7cc] text-[#00205b] rounded-full text-sm">{(fromName||'').split(',')[0]}</span>
              <span className="px-3 py-1 bg-[#fff7cc] text-[#00205b] rounded-full text-sm">{(toName||'').split(',')[0]}</span>
            </div>
          </div>
          <div className="text-center md:text-right">
            <div className="text-xs text-gray-500">Distance</div>
            <div className="text-lg font-semibold">{Number(result.km).toFixed(0)} km</div>
          </div>
        </div>

        <div className="mt-6 flex flex-col md:flex-row items-stretch gap-6">
          <div className="flex-1 bg-[#f9fafb] rounded-lg p-8 flex flex-col items-center justify-center">
              <div className="text-sm text-gray-600">Estimated driving duration</div>
              <div className="mt-4 text-7xl font-extrabold text-[#00205b] leading-none flex items-baseline gap-3">
                <span className="text-7xl">{hours}</span>
                <span className="text-2xl text-gray-700 font-medium">hours</span>
                <span className="ml-4 text-5xl">{minutes}</span>
                <span className="text-lg text-gray-700 font-medium">minutes</span>
              </div>
              <div className="mt-3 text-sm text-gray-600">Distance: <span className="font-medium text-gray-800">{result.km} km</span></div>

            <div className="mt-6 flex gap-3">
              <a
                href={fromLocation?.latitude && fromLocation?.longitude ? mapLink(fromLocation.latitude ?? fromLocation.lat, fromLocation.longitude ?? fromLocation.lon) : '#'}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-[#ffdd00] text-[#00205b] px-4 py-2 rounded font-semibold hover:bg-[#00205b] hover:text-[#ffdd00] transition"
              >
                View on map
              </a>
              <button onClick={handleSearch} className="inline-block bg-[#ffdd00] text-[#00205b] px-4 py-2 rounded font-semibold hover:bg-[#00205b] hover:text-[#ffdd00] transition">SEARCH</button>
            </div>
          </div>

          <div className="w-full md:w-96 bg-white rounded-lg p-6 flex flex-col justify-between">
            <div>
              <div className="text-xs text-gray-500">From</div>
              <div className="text-lg font-medium text-gray-800">{fromName}</div>
              {fromLocation?.latitude && (
                <a className="text-sm text-blue-600 underline" href={mapLink(fromLocation.latitude ?? fromLocation.lat, fromLocation.longitude ?? fromLocation.lon)} target="_blank" rel="noreferrer">Open origin in maps</a>
              )}

              <div className="mt-4">
                <div className="text-xs text-gray-500">To</div>
                <div className="text-lg font-medium text-gray-800">{toName}</div>
                {toLocation?.latitude && (
                  <a className="text-sm text-blue-600 underline" href={mapLink(toLocation.latitude ?? toLocation.lat, toLocation.longitude ?? toLocation.lon)} target="_blank" rel="noreferrer">Open destination in maps</a>
                )}
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <div>Depart: <span className="text-gray-800">{departDate}</span></div>
                <div className="mt-1">Return: <span className="text-gray-800">{returnDate}</span></div>
              </div>
            </div>

            <div className="mt-6">
              <button onClick={handleSubmit} className="w-full bg-[#00205b] text-white py-2 rounded font-semibold">CALCULATE</button>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-6 px-2">
        <article className="prose prose-lg text-gray-700 bg-white rounded-lg p-6">
          {(() => {
            const kmNum = Number(result.km) || 0;
            const miles = (kmNum * 0.621371).toFixed(0);
            const assumedSpeedKmh = 100; // typical driving speed
            const driveHoursAssumed = kmNum / assumedSpeedKmh;
            const driveHoursRounded = Math.floor(driveHoursAssumed);
            const driveMinutes = Math.round((driveHoursAssumed % 1) * 60);

            return (
              <div>
                <h3 className="text-xl font-semibold text-[#00205b]">Driving time from {fromName} to {toName}</h3>
                <p>
                  The estimated driving duration from {fromName} to {toName} is <strong>{hours} hour{hours !== 1 ? 's' : ''}, {minutes} minute{minutes !== 1 ? 's' : ''}</strong>.
                </p>

                <p>
                  This uses a typical long-distance driving speed assumption of <strong>100 km/h</strong>. Actual times depend on road type, traffic, stops, and route chosen.
                </p>

                <p>
                  Straight-line distance between points is about <strong>{miles} miles</strong> ({kmNum.toFixed(0)} kilometers).
                </p>

                <p className="text-sm text-gray-600 mt-2">The calculation uses the great-circle distance and provides an approximate driving-time estimate.</p>
              </div>
            );
          })()}
        </article>
      </div>
    </div>
  );
}

// helper: compute initial bearing from point A to B
function computeBearing(lat1, lon1, lat2, lon2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const toDeg = (rad) => (rad * 180) / Math.PI;

  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δλ = toRad(lon2 - lon1);

  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  let θ = Math.atan2(y, x);
  θ = toDeg(θ); // in degrees from north
  // Normalize to 0-360
  const bearing = (θ + 360) % 360;
  // Convert to -180..180 for signed representation
  const signed = bearing > 180 ? bearing - 360 : bearing;
  return { bearing, signed };
}

function approxCardinal(deg) {
  // deg: 0..360
  const dirs = ['N','NE','E','SE','S','SW','W','NW','N'];
  const ix = Math.round(deg / 45);
  return dirs[ix];
}

