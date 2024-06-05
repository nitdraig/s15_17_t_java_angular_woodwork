import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Dashboard from "./pages/dashboard/Dashboard";
import Index from "./pages/index/Index";
import { Login } from "./pages/login/Login";
import Register from "./pages/register/Register";
import Reservation from "./pages/reservation/Reservation";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reservation" element={<Reservation />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
