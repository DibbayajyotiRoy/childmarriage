import React from "react";
import { useParams } from "react-router-dom";
import { useCaseDetail } from "../../data/useCaseDetail";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { DashboardCard } from "../../components/ui/DashboardCard";
import { MemberCaseActions } from "./components/MemberCaseActions";
import { Users, Activity, CheckSquare } from "../../components/ui/Icons";

export const MemberCaseDetailView = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const { caseData, loading, error } = useCaseDetail(caseId);

  if (loading)
    return <div className="text-center p-8">Loading case details...</div>;
  if (error)
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">
        Error: {error}
      </div>
    );
  if (!caseData) return <div className="text-center p-8">Case not found.</div>;

  // This data will eventually come from the API (e.g., caseData.teamMembers)
  const teamMembers = [
    { role: "Lead Officer", name: "R. K. Verma" },
    { role: "Field Agent 1", name: "S. Gupta" },
    { role: "Field Agent 2", name: "P. Singh" },
    { role: "Support Staff", name: "A. Nanda" },
  ];

  const handleShowMemberReport = (memberName: string) => {
    alert(
      `Showing individual report submitted by ${memberName} for case ${caseData.id}.`
    );
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">Case Details</p>
          <h1 className="text-3xl font-bold text-slate-800 mt-1">
            {caseData.id}
          </h1>
          <div className="mt-3">
            <StatusBadge status={caseData.status} />
          </div>
        </div>
        <div className="flex-shrink-0">
          <MemberCaseActions status={caseData.status} caseId={caseData.id} />
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Assigned Team"
          icon={<Users className="w-6 h-6 text-blue-600" />}
        >
          <ul className="space-y-2">
            {teamMembers.map((member) => (
              <li
                key={member.name}
                className="flex items-center justify-between gap-2"
              >
                <div>
                  <span className="text-slate-600">{member.role}:</span>
                  <strong className="ml-1 text-slate-800">{member.name}</strong>
                </div>
                <button
                  onClick={() => handleShowMemberReport(member.name)}
                  className="flex-shrink-0 text-xs font-semibold text-slate-500 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md transition-colors"
                >
                  Show Report
                </button>
              </li>
            ))}
          </ul>
        </DashboardCard>

        <DashboardCard
          title="Recent Activity Report"
          icon={<Activity className="w-6 h-6 text-green-600" />}
          className="lg:col-span-2"
        >
          <p>
            Activity report for case {caseData.id} will be displayed here,
            showing a log of actions and field visits.
          </p>
        </DashboardCard>

        <DashboardCard
          title="Case Checklist & Progress"
          icon={<CheckSquare className="w-6 h-6 text-purple-600" />}
          className="lg:col-span-3"
        >
          <p>
            A checklist of standard operating procedures for the case will be
            displayed here to track progress.
          </p>
        </DashboardCard>
      </div>
    </div>
  );
};
