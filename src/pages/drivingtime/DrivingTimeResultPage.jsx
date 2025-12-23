import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DrivingTimeResult from "./components/DrivingTimeResult";

export default function DrivingTimeResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.result) {
    navigate("/driving-time", { replace: true });
    return null;
  }

  const { result } = state;

  const handleSearch = () => {
    alert(`Searching near ${result.from || ''}`);
  };

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto py-12 px-6">
        <DrivingTimeResult
          from={result.from}
          to={result.to}
          fromLocation={result.fromLocation}
          toLocation={result.toLocation}
          result={result}
          departDate={result.departDate}
          returnDate={result.returnDate}
          handleSearch={handleSearch}
        />
      </div>
      <Footer />
    </>
  );
}
