import React from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import Studentdetails from "./components/Studentdetails";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/studentdetails" element={<Studentdetails/>} />
      </Routes>
    </div>
  );
};

export default App;
