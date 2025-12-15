import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import ResultsPage from './pages/ResultsPage';
import DrivingPage from './pages/drivingpage/DrivingPage';
import DistancePage from './pages/distancepage/DistancePage';
import FlyingPage from './pages/flyingpage/FlyingPage';
import TimePage from './pages/timepage/TimePage';
import CostsPage from './pages/costspage/CostsPage';
import PlacePage from './pages/placepage/PlacePage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/driving" element={<DrivingPage />} />
        <Route path="/distance" element={<DistancePage />} />
        <Route path="/flying" element={<FlyingPage/>} /> 
        <Route path="/time" element={<TimePage/>} /> 
        <Route path="/cost" element={<CostsPage/>} />
        <Route path="/places" element={<PlacePage/>} />
         
      </Routes>
    </Router>
  );
}

export default App;