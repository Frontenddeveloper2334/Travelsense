import React from 'react'
import Header from '../../components/Header'
import DrivingPage from '../drivingpage/DrivingPage'
import Content from '../drivingpage/components/Content'
import { TravelTool } from '../../components/TravelTool'
import Footer from '../../components/Footer'
import Banner from '../homepage/components/Banner'
import DrivingCalculator from '../drivingpage/components/DistanceCalculator'

function DistancePage() {
  return (
  <div>
       <Header />
    <DrivingCalculator/>
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
  )
}

export default DistancePage