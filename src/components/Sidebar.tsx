import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { dummyCases } from "../data/cases";

// =================================================================
// ICONS (Unchanged)
// =================================================================
const Icon = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
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
    {children}
  </svg>
);

const LayoutDashboard = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </Icon>
);

const Archive = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <rect width="20" height="5" x="2" y="3" rx="1" />
    <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
    <path d="M10 12h4" />
  </Icon>
);

const ChevronDown = ({ className }: { className?: string }) => (
  <Icon className={className}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);

// =================================================================
// HELPER COMPONENTS (Now fully implemented)
// =================================================================
const activeCases = dummyCases.filter(
  (c) => c.status === "Under Investigation"
);
const pendingCases = dummyCases.filter((c) => c.status === "Reported");

const getStatusColor = (status: string) => {
  switch (status) {
    case "Under Investigation":
      return "bg-yellow-500";
    case "Resolved":
      return "bg-green-500";
    case "Reported":
    default:
      return "bg-blue-500";
  }
};

const CaseLink = ({ caseItem }: { caseItem: (typeof dummyCases)[0] }) => (
  <NavLink
    to={`/dashboard/${caseItem.id}`}
    className={({ isActive }) =>
      `flex items-center w-full p-2.5 my-1 rounded-md text-left transition-colors ${
        isActive
          ? "bg-blue-100 text-blue-800"
          : "text-gray-600 hover:bg-slate-100"
      }`
    }
  >
    <span
      className={`w-2 h-2 rounded-full mr-3 flex-shrink-0 ${getStatusColor(
        caseItem.status
      )}`}
    ></span>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold truncate">{caseItem.id}</p>
      <p className="text-xs text-gray-500 truncate">
        {caseItem.location.village}, {caseItem.location.district}
      </p>
    </div>
  </NavLink>
);

const SidebarSection = ({
  title,
  cases,
  defaultOpen = false,
}: {
  title: string;
  cases: typeof dummyCases;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="py-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-2 py-1 text-sm font-semibold text-gray-700 hover:bg-slate-100 rounded-md"
      >
        <span>{title}</span>
        <div className="flex items-center">
          <span className="text-xs font-normal bg-slate-200 text-slate-600 rounded-full px-2 py-0.5 mr-1">
            {cases.length}
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      {isOpen && (
        <ul className="mt-1 pl-2 border-l border-slate-200 ml-2">
          {cases.map((caseItem) => (
            <li key={caseItem.id}>
              <CaseLink caseItem={caseItem} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// =================================================================
// MAIN SIDEBAR COMPONENT (Unchanged)
// =================================================================
export const Sidebar = () => {
  return (
    <aside className="w-80 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col">
      <div className="px-4 py-3 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-gray-800">Case Portal</h2>
      </div>

      <nav className="p-2 border-b border-slate-200">
        <ul className="space-y-1">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `flex items-center w-full p-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-800"
                    : "text-gray-700 hover:bg-slate-100"
                }`
              }
            >
              <LayoutDashboard className="w-5 h-5 mr-3" />
              <span className="text-sm font-medium">Main Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/resolved-cases"
              className={({ isActive }) =>
                `flex items-center w-full p-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-800"
                    : "text-gray-700 hover:bg-slate-100"
                }`
              }
            >
              <Archive className="w-5 h-5 mr-3" />
              <span className="text-sm font-medium">
                Resolved Cases Archive
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="flex-1 overflow-y-auto p-2">
        <p className="px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider mt-2">
          Case Reports
        </p>
        <SidebarSection
          title="Active Cases"
          cases={activeCases}
          defaultOpen={true}
        />
        <SidebarSection
          title="Pending Review"
          cases={pendingCases}
          defaultOpen={true}
        />
      </div>

      <div className="p-4 border-t border-slate-200 text-xs text-center text-gray-500">
        <p>© 2024 Child Marriage Reporting Portal</p>
      </div>
    </aside>
  );
};
