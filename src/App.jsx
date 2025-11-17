import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import ResultsPage from './pages/ResultsPage';
import DrivingPage from './pages/drivingpage/DrivingPage';
import DistancePage from './pages/distancepage/DistancePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/driving" element={<DrivingPage />} />
        <Route path="/distance" element={<DistancePage />} />
      </Routes>
    </Router>
  );
}

export default App;