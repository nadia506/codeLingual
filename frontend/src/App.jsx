import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import ConverterPage from "./pages/ConverterPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/converter" element={<ConverterPage />} />
      </Routes>
    </Router>
  );
};

export default App;
