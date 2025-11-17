export const getLocationSuggestions = async (query) => {
  if (!query || query.length < 2) return [];
  
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=10&language=en&format=json`
    );
    const data = await response.json();
    
    return data.results?.map(location => ({
      name: location.name,
      country: location.country,
      latitude: location.latitude,
      longitude: location.longitude,
      admin1: location.admin1 || '',
      id: `${location.latitude}-${location.longitude}`
    })) || [];
  } catch (error) {
    console.error('Error fetching locations:', error);
    return [];
  }
};

// Haversine formula for distance
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Calculate driving time (approx 100km/hour)
export const calculateDrivingTime = (distance) => {
  const hours = Math.round(distance / 100);
  return hours;
};

// Calculate flight time (approx 900km/hour)
export const calculateFlightTime = (distance) => {
  const hours = (distance / 900).toFixed(1);
  return parseFloat(hours);
};

// Get timezone difference
export const getTimezoneDifference = async (lat1, lon1, lat2, lon2) => {
  try {
    const res1 = await fetch(
      `https://timeapi.io/api/timezone/coordinate?latitude=${lat1}&longitude=${lon1}`
    );
    const res2 = await fetch(
      `https://timeapi.io/api/timezone/coordinate?latitude=${lat2}&longitude=${lon2}`
    );
    
    const tz1 = await res1.json();
    const tz2 = await res2.json();
    
    return {
      from_tz: tz1.timezone,
      to_tz: tz2.timezone,
      difference: tz1.standardUtcOffset.seconds - tz2.standardUtcOffset.seconds
    };
  } catch (error) {
    return null;
  }
};