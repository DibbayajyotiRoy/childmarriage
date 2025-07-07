import React, { useState } from "react";
import { dummyCases } from "../data/cases";
import CaseCard from "../components/CaseCard";
import CaseListItem from "../components/CaseListItem";

const ListCases = () => {
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  return (
    <div className="container">
      <h1>Child Marriage Cases</h1>
      <p>Dashboard for tracking reported incidents.</p>

      <div className="view-toggle">
        <button
          onClick={() => setViewMode("card")}
          className={viewMode === "card" ? "active" : ""}
        >
          Card View
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={viewMode === "list" ? "active" : ""}
        >
          List View
        </button>
      </div>

      <div className={viewMode === "card" ? "cases-grid" : "cases-list"}>
        {dummyCases.map((caseItem) =>
          viewMode === "card" ? (
            <CaseCard key={caseItem.id} caseItem={caseItem} />
          ) : (
            <CaseListItem key={caseItem.id} caseItem={caseItem} />
          )
        )}
      </div>
    </div>
  );
};

export default ListCases;
