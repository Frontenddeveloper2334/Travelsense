import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FlightsResult from "./homepage/components/FlightsResult";

export default function FlightResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};
  const { from, to } = state;

  if (!from || !to) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-lg text-[#00205b]">No locations provided. Use the Quick Calculator to search.</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto py-8 px-4">
        <FlightsResult from={from} to={to} />
      </main>
      <Footer />
    </>
  );
}
