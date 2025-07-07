import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListCases from "./pages/ListCases";
import CurrentCaseDetails from "./pages/CurrentCase";
import ReportChatPage from "./pages/ReportChatPage"; 
import LeaveRequestPage from "./pages/LeaveRequestPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListCases />} />
        <Route path="/case/:caseId" element={<CurrentCaseDetails />} />
        <Route path="/case/:caseId/report" element={<ReportChatPage />} />
        <Route path="/leave-request" element={<LeaveRequestPage />} />
      </Routes>
    </BrowserRouter>
  );
}
