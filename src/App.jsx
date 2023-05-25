import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ShipmentDetails from "./pages/ShipmentDetails";
import Nextpage from "./pages/Nextpage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/shipments/:shipmentId" element={<ShipmentDetails />} />
        <Route path="/submitrequest" element={<Nextpage />} />
      </Routes>
    </>
  );
}

export default App;
