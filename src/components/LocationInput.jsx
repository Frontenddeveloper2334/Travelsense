import React, { useState, useEffect, useRef } from 'react';
import { getLocationSuggestions } from '../services/LocationService';

export default function LocationInput({ 
  placeholder, 
  value, 
  onChange, 
  onSelectLocation 
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (value.length > 1) {
        setLoading(true);
        const results = await getLocationSuggestions(value);
        console.log('Location suggestions:', results);
        setSuggestions(results);
        setShowSuggestions(true);
        setLoading(false);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);

  // ✅ Outside click detect करने के लिए
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLocation = (location) => {
    onChange(location.name);
    onSelectLocation(location);
    setShowSuggestions(false);  // ✅ बस यह एक line
    setSuggestions([]);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => value.length > 1 && suggestions.length > 0 && setShowSuggestions(true)}
        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-50">
          {loading ? (
            <div className="p-3 text-gray-500 text-center">Loading...</div>
          ) : (
            <ul className="max-h-64 overflow-y-auto">
              {suggestions.map((location) => (
                <li
                  key={location.id}
                  onClick={() => handleSelectLocation(location)}
                  className="p-3 hover:bg-yellow-100 cursor-pointer border-b last:border-b-0 transition"
                >
                  <div className="font-semibold text-[#00205b]">
                    {location.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {location.admin1 && `${location.admin1}, `}
                    {location.country}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}