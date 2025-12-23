import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCar,
  FaRoad,
  FaPlane,
  FaClock,
  FaCreditCard,
  FaGlobe,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const menuItems = [
  {
    title: "Driving",
    icon: <FaCar />,
    path: "/driving", // ✅ This links to DrivingPage
    links: [
      { name: "Driving Distance", href: "/driving-distance" },
      { name: "Driving Time", href: "/driving-time" },
      { name: "Cost of Driving", href: "/cost-of-driving" },
    ],
  },
  {
    title: "Distance",
    icon: <FaRoad />,
    path: "/distance",
    links: [
      { name: "Cities Nearby", href: "/cities-near" },
      { name: "Halfway Point", href: "/halfway" },
      { name: "Stopping Points", href: "/stopping-points" },
      { name: "Driving Distance", href: "/driving-distance" },
    ],
  },
  {
    title: "Flying",
    icon: <FaPlane />,
    path: "/flying",
    links: [
      { name: "Flight Time", href: "/flying-time" },
      { name: "Closest Airport", href: "/nearest-airport" },
      { name: "Direct Flights", href: "/nonstop-flight" },
      { name: "Major Airlines", href: "/airlines-serving" },
    ],
  },
  {
    title: "Time",
    icon: <FaClock />,
    path: "/time",
    links: [
      { name: "Time Difference", href: "/time-change" },
      { name: "Driving Time", href: "/driving-time" },
      { name: "Flight Time", href: "/flying-time" },
    ],
  },
  {
    title: "Cost",
    icon: <FaCreditCard />,
    path: "/cost",
    links: [
      { name: "Cost of Driving", href: "/cost-of-driving" },
      { name: "Fly or Drive", href: "/fly-or-drive" },
      { name: "Currency", href: "/currency" },
    ],
  },
  {
    title: "Places",
    icon: <FaGlobe />,
    path: "/places",
    links: [
      { name: "Cities", href: "/cities" },
      { name: "Airports", href: "/airport" },
      { name: "Hotels", href: "/hotels-near" },
    ],
  },
];

export default function Header() {
  const [active, setActive] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative w-full text-[#00205b] bg-white shadow">
      <div className="mx-auto max-w-7xl font-extrabold flex items-center justify-end px-8 relative">
        {/* ✅ Logo links to homepage */}
        <Link
          to="/"
          className="absolute top-0 left-9 flex items-center gap-2 text-xl font-bold text-white z-10"
        >
          <img
            src="/Image/logo.png"
            alt="TravelSense Logo"
            className="hidden lg:block w-40 shadow-lg object-contain"
          />
        </Link>

        {/* Hamburger (Mobile) */}
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center justify-center gap-6 relative">
          {menuItems.map((menu, i) => (
            <div
              key={i}
              className="relative group"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              {/* ✅ Make “Driving” a clickable Link */}
              {menu.path ? (
                <Link
                  to={menu.path}
                  className="flex items-center gap-2 px-3 py-3 hover:bg-yellow-300 transition"
                >
                  {menu.icon}
                  <span className="uppercase text-sm font-semibold">
                    {menu.title}
                  </span>
                </Link>
              ) : (
                <button className="flex items-center gap-2 px-3 py-3 hover:bg-yellow-300 transition">
                  {menu.icon}
                  <span className="uppercase text-sm font-semibold">
                    {menu.title}
                  </span>
                </button>
              )}

              {/* Dropdown */}
              {active === i && (
                <div className="absolute left-0 top-full mt-1 font-semibold bg-white text-gray-800 rounded-lg shadow-lg min-w-[180px] overflow-hidden animate-fadeIn z-50">
                  {menu.links.map((link, j) => (
                    <Link
                      key={j}
                      to={link.href}
                      className="block px-4 py-3 hover:bg-blue-100 border-b border-gray-100 last:border-none text-sm"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden py-3 px-4 space-y-4 animate-fadeIn">
          {menuItems.map((menu, i) => (
            <div key={i}>
              {/* ✅ Driving main link in mobile */}
              {menu.path ? (
                <Link
                  to={menu.path}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 font-bold text-black mb-1"
                >
                  {menu.icon} {menu.title}
                </Link>
              ) : (
                <p
                  className="flex items-center gap-2 font-bold text-black mb-1 cursor-pointer"
                  onClick={() => setActive(active === i ? null : i)}
                >
                  {menu.icon} {menu.title}
                </p>
              )}

              {/* Sub-links in mobile */}
              {active === i && (
                <div className="pl-6 space-y-1">
                  {menu.links.map((link, j) => (
                    <Link
                      key={j}
                      to={link.href}
                      className="block text-sm text-gray-700 hover:text-yellow-500"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
