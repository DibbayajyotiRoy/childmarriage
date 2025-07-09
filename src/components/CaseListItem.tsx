import React from "react";
import { Link } from "react-router-dom";
import type { Case } from "../data/useCases";

const CaseListItem: React.FC<{ caseItem: Case }> = ({ caseItem }) => {
  return (
    <div className="case-list-item">
      <div className="case-info">
        <h3>{`${caseItem.location.village}, ${caseItem.location.district}`}</h3>
        <p>
          <strong>Reported by:</strong> {caseItem.reporterName}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(caseItem.issueDate).toLocaleDateString()}
        </p>
      </div>
      <Link to={`/case/${caseItem.id}`} className="details-button">
        View Full Details
      </Link>
    </div>
  );
};

export default CaseListItem;
