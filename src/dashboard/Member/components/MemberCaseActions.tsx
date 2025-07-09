import React from "react";
import { Button } from "../../../components/ui/Button";
import { FileText } from "../../../components/ui/Icons";

export const MemberCaseActions = ({
  status,
  caseId,
}: {
  status: string;
  caseId: string;
}) => {
  // These handlers will eventually make API calls
  const handleStartInvestigation = () => {
    // Example: caseApi.updateCase(caseId, { status: 'IN_PROGRESS' });
    alert(`Starting investigation for case ${caseId}...`);
  };

  const handleCreateFinalReport = () => {
    alert(
      `Compiling individual reports into a final report for case ${caseId}...`
    );
  };

  const handleResolveCase = () => {
    // Example: caseApi.updateCase(caseId, { status: 'RESOLVED' });
    alert(`Proceeding to resolve case ${caseId}...`);
  };

  const handleShowReport = () => {
    alert(`Showing final PDF report for case ${caseId}.`);
  };

  // The status values should match what your API returns (e.g., 'OPEN', 'IN_PROGRESS')
  switch (status) {
    case "OPEN":
      return (
        <Button onClick={handleStartInvestigation} variant="primary">
          Start Investigation
        </Button>
      );
    case "IN_PROGRESS":
      return (
        <div className="flex items-center flex-wrap gap-3">
          <Button
            onClick={handleCreateFinalReport}
            variant="secondary"
            icon={<FileText className="w-4 h-4" />}
          >
            Create Final Report
          </Button>
          <Button onClick={handleResolveCase} variant="danger">
            Mark as Resolved
          </Button>
        </div>
      );
    case "RESOLVED":
      return (
        <Button onClick={handleShowReport} variant="secondary">
          Show Final Report
        </Button>
      );
    default:
      return null;
  }
};