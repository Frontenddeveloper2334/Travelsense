import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ClosestAirportResult from "./components/ClosestAirportResult";

export default function ClosestAirportResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // If user lands here without state, redirect back to the form
  if (!state || !state.result) {
    navigate("/closest-airport", { replace: true });
    return null;
  }

  const { result, query } = state;

  const handleSearch = () => {
    // simple passthrough to allow search from the result page
    alert(`Searching near ${query}`);
  };

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto py-12 px-6">
        <ClosestAirportResult result={result} query={query} handleSearch={handleSearch} />
      </div>
      <Footer />
    </>
  );
}
