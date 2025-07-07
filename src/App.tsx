import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListCases from "./pages/ListCases";
import CurrentCaseDetails from "./pages/CurrentCase";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListCases />} />
        <Route path="/case/:caseId" element={<CurrentCaseDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
