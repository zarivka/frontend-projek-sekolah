import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../Public Interface/pages/home.jsx";
import Berita from "../Public Interface/pages/berita.jsx";
import Login from "../Public Interface/pages/login.jsx";
import NotFound from "../Public Interface/pages/notFound.jsx";
import Forbidden from "../Public Interface/pages/forbidden.jsx";
import Dashboard from "../Admin Interface/pages/dashboard.jsx";
import News from "../Admin Interface/pages/news.jsx";
import Teachers from "../Admin Interface/pages/teachers.jsx";
import Announcements from "../Admin Interface/pages/announcements.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

function Index() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/berita" element={<Berita />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Guru", "Staff"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/news"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Guru", "Staff"]}>
                <News />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/teachers"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Guru", "Staff"]}>
                <Teachers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/announcements"
            element={
              <ProtectedRoute allowedRoles={["Admin", "Guru", "Staff"]}>
                <Announcements />
              </ProtectedRoute>
            }
          />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default Index;