import React, { useState } from "react";
import { Link } from "react-router-dom";
import { dummyCases } from "../data/useCases";

// Get only the resolved cases once
const allResolvedCases = dummyCases.filter((c) => c.status === "Resolved");

const ResolvedCasesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");

  // Filter logic
  const filteredCases = allResolvedCases.filter((caseItem) => {
    const matchesId = caseItem.id
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Check if the case's issue date matches the selected search date
    // new Date().toISOString() -> "2024-10-27T10:00:00.000Z"
    // We only want to match the date part "2024-10-27"
    const matchesDate = searchDate
      ? new Date(caseItem.issueDate).toISOString().startsWith(searchDate)
      : true; // If no date is selected, it's a match

    return matchesId && matchesDate;
  });

  return (
    <div className="h-full bg-slate-50 p-6 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Resolved Cases Archive
        </h1>
        <p className="text-gray-500 mt-1">
          Search for past cases by ID or date of issue.
        </p>
      </header>

      {/* Search and Filter Controls */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label
              htmlFor="caseIdSearch"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Search by Case ID
            </label>
            <input
              type="text"
              id="caseIdSearch"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="e.g., CM-AP-2023-002"
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="dateSearch"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Filter by Date of Issue
            </label>
            <input
              type="date"
              id="dateSearch"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={() => {
              setSearchTerm("");
              setSearchDate("");
            }}
            className="bg-gray-500 text-white font-semibold p-2 rounded-md hover:bg-gray-600 transition-colors h-10"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-3 font-semibold">Case ID</th>
              <th className="p-3 font-semibold">Location</th>
              <th className="p-3 font-semibold">Date of Issue</th>
              <th className="p-3 font-semibold">Reported By</th>
              <th className="p-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.length > 0 ? (
              filteredCases.map((caseItem) => (
                <tr
                  key={caseItem.id}
                  className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50"
                >
                  <td className="p-3 font-medium text-blue-600">
                    {caseItem.id}
                  </td>
                  <td className="p-3">{`${caseItem.location.village}, ${caseItem.location.district}`}</td>
                  <td className="p-3">
                    {new Date(caseItem.issueDate).toLocaleDateString()}
                  </td>
                  <td className="p-3">{caseItem.reporterName}</td>
                  <td className="p-3">
                    <Link
                      to={`/dashboard/${caseItem.id}`}
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center p-6 text-gray-500">
                  No matching cases found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResolvedCasesPage;
