import { useState } from "react";

export const TravelTool = ({
  firstButtonName,
  secondButtonName,
  thirdButtonName,
  fourthButtonName,
  fifthButtonName,
  sixButtonName,
  sevenButtonName,
  eightButtonName,
  nineButtonName,
  cardTitle,
  imageSrc
}) => {
  const [selected, setSelected] = useState("100");
  return (
    <div className="w-full bg-[#f1f2f3] pb-20 pt-10 overflow-hidden">
      {/* ✅ CONTENT FLEX */}
      <div className="relative w-full max-w-7xl mx-auto px-4 md:px-8 my-10 grid grid-cols-1 md:grid-cols-2 gap-10 py-6">
        {/* ✅ RIGHT IMAGE (BIG + BEHIND) */}
        <div className="order-2 md:order-1 flex justify-center md:justify-end max-h[600px]">
          <div className="relative w-full max-w-2xl md:max-w-3xl">
            <img src={imageSrc} alt="Child" className="w-full h-[700px] object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* ✅ LEFT CARD (OVERLAPPING) */}
        <div className="order-1 md:order-2">
          <div className="bg-white shadow-xl p-6 md:p-10 max-w-xl relative z-10 md:-ml-24 md:mt-16">
            <span class="text-3xl font-bold text-[#05296B]">{cardTitle}</span>
            <span class="block h-2 w-32 bg-[#fae110] mt-2 mb-6"></span>

            {/* ✅ AMOUNT OPTIONS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Flight Time */}
              {firstButtonName && (
                <div
                  onClick={() => setSelected("flight-time")}
                  className={`border rounded cursor-pointer transition ${
                    selected === "flight-time"
                      ? "ring-2 ring-[#05296B] bg-[#05296B] text-white"
                      : "bg-white"
                  }`}
                >
                  <p className="p-4 text-md font-semibold leading-relaxed">
                    {firstButtonName}
                  </p>
                </div>
              )}

              {/* Closest Airport */}
              {secondButtonName && (
                <div
                  onClick={() => setSelected("closest-airport")}
                  className={`border rounded cursor-pointer transition ${
                    selected === "closest-airport"
                      ? "ring-2 ring-[#05296B] bg-[#05296B] text-white"
                      : "bg-white"
                  }`}
                >
                  <p className="p-4 text-md font-semibold leading-relaxed">
                    {secondButtonName}
                  </p>
                </div>
              )}

              {/* Driving Time */}
              {thirdButtonName && (
                <div
                  onClick={() => setSelected("driving-time")}
                  className={`border rounded cursor-pointer transition ${
                    selected === "driving-time"
                      ? "ring-2 ring-[#05296B] bg-[#05296B] text-white"
                      : "bg-white"
                  }`}
                >
                  <p className="p-4 text-md font-semibold leading-relaxed">
                    {thirdButtonName}
                  </p>
                </div>
              )}

              {/* Driving Distance */}
              {fourthButtonName && (
                <div
                  onClick={() => setSelected("driving-distance")}
                  className={`border rounded cursor-pointer transition ${
                    selected === "driving-distance"
                      ? "ring-2 ring-[#05296B] bg-[#05296B] text-white"
                      : "bg-white"
                  }`}
                >
                  <p className="p-4 text-md font-semibold leading-relaxed">
                    {fourthButtonName}
                  </p>
                </div>
              )}

              {/* Cities Nearby */}
              {fifthButtonName && (
                <div
                  onClick={() => setSelected("cities-nearby")}
                  className={`border rounded cursor-pointer transition ${
                    selected === "cities-nearby"
                      ? "ring-2 ring-[#05296B] bg-[#05296B] text-white"
                      : "bg-white"
                  }`}
                >
                  <p className="p-4 text-md font-semibold leading-relaxed">
                    {fifthButtonName}
                  </p>
                </div>
              )}

              {/* Halfway Point */}
              {sixButtonName && (
                <div
                  onClick={() => setSelected("halfway-point")}
                  className={`border rounded cursor-pointer transition ${
                    selected === "halfway-point"
                      ? "ring-2 ring-[#05296B] bg-[#05296B] text-white"
                      : "bg-white"
                  }`}
                >
                  <p className="p-4 text-md font-semibold leading-relaxed">
                    {sixButtonName}
                  </p>
                </div>
              )}

              {/* Time Difference */}
              {sevenButtonName && (
                <div
                  onClick={() => setSelected("time-difference")}
                  className={`border rounded cursor-pointer transition ${
                    selected === "time-difference"
                      ? "ring-2 ring-[#05296B] bg-[#05296B] text-white"
                      : "bg-white"
                  }`}
                >
                  <p className="p-4 text-md font-semibold leading-relaxed">
                    {sevenButtonName}
                  </p>
                </div>
              )}

              {/* Cost of Driving */}
              {eightButtonName && (
                <div
                  onClick={() => setSelected("cost-driving")}
                  className={`border rounded cursor-pointer transition ${
                    selected === "cost-driving"
                      ? "ring-2 ring-[#05296B] bg-[#05296B] text-white"
                      : "bg-white"
                  }`}
                >
                  <p className="p-4 text-md font-semibold leading-relaxed">
                    {eightButtonName}
                  </p>
                </div>
              )}

              {/* Stopping Points */}
              {nineButtonName && (
                <div
                  onClick={() => setSelected("stopping-points")}
                  className={`border rounded cursor-pointer transition ${
                    selected === "stopping-points"
                      ? "ring-2 ring-[#05296B] bg-[#05296B] text-white"
                      : "bg-white"
                  }`}
                >
                  <p className="p-4 text-md font-semibold leading-relaxed">
                    {nineButtonName}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
