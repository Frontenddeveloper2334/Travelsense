import React from 'react'
import Header from '../../components/Header.jsx';
import Footer from '../../components/Footer.jsx';
import FlyingBanner from './components/FlyingBanner.jsx';
import FlyingContent from './components/FlyingContent.jsx';
import {TravelTool} from '../../components/TravelTool.jsx'

function FlyingPage() {
  return (
    <div>
      <Header/>
      <FlyingBanner/>
      <FlyingContent/>
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

export default FlyingPage