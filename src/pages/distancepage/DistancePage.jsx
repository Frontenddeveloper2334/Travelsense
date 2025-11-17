import React from "react";
import Header from "../../components/Header";
import { TravelTool } from "../../components/TravelTool";
import Footer from "../../components/Footer";
import DistanceBanner from "./components/DistanceBanner";
import DistanceContent from "./components/DistanceContent";

function DistancePage() {
  return (
    <div>
      <Header />
      <DistanceBanner />
      <DistanceContent />
      <TravelTool
        fourthButtonName={"Driving distance"}
        fifthButtonName={"Cities Nearby"}
        sixButtonName={"Halfway Point"}
        nineButtonName={"Stopping Points"}
        cardTitle={"Travel Tool"}
        imageSrc={"/Image/col-img.jpg"}
      />
      <Footer />
    </div>
  );
}

export default DistancePage;
