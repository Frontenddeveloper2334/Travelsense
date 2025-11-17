import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  calculateDistance, 
  calculateDrivingTime, 
  calculateFlightTime,
  getTimezoneDifference 
} from '../services/locationService';

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
      let resultData = {
        type: calculationType,
        from,
        to
      };

      try {
        if (calculationType === 'distance' && from && to) {
          const distance = calculateDistance(
            from.latitude,
            from.longitude,
            to.latitude,
            to.longitude
          );
          resultData.distance = distance.toFixed(2);
          resultData.message = `Distance between ${from.name} and ${to.name}`;
        }

        if (calculationType === 'flying-time' && from && to) {
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

        if (calculationType === 'driving-time' && from && to) {
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

        if (calculationType === 'time-change' && from && to) {
          const tzData = await getTimezoneDifference(
            from.latitude,
            from.longitude,
            to.latitude,
            to.longitude
          );
          resultData.timezone = tzData;
          resultData.message = `Time difference between ${from.name} and ${to.name}`;
        }

        if (calculationType === 'lat-long' && state.location) {
          resultData.latitude = state.location.latitude;
          resultData.longitude = state.location.longitude;
          resultData.message = `Coordinates for ${state.location.name}`;
        }

        if (calculationType === 'halfway' && from && to) {
          const midLat = (from.latitude + to.latitude) / 2;
          const midLon = (from.longitude + to.longitude) / 2;
          resultData.midLatitude = midLat.toFixed(4);
          resultData.midLongitude = midLon.toFixed(4);
          resultData.message = `Halfway point between ${from.name} and ${to.name}`;
        }

        setResults(resultData);
      } catch (error) {
        console.error('Error calculating results:', error);
        setResults({ error: 'Error calculating results' });
      }
      setLoading(false);
    };

    if (calculationType) {
      calculateResults();
    }
  }, [calculationType, from, to]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-[#00205b] font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-8 bg-[#00205b] text-white px-6 py-2 rounded-lg hover:bg-blue-900 transition"
        >
          ← Back to Calculator
        </button>

        <div className="bg-white rounded-lg shadow-2xl p-8">
          {results?.error ? (
            <div className="text-red-600 text-lg">{results.error}</div>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-[#00205b] mb-6">
                {results?.message}
              </h1>

              <div className="space-y-6">
                {/* Location Info */}
                {results?.from && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-[#00205b] mb-2">From</h3>
                    <p className="text-lg">{results.from.name}</p>
                    <p className="text-sm text-gray-600">
                      {results.from.country} • 
                      {results.from.latitude.toFixed(4)}, {results.from.longitude.toFixed(4)}
                    </p>
                  </div>
                )}

                {results?.to && (
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-[#00205b] mb-2">To</h3>
                    <p className="text-lg">{results.to.name}</p>
                    <p className="text-sm text-gray-600">
                      {results.to.country} • 
                      {results.to.latitude.toFixed(4)}, {results.to.longitude.toFixed(4)}
                    </p>
                  </div>
                )}

                {/* Distance */}
                {results?.distance && (
                  <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-400">
                    <h3 className="font-semibold text-[#00205b] mb-2">Distance</h3>
                    <p className="text-3xl font-bold text-yellow-600">
                      {results.distance} km
                    </p>
                  </div>
                )}

                {/* Flight Time */}
                {results?.flightTime && (
                  <div className="bg-green-50 p-4 rounded-lg border-2 border-green-400">
                    <h3 className="font-semibold text-[#00205b] mb-2">Flight Time</h3>
                    <p className="text-2xl font-bold text-green-600">
                      {results.flightTime} hours
                    </p>
                  </div>
                )}

                {/* Driving Time */}
                {results?.drivingTime && (
                  <div className="bg-green-50 p-4 rounded-lg border-2 border-green-400">
                    <h3 className="font-semibold text-[#00205b] mb-2">Driving Time</h3>
                    <p className="text-2xl font-bold text-green-600">
                      {results.drivingTime} hours
                    </p>
                  </div>
                )}

                {/* Timezone */}
                {results?.timezone && (
                  <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-400">
                    <h3 className="font-semibold text-[#00205b] mb-2">Timezone Difference</h3>
                    <p className="text-lg">{results.timezone.from_tz}</p>
                    <p className="text-lg">{results.timezone.to_tz}</p>
                  </div>
                )}

                {/* Coordinates */}
                {results?.latitude && (
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-[#00205b] mb-2">Coordinates</h3>
                    <p className="text-lg">Latitude: {results.latitude}°</p>
                    <p className="text-lg">Longitude: {results.longitude}°</p>
                  </div>
                )}

                {/* Halfway Point */}
                {results?.midLatitude && (
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-[#00205b] mb-2">Halfway Point</h3>
                    <p className="text-lg">Latitude: {results.midLatitude}°</p>
                    <p className="text-lg">Longitude: {results.midLongitude}°</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}