import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginForm from "./pages/login";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import EmployeeForm from "./pages/employee";
import Attendance from "./pages/attendance";
import Dashboard from "./pages/Dashboard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="home" element={<Home />}>
          <Route path="employee" element={<EmployeeForm />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
