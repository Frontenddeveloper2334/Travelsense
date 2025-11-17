import React from 'react'

function DistanceContent() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-8 my-16">
  {/* Use grid only for layout if needed, but keep all text in one column */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    
    {/* LEFT COLUMN (Text Section) */}
    <div>
      <h2 className="text-4xl font-semibold text-[#002060] mb-4">
        Distance Calculator
      </h2>

      {/* Yellow underline */}
      <div className="w-20 h-1 bg-yellow-400 mb-6"></div>

      {/* Paragraphs */}
      <p className="leading-relaxed text-gray-700 mb-4">
        Travelsense provides driving information to help you plan a road trip.
        You can measure the{" "}
        <a
          href="#driving-distance"
          className="text-blue-700 font-semibold hover:underline"
        >
          driving distance
        </a>{" "}
        between two cities based on actual turn-by-turn directions. Or figure
        out the{" "}
        <a
          href="#driving-time"
          className="text-blue-700 font-semibold hover:underline"
        >
          driving time
        </a>{" "}
        to see if you need to stop overnight at a{" "}
        <a
          href="#hotel"
          className="text-blue-700 font-semibold hover:underline"
        >
          hotel
        </a>{" "}
        or if you can drive straight through. To stay within your budget, make
        sure you calculate the{" "}
        <a
          href="#cost-of-driving"
          className="text-blue-700 font-semibold hover:underline"
        >
          cost of driving
        </a>{" "}
        based on your car's gas mileage. If you're meeting a friend in the
        middle, you can find the{" "}
        <a
          href="#halfway-point"
          className="text-blue-700 font-semibold hover:underline"
        >
          halfway point
        </a>{" "}
        between cities. If you're driving cross-country, find the best{" "}
        <a
          href="#stopping-points"
          className="text-blue-700 font-semibold hover:underline"
        >
          stopping points
        </a>{" "}
        for your road trip.
      </p>

      <p className="leading-relaxed text-gray-700">
        You can look for{" "}
        <a
          href="#cities-near"
          className="text-blue-700 font-semibold hover:underline"
        >
          cities near any location
        </a>{" "}
        including airports, landmarks, and other cities. If you have a
        particular distance or travel time, you can search for{" "}
        <a
          href="#cities-within-radius"
          className="text-blue-700 font-semibold hover:underline"
        >
          cities within a radius
        </a>
        .
      </p>
    </div>

    {/* RIGHT COLUMN (Optional Image or Illustration) */}
    <div className="hidden md:flex justify-center">
      <img
        src="/Image/driving-info.jpg"
        alt="Driving Information"
        className="rounded-2xl shadow-lg object-cover max-h-[400px]"
      />
    </div>
  </div>
</section>
  )
}

export default DistanceContent