import React from "react";
import { useParams } from "react-router-dom";
import { MemberMainDashboardView } from "./MainDashboardView";
import { MemberCaseDetailView } from "./CaseDetailView";


const MemberDashboardPage: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  return caseId ? <MemberCaseDetailView /> : <MemberMainDashboardView />;
};

export default MemberDashboardPage;
