import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import Layout and Page Components
import MainLayout from "./components/MainLayout";
import DashboardPage from "./pages/Dashbard"; 
import LeaveRequestPage from "./pages/LeaveRequestPage";
import CaseDetailsPage from "./pages/CurrentCase"; 
import ResolvedCasesPage from "./pages/ResolvedCases"; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="/dashboard/:caseId" element={<DashboardPage />} />
          <Route path="/case/:caseId" element={<CaseDetailsPage />} />
          <Route path="/resolved-cases" element={<ResolvedCasesPage />} />
        </Route>
        <Route path="/leave-request" element={<LeaveRequestPage />} />
      </Routes>
    </BrowserRouter>
  );
}
