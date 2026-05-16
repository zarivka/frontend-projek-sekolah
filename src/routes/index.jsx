import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Public Interface/pages/home.jsx";
import Login from "../Public Interface/pages/login.jsx";
import Dashboard from "../Admin Interface/pages/dashboard.jsx";
import News from "../Admin Interface/pages/news.jsx";
import Teachers from "../Admin Interface/pages/teachers.jsx";

function Index() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/news" element={<News />} />
        <Route path="/dashboard/teachers" element={<Teachers />} />
      </Routes>
    </Router>
  );
}

export default Index;