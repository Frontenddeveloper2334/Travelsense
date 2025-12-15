import React from "react";
import Header from "../../components/Header.jsx";
import TimeBanner from "./components/TimeBanner.jsx";
import TimeContent from "./components/TimeContent.jsx";
import Footer from "../../components/Footer.jsx";
import {TravelTool} from "../../components/TravelTool.jsx";
function TimePage() {
  return (
    <div>
      <Header />
      <TimeBanner />
      <TimeContent />
      <TravelTool
        fourthButtonName={"Driving distance"}
        fifthButtonName={"Cities Nearby"}
        sixButtonName={"Halfway Point"}
        nineButtonName={"Stopping Points"}
        cardTitle={"Time Duration Tool"}
        imageSrc={"/Image/col-img.jpg"}
      />
      <Footer />
    </div>
  );
}

export default TimePage;
