import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import DrivingCalculator from "./components/DistanceCalculator";
import { TravelTool } from "../../components/TravelTool";
import Content from "./components/Content";

function DrivingPage() {
  return (
    <>
      <Header />

      <DrivingCalculator />

      <Content />

      <TravelTool
        firstButtonName="Driving Time"
        secondButtonName="Cost of Driving"
        thirdButtonName="Stopping Point" 
        fourthButtonName="Driving Distance"
        fifthButtonName="Halfway Point" 
        sixButtonName="Cities Near A Place"
        cardTitle="Quick Links"
        imageSrc="/Image/driving.jpg"
      />

      <Footer />
    </>
  );
}

export default DrivingPage;
