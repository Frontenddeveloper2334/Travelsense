import React from 'react'
import Header from '../../components/Header.jsx';
import PlaceBanner from './components/PlaceBanner.jsx';
import PlaceContent from './components/PlaceContent.jsx';
import {TravelTool} from '../../components/TravelTool.jsx';
import Footer from '../../components/Footer.jsx';

function PlacePage() {
  return (
    <div>
        <Header/>
        <PlaceBanner/>
        <PlaceContent/>
         <TravelTool
        fourthButtonName={"Driving distance"}
        fifthButtonName={"Cities Nearby"}
        sixButtonName={"Halfway Point"}
        nineButtonName={"Stopping Points"}
        cardTitle={"Flying Tool"}
        imageSrc={"/Image/col-img.jpg"}
      />
      <Footer/>
    </div>
  )
}

export default PlacePage