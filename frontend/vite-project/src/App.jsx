import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LogInForm } from './pages/Login';
import { SignUpForm } from './pages/SignUp';
import { HomePage } from "./pages/Home";
import { UserProfilePage } from "./pages/Profile";
import { AnalyticsPage } from "./pages/AnalyticsPage"
import { EventsPage } from "./pages/Events"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpForm  />} />
        <Route path="/login" element={<LogInForm  />} />
        <Route path="/" element={<HomePage  />} />
        <Route path="/profile" element={<UserProfilePage  />} />
        <Route path="/analytics" element={<AnalyticsPage  />} />
        <Route path="/events" element={<EventsPage  />} />
      </Routes>
    </Router>
  );
}

export default App;
