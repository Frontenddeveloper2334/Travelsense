import React, { useState, useEffect } from "react";

export default function Banner() {
  const [path, setPath] = useState("from");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // ✅ SINGLE INPUT WALA OPTIONS
  const singleInputOptions = [
    "nearest-airport",
    "cities-near",
    "airlines-serving",
    "hotels-near",
    "lat-long",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (singleInputOptions.includes(path)) {
      if (!from) return alert("Please enter the location!");
      return alert(`You selected:\nPath: ${path}\nLocation: ${from}`);
    }

    if (!from || !to) {
      alert("Please enter both 'From' and 'To' locations!");
      return;
    }

    alert(`You selected:\nPath: ${path}\nFrom: ${from}\nTo: ${to}`);
  };

  const description =
    "We are a leading provider of personalized travel services, technology, and resources for modern explorers.";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.adthrive.com/sites/YOUR_SITE_ID/ads.min.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="main">
      {/* ✅ Banner Section */}
      <section
        className="relative flex flex-col lg:flex-row py-16 items-stretch justify-between min-h-[90vh] bg-cover bg-center"
        style={{
          backgroundImage: "url('/Image/banner.jpg')",
        }}
      >
        {/* ✅ Left Text Section */}
        <div className="relative w-full lg:w-[45%] bg-[#00205b] text-white flex flex-col justify-center">
          <div className="max-w-xxl w-full absolute top-30 left-40 space-y-5">
            <h1 className="w-full text-3xl md:text-5xl font-bold leading-tight">
              <span className="bg-[#ffdd00] text-[#00205b] px-3 py-1 leading-[1.5]">
                Travel Sense: Where You Want To Explore
              </span>
            </h1>
            <p className="text-base md:text-lg max-w-sm leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {/* ✅ Right Form Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-10">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white p-8 shadow-xl space-y-6"
          >
            <select
              value={path}
              onChange={(e) => setPath(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#00205b]"
            >
              <option value="from">All calculations</option>
              <option value="distance">Distance</option>
              <option value="flying-time">Flight time</option>
              <option value="driving-time">Driving time</option>
              <option value="nearest-airport">Closest airport</option>
              <option value="cost-of-driving">Cost of driving</option>
              <option value="halfway">Halfway point</option>
              <option value="time-change">Time difference</option>
              <option value="cities-near">Cities near</option>
              <option value="stopping-points">Stopping points</option>
              <option value="fly-or-drive">Fly or drive</option>
              <option value="nonstop-flight">Direct flights</option>
              <option value="airlines-serving">Airlines serving</option>
              <option value="hotels-near">Hotels in the area</option>
              <option value="currency">Currency converter</option>
              <option value="lat-long">Latitude/Longitude</option>
            </select>

            {/* ✅ CONDITIONAL INPUTS */}
            {singleInputOptions.includes(path) ? (
              <input
                type="text"
                placeholder="Enter location"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-[#00205b]"
              />
            ) : (
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="From"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-[#00205b]"
                />
                <input
                  type="text"
                  placeholder="To"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-[#00205b]"
                />
              </div>
            )}

            <button
              type="submit"
              className="bg-[#ffdd00] text-[#00205b] font-semibold px-8 py-3 rounded-md w-full text-lg transition-all duration-300 border-2 border-transparent hover:border-[#ffdd00] hover:bg-[#00205b] hover:text-[#ffdd00]"
            >
              GO
            </button>
          </form>
        </div>
      </section>

      {/* ✅ BANNER BOTTOM AD */}
      <div className="w-full flex justify-center my-10">
        <div
          className="at-content-ad flex items-center justify-center"
          style={{ width: "728px", minHeight: "90px" }}
        >
          <div
            id="AdThrive_Banner_Bottom"
            className="adthrive-ad adthrive-banner adthrive-banner-bottom adthrive-ad-cls w-full h-full"
          ></div>
        </div>
      </div>

      {/* ✅ CONTENT + ADS */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 my-16">
        {/* ✅ 2 Column Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* ✅ LEFT CONTENT */}
          <div>
            {/* Who uses Travelsense */}
            <div className="mb-12">
              <h3 className="text-4xl font-semibold text-[#00205b] mb-3 relative inline-block">
                Who uses Travelsense?
                <span className="block h-2 w-32 bg-[#fae110] mt-2"></span>
              </h3>

              <p className="text-gray-700 leading-relaxed">
                Leading global airlines like United Airlines, Southwest
                Airlines, and Ryanair trust Travelsense for advanced route
                optimization, seamless passenger re-routing, and smarter
                planning of future flight operations.
              </p>
            </div>

            {/* Celebrities */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-[#00205b] mb-6">
                Celebrities love Travelsense!
              </h3>

              {/* ✅ Left Small Ad Converted to Real Ad */}
              <div className="flex items-start gap-5 mb-8">
                <p className="text-gray-700 leading-relaxed">
                  <i>
                    “Travelsense is the one app I couldn’t live without…{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                      Whoever invented Travelsense, I love you!
                    </a>
                    ”
                  </i>
                  <br />– Drew Barrymore
                </p>
              </div>

              <p className="text-gray-700 leading-relaxed">
                <i>
                  “There's a website called Travelsense,{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    it's really good if you're into flight times.
                  </a>
                  ”
                </i>{" "}
                – Blake Griffin
              </p>
            </div>

            {/* Dirtiest Public Transit */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-[#00205b] mb-3">
                Dirtiest Public Transit
              </h3>
              <p className="text-gray-700 leading-relaxed">
                See the research from our{" "}
                <a href="#" className="text-blue-600 underline">
                  Travelsense study
                </a>{" "}
                on public transportation hygiene.
                <a href="#" className="text-blue-600 underline ml-1">
                  Read the full study!
                </a>
              </p>
            </div>

            {/* Germiest Hotel Rooms */}
            <div className="mb-20">
              <h3 className="text-2xl font-semibold text-[#00205b] mb-3">
                Germiest Hotel Rooms
              </h3>
              <p className="text-gray-700 leading-relaxed">
                See more research from our{" "}
                <a href="#" className="text-blue-600 underline">
                  Travelsense study
                </a>{" "}
                on hotel hygiene.
                <a href="#" className="text-blue-600 underline ml-1">
                  Read the full study!
                </a>
              </p>
            </div>
          </div>

          {/* ✅ RIGHT COLUMN ADS */}
          <div className="flex flex-col gap-10">
            {/* ✅ Ad Slot 1 */}
            <div
              className="at-content-ad flex items-center justify-center overflow-hidden"
              style={{ width: "360px", minHeight: "300px" }}
            >
              <div
                id="AdThrive_Content_1_desktop"
                className="adthrive-ad adthrive-content adthrive-content-1 adthrive-ad-cls w-full h-full"
              ></div>
            </div>

            {/* ✅ Ad Slot 2 */}
            <div
              className="at-content-ad rounded flex items-center justify-center overflow-hidden"
              style={{ width: "360px", minHeight: "300px" }}
            >
              <div
                id="AdThrive_Content_2_desktop"
                className="adthrive-ad adthrive-content adthrive-content-2 adthrive-ad-cls w-full h-full"
              ></div>
            </div>

            {/* ✅ Ad Slot 3 */}
            <div
              className="at-content-ad flex items-center justify-center overflow-hidden"
              style={{ width: "360px", minHeight: "300px" }}
            >
              <div
                id="AdThrive_Content_3_desktop"
                className="adthrive-ad adthrive-content adthrive-content-3 adthrive-ad-cls w-full h-full"
              ></div>
            </div>
          </div>
        </div>
        {/* kkkkkkkkkkkkkkkkkkkk */}
        {/* ✅ LOWER SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          {/* ✅ Text */}
          <div>
            <h3 className="text-4xl font-semibold text-[#00205b] mb-3 relative inline-block">
              What is Travelsense?
              <span className="block h-2 w-32 bg-[#fae110] mt-2"></span>
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Travelsense is an online trip calculator that helps you find
              answers quickly. You can measure travel distance and travel time.
            </p>

            <p className="text-gray-700 leading-relaxed">
              Browse more info on flights, driving, airports, and more.
            </p>

            <h3 className="text-2xl font-semibold text-[#00205b] mt-12 mb-3">
              How do I search?
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Enter your starting point and destination above.
            </p>
            <p className="text-gray-700 leading-relaxed">
              You can also search by airport, city, country, or zip code.
            </p>
          </div>

          {/* ✅ Calculators */}
          <div className="space-y-10">
            {/* QUICK CALCULATOR */}
            <div className="border border-gray-300 rounded p-5">
              <h3 className="text-2xl font-semibold text-[#00205b] mb-4">
                Quick Calculator
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="font-semibold text-sm">From:</label>
                  <input
                    className="w-full border border-gray-300 p-2 rounded"
                    placeholder="Enter location"
                  />
                </div>

                <div>
                  <label className="font-semibold text-sm">To:</label>
                  <input
                    className="w-full border border-gray-300 p-2 rounded"
                    placeholder="Enter destination"
                  />
                </div>

                <button className="w-full bg-[#ffdd00] text-[#00205b] border-2 border-transparent hover:border-[#ffdd00] hover:bg-[#00205b] hover:text-[#ffdd00] font-semibold py-2 rounded">
                  CALCULATE
                </button>
              </div>
            </div>

            {/* CHECK PRICES */}
            <div className="border border-gray-300 rounded p-5">
              <h3 className="text-2xl font-semibold text-[#00205b] mb-4">
                Check Prices
              </h3>

              <div className="space-y-3">
                <input
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="City"
                />
                <input
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Check-in"
                />
                <input
                  className="w-full border border-gray-300 p-2 rounded"
                  placeholder="Check-out"
                />

                <select className="w-full border border-gray-300 p-2 rounded">
                  <option>Flight</option>
                  <option>Hotel</option>
                  <option>Rental Car</option>
                </select>

                <button className="w-full bg-[#ffdd00] text-[#00205b] border-2  border-transparent hover:border-[#ffdd00] hover:bg-[#00205b] hover:text-[#ffdd00] font-semibold py-2 rounded">
                  SEARCH
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ FULL WIDTH BOTTOM AD */}
      <div className="w-full flex justify-center my-20">
        <div
          className="at-content-ad  flex items-center justify-center"
          style={{ width: "100%", maxWidth: "970px", minHeight: "90px" }}
        >
          <div
            id="AdThrive_Footer_Ad"
            className="adthrive-ad adthrive-footer adthrive-ad-cls w-full h-full"
          ></div>
        </div>
      </div>
    </div>
  );
}
