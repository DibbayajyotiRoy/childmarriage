import React from "react";
import { Link } from "react-router-dom";
import { useCases } from "../../data/useCases";
import { MemberStatCard } from "./components/MemberStatCard";
import { StatusBadge } from "../../components/ui/StatusBadge";
import {
  Activity,
  AlertTriangle,
  CheckSquare,
} from "../../components/ui/Icons";
import { Case } from "../../services/cases"; 

export const MemberMainDashboardView = () => {
  const { cases, loading, error } = useCases();

  if (loading)
    return <div className="text-center p-8">Loading dashboard...</div>;
  if (error)
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">
        Error: {error}
      </div>
    );

  // Derive stats dynamically from the fetched case data
  const stats = [
    {
      title: "Active Cases",
      // ✅ FIX: Explicitly type the parameter 'c' as 'Case'
      value: cases.filter((c: Case) => c.status === "IN_PROGRESS").length,
      icon: <Activity className="w-6 h-6 text-yellow-700" />,
      textColor: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Pending Review",
      // ✅ FIX: Explicitly type the parameter 'c' as 'Case'
      value: cases.filter((c: Case) => c.status === "OPEN").length,
      icon: <AlertTriangle className="w-6 h-6 text-blue-700" />,
      textColor: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Cases Resolved",
      // ✅ FIX: Explicitly type the parameter 'c' as 'Case'
      value: cases.filter((c: Case) => c.status === "RESOLVED").length,
      icon: <CheckSquare className="w-6 h-6 text-green-700" />,
      textColor: "text-green-600",
      bgColor: "bg-green-100",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Member Dashboard</h1>
        <p className="text-slate-500 mt-2">
          Welcome! Here is a summary of your assigned cases.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <MemberStatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200/80">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          My Assigned Cases
        </h2>
        {cases.length > 0 ? (
          <ul className="space-y-2">
            {cases.map((caseItem) => (
              <li key={caseItem.id}>
                <Link
                  to={`/dashboard/member/${caseItem.id}`} // The link points to the detail view
                  className="block p-4 border rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex justify-between items-center gap-4">
                    <div>
                      <p className="font-semibold text-slate-800">
                        {caseItem.complainantName}
                      </p>
                      <p className="text-sm text-slate-500">
                        {caseItem.caseAddress}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <StatusBadge status={caseItem.status} />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-10">
            <p className="text-slate-500">
              You have no cases assigned at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
