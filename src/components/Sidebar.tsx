import React from "react";
import { NavLink } from "react-router-dom";
import { dummyCases } from "../data/cases"; // Adjust path if needed

// Helper to get a color based on case status
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

export const Sidebar = () => {
  return (
    <aside className="w-80 flex-shrink-0 bg-white border-r border-slate-200 flex flex-col">
      <div className="px-4 py-3 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-gray-800">
          All Case Reports
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <nav className="p-2">
          <ul>
            {dummyCases.map((caseItem) => (
              <li key={caseItem.id}>
                <NavLink
                  to={`/case/${caseItem.id}/report`}
                  // This function gives us an `isActive` boolean to style the current link
                  className={({ isActive }) =>
                    `flex items-center w-full p-3 my-1 rounded-md text-left transition-colors ${
                      isActive
                        ? "bg-blue-100 text-blue-800"
                        : "text-gray-600 hover:bg-slate-100"
                    }`
                  }
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full mr-3 flex-shrink-0 ${getStatusColor(
                      caseItem.status
                    )}`}
                  ></span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">
                      {caseItem.id}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {caseItem.location.village}, {caseItem.location.district}
                    </p>
                  </div>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="p-4 border-t border-slate-200 text-xs text-center text-gray-500">
        <p>© 2024 Child Marriage Reporting Portal</p>
      </div>
    </aside>
  );
};
