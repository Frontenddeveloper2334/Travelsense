import React from "react";
import Header from "../../components/Header";
import Banner from "./components/Banner";
import Footer from "../../components/Footer";
import { TravelTool } from "../../components/TravelTool";
import Content from "./components/Content";

function Homepage() {
  return (
    <div>
      <Header />
      <Banner />
      <Content/>
      <TravelTool
        firstButtonName={"Flight time"}
        secondButtonName={"Closest airport"}
        thirdButtonName={"Driving time"}
        fourthButtonName={"Driving distance"}
        fifthButtonName={"Cities Nearby"}
        sixButtonName={"Halfway Point"}
        sevenButtonName={"Time Diffrence"}
        eightButtonName={"Cost of Driving"}
        nineButtonName={"Stopping Points"}
        cardTitle={"Travel Tool"}
        imageSrc={"/Image/col-img.jpg"}
      />
       <Footer />
    </div>
  );
}

export default Homepage;
