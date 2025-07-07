import { useParams, Link } from "react-router-dom";
import { dummyCases } from "../data/cases";

const CaseDetailsPage = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const caseData = dummyCases.find((c) => c.id === caseId);

  if (!caseData) {
    return (
      <div className="container">
        <h1>Case Not Found</h1>
        <Link to="/" className="details-button">
          Back to Case List
        </Link>
      </div>
    );
  }

  // Handle for submitting a new report
  const handleSubmitReport = () => {
    // In a real application, this would open a modal or make an API call.
    // For this example, we'll use a simple alert to confirm the action.
    alert(
      `A new report for Case ID: ${caseData.id} has been submitted to the authorities.`
    );
  };

  // Handle status with spaces for the CSS class
  const statusClass = `status status-${caseData.status
    .toLowerCase()
    .replace(/\s+/g, "-")}`;

  return (
    <div className="container details-page">
      <h1>Case Details: {caseData.id}</h1>
      <div className="case-card-full">
        <p>
          <strong>Status:</strong>{" "}
          <span className={statusClass}>{caseData.status}</span>
        </p>
        <p>
          <strong>Location:</strong>{" "}
          {`${caseData.location.village}, ${caseData.location.district}, ${caseData.location.state}`}
        </p>
        <p>
          <strong>Date of Issue:</strong>{" "}
          {new Date(caseData.issueDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Reported By:</strong> {caseData.reporterName}
        </p>
        <hr />
        <h3>Full Details:</h3>
        <p>{caseData.details}</p>
      </div>

      {/* --- MODIFIED SECTION: From Link to Button --- */}
      <button
        onClick={handleSubmitReport}
        className="details-button"
        style={{
          backgroundColor: "#28a745", // Green for "submit"
          display: "block",
          marginBottom: "1rem",
          width: "100%",
          border: "none",
          color: "white",
          cursor: "pointer",
        }}
      >
        Submit a New Report on This Case
      </button>
      {/* --- END MODIFIED SECTION --- */}

      <Link to="/" className="details-button">
        ← Back to Case List
      </Link>
    </div>
  );
};

export default CaseDetailsPage;
