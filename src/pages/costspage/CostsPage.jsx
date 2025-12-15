import React from 'react'
import Header from '../../components/Header.jsx';
import CostsBanner from './components/CostsBanner.jsx';
import CostsContent from './components/CostsContent.jsx';
import {TravelTool} from '../../components/TravelTool.jsx';
import Footer from '../../components/Footer.jsx';

function CostsPage() {
  return (
    <div>
        <Header/>
        <CostsBanner/>
        <CostsContent/>
        <TravelTool
        fourthButtonName={"Driving distance"}
        fifthButtonName={"Cities Nearby"}
        sixButtonName={"Halfway Point"}
        nineButtonName={"Stopping Points"}
        cardTitle={"Cost Tool"}
        imageSrc={"/Image/col-img.jpg"}
      />
      <Footer/>
    </div>
  )
}

export default CostsPage