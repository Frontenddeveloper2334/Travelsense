import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import FlyingTimeResult from "./components/FlyingTimeResult";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function FlyingTimeResultPage() {
  const { state } = useLocation();
  if (!state || !state.result) {
    return <Navigate to="/flying-time" replace />;
  }

  const { result, from, to, fromLocation, toLocation, departDate, returnDate } = state;

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto py-12 px-6 mt-4">
        <FlyingTimeResult
          from={from}
          to={to}
          fromLocation={fromLocation}
          toLocation={toLocation}
          result={result}
          departDate={departDate}
          returnDate={returnDate}
          handleSearch={() => {}}
          handleSubmit={() => {}}
        />
      </div>
      <Footer />
    </>
  );
}
