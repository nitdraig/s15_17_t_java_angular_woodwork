import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import LoginView from "./views/LoginView/LoginView";
import RegisterView from "./views/RegisterView/RegisterView";
import Dashboard from "./pages/dashboard/Dashboard";
import IndexView from "./views/IndexView/IndexView";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<IndexView />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/register" element={<RegisterView />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
