import React, { useState } from "react";

function FlyingBanner() {
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
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {/* LEFT SIDE - Blue Section */}
      <div className="relative bg-[#00205b] flex flex-col justify-center px-10 py-16 text-white">
        <div className="absolute left-40 top-25">
          <h1 className="w-full text-3xl md:text-4xl font-bold leading-tight">
            <span className="bg-[#ffdd00] text-[#00205b] px-3 py-1 leading-[1.5]">
              Plan Your Perfect Road Trip
            </span>
          </h1>

          <p className="text-base md:text-lg max-w-sm pt-5 leading-relaxed">
            Calculate distance, cost, and time between any two places. Discover
            halfway points, nearby cities, and more — all in one tool.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Image + Overlay + Form */}
      <div
        className="relative flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/Image/drivingbanner.jpg')" }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Form */}
        <div className="relative z-10 max-w-md w-full mx-4 my-14 bg-white/90 backdrop-blur-md shadow-2xl p-6 sm:p-8">
          <h1 className="text-2xl font-medium mb-6 text-left">
            <span className="text-[#00205b] pr-1">Flying</span>
            <span className="text-yellow-400 font-bold">Calculator</span>
          </h1>

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
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#00205b]"
              >
                <option value="airline-serving">Airlines serving</option>
                <option value="flight-time">Flight time</option>
                <option value="closest-airport">Closest airport</option>
                <option value="drive-distance">distance</option>
                <option value="direct-flight">Direct flight</option>
                <option value="fly-or-drive">Fly or drive</option>
                <option value="cities-near">major cities</option>
                <option value="lat-long">latitude/longitude</option>
              </select>
            </div>

            {/* ---------- CONDITIONAL INPUT FIELDS ---------- */}
            {formData.path === "cities-near" ? (
              /* Only one field when "major cities" selected */
              <div>
                <label
                  htmlFor="from"
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  near/in:
                </label>
                <input
                  id="from"
                  name="from"
                  type="text"
                  value={formData.from}
                  onChange={handleChange}
                  placeholder="Enter location"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 outline-none"
                />
              </div>
            ) : (
              /* Default: From + To fields */
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
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 outline-none"
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
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 outline-none"
                  />
                </div>
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              className="bg-[#ffdd00] text-[#00205b] font-semibold px-8 py-3 rounded-md w-full text-lg transition-all duration-300 border-2 border-transparent hover:border-[#ffdd00] hover:bg-[#00205b] hover:text-[#ffdd00]"
            >
              CALCULATE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FlyingBanner;
