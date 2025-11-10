import React, { useState } from "react";

export default function DrivingCalculator() {
  const [formData, setFormData] = useState({
    path: "drive-distance",
    from: "",
    to: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // redirect or calculate logic here
  };

  return (
    <div className="max-w-md mx-auto my-20 bg-white shadow-md p-6 sm:p-8">
      {/* Title */}
      <h1 className="text-2xl font-medium mb-6 text-left">
        <span className="text-[#00205b] pr-1">Driving</span>
        <span className="text-yellow-400 text-bold">Calculator</span>
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Dropdown */}
        <div>
          <label htmlFor="path" className="sr-only">
            Get:
          </label>
          <select
            id="path"
            name="path"
            value={formData.path}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-gray-700 outline-none"
          >
            <option value="drive-distance">driving distance</option>
            <option value="driving-time">driving time</option>
            <option value="cost-of-driving">cost of driving</option>
            <option value="halfway">halfway point</option>
            <option value="stopping-points">stopping points</option>
            <option value="fly-or-drive">fly or drive</option>
            <option value="cities-near">major cities</option>
            <option value="lat-long">latitude/longitude</option>
          </select>
        </div>

        {/* From & To fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="from"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              From:
            </label>
            <input
              id="from"
              name="from"
              type="text"
              value={formData.from}
              onChange={handleChange}
              placeholder="Enter starting point"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-gray-700 outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="to"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              To:
            </label>
            <input
              id="to"
              name="to"
              type="text"
              value={formData.to}
              onChange={handleChange}
              placeholder="Enter destination"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-gray-700 outline-none"
            />
          </div>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="bg-[#ffdd00] text-[#00205b] font-semibold px-8 py-3 rounded-md w-full text-lg transition-all duration-300 border-2 border-transparent hover:border-[#ffdd00] hover:bg-[#00205b] hover:text-[#ffdd00]"
        >
          CALCULATE
        </button>
      </form>
    </div>
  );
}
