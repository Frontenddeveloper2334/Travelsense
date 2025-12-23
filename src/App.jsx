import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import ResultsPage from './pages/ResultsPage';
import FlightResultPage from './pages/FlightResultPage';
import DrivingPage from './pages/drivingpage/DrivingPage';
import DistancePage from './pages/distancepage/DistancePage';
import FlyingPage from './pages/flyingpage/FlyingPage';
import FlyingTime from './pages/flyingtime/FlyingTime';
import FlyingTimeResultPage from './pages/flyingtime/FlyingTimeResultPage';
import DrivingTime from './pages/drivingtime/DrivingTime';
import DrivingTimeResultPage from './pages/drivingtime/DrivingTimeResultPage';
import DrivingDistance from './pages/drivingdistance/DrivingDistance';
import ClosestAirport from './pages/closestairport/ClosestAirport';
import ClosestAirportResultPage from './pages/closestairport/ClosestAirportResultPage';
import CitiesNearby from './pages/cities nearby/CitiesNearby';
import TimeDifference from './pages/timedifference/TimeDifference';
import HalfwayPoint from './pages/halfwaypoint/HalfwayPoint';
import TimePage from './pages/timepage/TimePage';
import CostsPage from './pages/costspage/CostsPage';
import PlacePage from './pages/placepage/PlacePage';
import CostDriving from './pages/costofdriving/CostDriving';
import StopingPoint from './pages/stopingpoint/StopingPoint';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/flight-result" element={<FlightResultPage />} />
        <Route path="/driving" element={<DrivingPage />} />
        <Route path="/distance" element={<DistancePage />} />
        <Route path="/flying" element={<FlyingPage/>} /> 
        <Route path="/flying-time" element={<FlyingTime/>} />
        <Route path="/flying-time/result" element={<FlyingTimeResultPage/>} />
        <Route path="/driving-time" element={<DrivingTime/>} />
        <Route path="/driving-time/result" element={<DrivingTimeResultPage/>} />
        <Route path="/driving-distance" element={<DrivingDistance/>} />
        <Route path="/closest-airport" element={<ClosestAirport/>} />
        <Route path="/closest-airport/result" element={<ClosestAirportResultPage/>} />
        <Route path="/cities-nearby" element={<CitiesNearby/>} />
        <Route path="/cities-near" element={<CitiesNearby/>} />
        <Route path="/time-change" element={<TimeDifference/>} />
        <Route path="/time-difference" element={<TimeDifference/>} />
        <Route path="/halfway" element={<HalfwayPoint/>} />
        <Route path="/time" element={<TimePage/>} /> 
        <Route path="/cost" element={<CostsPage/>} />
        <Route path="/cost-of-driving" element={<CostDriving/>} />
        <Route path="/stopping-points" element={<StopingPoint/>} />
        <Route path="/places" element={<PlacePage/>} />
         
      </Routes>
    </Router>
  );
}

export default App;