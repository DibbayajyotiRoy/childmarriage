import React from "react";
import { useParams } from "react-router-dom";
import { dummyCases } from "../data/cases";

// =================================================================
// 1. REUSABLE UI COMPONENTS
// =================================================================

// --- SVG Icons (Unchanged) ---
const Users = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const Activity = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);
const CheckSquare = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="9 11 12 14 22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);
const AlertTriangle = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);
const FileText = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

// --- StatCard, StatusBadge, Button, and DashboardCard Components (Unchanged) ---
const StatCard = ({
  title,
  value,
  icon,
  textColor,
  bgColor,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  textColor: string;
  bgColor: string;
}) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200/80">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm font-semibold text-slate-500">{title}</h3>
        <p className={`text-3xl font-bold mt-1 ${textColor}`}>{value}</p>
      </div>
      <div className={`p-3 rounded-full ${bgColor}`}>{icon}</div>
    </div>
  </div>
);
const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles: {
    [key: string]: { text: string; bg: string; dot: string };
  } = {
    Reported: { text: "text-blue-700", bg: "bg-blue-100", dot: "bg-blue-500" },
    "Under Investigation": {
      text: "text-yellow-700",
      bg: "bg-yellow-100",
      dot: "bg-yellow-500",
    },
    Resolved: {
      text: "text-green-700",
      bg: "bg-green-100",
      dot: "bg-green-500",
    },
  };
  const style = statusStyles[status] || statusStyles["Reported"];
  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${style.bg} ${style.text}`}
    >
      <span className={`w-2 h-2 mr-2 rounded-full ${style.dot}`}></span>
      {status}
    </div>
  );
};
const Button = ({
  children,
  onClick,
  variant = "primary",
  icon,
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger";
  icon?: React.ReactNode;
}) => {
  const baseClasses =
    "inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 focus:ring-blue-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };
  return (
    <button onClick={onClick} className={`${baseClasses} ${variants[variant]}`}>
      {icon}
      {children}
    </button>
  );
};
const DashboardCard = ({
  title,
  icon,
  children,
  className,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white p-6 rounded-xl shadow-sm border border-slate-200/80 h-full ${className}`}
  >
    <div className="flex items-center gap-3 mb-4">
      {icon}
      <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
    </div>
    <div className="text-sm text-slate-600 space-y-3">{children}</div>
  </div>
);

// --- UPDATED CaseActionButtons Component ---
const CaseActionButtons = ({
  status,
  caseId,
}: {
  status: string;
  caseId: string;
}) => {
  const handleStartInvestigation = () =>
    alert(`Starting investigation for case ${caseId}...`);
  const handleCreateFinalReport = () =>
    alert(
      `Compiling individual reports into a final report for case ${caseId}...`
    );
  const handleResolveCase = () =>
    alert(`Proceeding to resolve case ${caseId}...`);
  const handleShowReport = () =>
    alert(`Showing final PDF report for case ${caseId}.`);

  switch (status) {
    case "Reported":
      return (
        <Button onClick={handleStartInvestigation} variant="primary">
          Start Investigation
        </Button>
      );
    case "Under Investigation":
      return (
        <div className="flex items-center flex-wrap gap-3">
          {/* NEW "Create Final Report" button */}
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
    case "Resolved":
      return (
        <Button onClick={handleShowReport} variant="secondary">
          Show Final Report
        </Button>
      );
    default:
      return null;
  }
};

// =================================================================
// 2. THE MAIN DASHBOARD PAGE COMPONENT
// =================================================================
const DashboardPage = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const caseData = dummyCases.find((c) => c.id === caseId);

  // --- View 1: Main Dashboard (No case selected) ---
  if (!caseData) {
    const stats = [
      {
        title: "Active Cases",
        value: dummyCases.filter((c) => c.status === "Under Investigation")
          .length,
        icon: <Activity className="w-6 h-6 text-yellow-700" />,
        textColor: "text-yellow-600",
        bgColor: "bg-yellow-100",
      },
      {
        title: "Pending Review",
        value: dummyCases.filter((c) => c.status === "Reported").length,
        icon: <AlertTriangle className="w-6 h-6 text-blue-700" />,
        textColor: "text-blue-600",
        bgColor: "bg-blue-100",
      },
      {
        title: "Cases Resolved",
        value: dummyCases.filter((c) => c.status === "Resolved").length,
        icon: <CheckSquare className="w-6 h-6 text-green-700" />,
        textColor: "text-green-600",
        bgColor: "bg-green-100",
      },
    ];
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Main Dashboard</h1>
          <p className="text-slate-500 mt-2">
            Welcome! Here is a summary of all ongoing and resolved cases.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
          <p className="text-sm text-blue-800">
            Please select a case from the sidebar to view its detailed dashboard
            and take action.
          </p>
        </div>
      </div>
    );
  }

  // --- View 2: Case-Specific Dashboard ---

  // --- NEW: Structured data for the team and a handler for their reports ---
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
          <CaseActionButtons status={caseData.status} caseId={caseData.id} />
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* UPDATED "Assigned Team" Card */}
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
                {/* Button to show individual report */}
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
            This is a placeholder for the team's activity report. It would
            contain a log of actions, field visits, and interviews conducted by
            the assigned team, providing a live feed of the investigation's
            progress.
          </p>
        </DashboardCard>

        <DashboardCard
          title="Case Checklist & Progress"
          icon={<CheckSquare className="w-6 h-6 text-purple-600" />}
          className="lg:col-span-3"
        >
          <p>
            This section is a placeholder to show a checklist of standard
            operating procedures for the case. It would track the progress of
            tasks such as 'Initial Report Verification', 'Witness
            Identification', 'Legal Counsel Assignment', and 'Final Report
            Submission'.
          </p>
        </DashboardCard>
      </div>
    </div>
  );
};

export default DashboardPage;
