import * as endpoints from '../utils/endpoints';

// ====================================================================
// CONFIGURATION
// ====================================================================

const API_BASE_URL = "http://localhost:8080";

// ====================================================================
// TYPE DEFINITIONS
// ====================================================================

export interface CaseDetails {
  id: string;
  caseId: string;
  notes: string;
  evidencePath: string;
  createdAt: string;
  updatedAt: string;
}

export interface Case {
  id: string;
  complainantName: string;
  complainantPhone: string;
  caseAddress: string;
  district: string;
  state: string;
  description?: string;
  reportedAt?: string;
  createdBy: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  createdAt: string;
  updatedAt: string;
  caseDetails?: CaseDetails[];
}

export interface TeamFormation {
  caseId: string;
  policePersonId: string;
  dicePersonId: string;
  adminPersonId: string;
  formedAt: string;
  policeStatus: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  diceStatus: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  adminStatus: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

// ====================================================================
// GENERIC API HELPERS
// ====================================================================

/**
 * A robust error handler for the `fetch` API.
 * It checks if the response was successful and throws a structured error if not.
 * @param response The raw Response object from a fetch call.
 */
const handleApiResponse = async (response: Response) => {
  if (response.ok) {
    // For 204 No Content, there's no body to parse, so we return early.
    if (response.status === 204) {
      return;
    }
    // Otherwise, parse the JSON body for successful responses.
    return response.json();
  }

  // If the response is not OK, parse the error body and throw.
  const errorBody = await response.json().catch(() => ({
    // Fallback if the error body isn't valid JSON
    error: "An unknown server error occurred.",
  }));

  const errorMessage = errorBody.error || `Request failed with status ${response.status}`;
  throw new Error(errorMessage);
};

// ====================================================================
// API SERVICE OBJECT
// ====================================================================

export const caseApi = {
  // --- Case Management ---

  /**
   * Retrieves all cases.
   * Corresponds to: GET /api/cases
   */
  getAllCases: async (): Promise<Case[]> => {
    const response = await fetch(`${API_BASE_URL}${endpoints.CASES}`);
    return handleApiResponse(response);
  },

  /**
   * Retrieves a specific case by its ID.
   * Corresponds to: GET /api/cases/{id}
   * @param caseId - The UUID of the case to retrieve.
   */
  getCaseById: async (caseId: string): Promise<Case> => {
    const response = await fetch(`${API_BASE_URL}${endpoints.CASE_BY_ID(caseId)}`);
    return handleApiResponse(response);
  },

  /**
   * Submits a new child marriage case.
   * Corresponds to: POST /api/cases
   * @param caseData - The data for the new case.
   */
  createCase: async (caseData: Omit<Case, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<Case> => {
    const response = await fetch(`${API_BASE_URL}${endpoints.CASES}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(caseData),
    });
    return handleApiResponse(response);
  },

  /**
   * Updates an existing case.
   * Corresponds to: PUT /api/cases/{id}
   * @param caseId - The UUID of the case to update.
   * @param caseData - The updated data for the case.
   */
  updateCase: async (caseId: string, caseData: Partial<Case>): Promise<Case> => {
    const response = await fetch(`${API_BASE_URL}${endpoints.CASE_BY_ID(caseId)}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(caseData),
    });
    return handleApiResponse(response);
  },

  /**
   * Deletes a specific case by its ID.
   * Corresponds to: DELETE /api/cases/{id}
   * @param caseId - The UUID of the case to delete.
   */
  deleteCase: async (caseId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}${endpoints.CASE_BY_ID(caseId)}`, {
      method: 'DELETE',
    });
    await handleApiResponse(response); // Handles errors and 204 No Content
  },

  // --- Team Formation ---

  /**
   * Creates a new team formation for a specific case.
   * Corresponds to: POST /api/team-formations
   * @param teamData - The details of the team members to assign.
   */
  createTeamFormation: async (teamData: {
    caseId: string;
    policePersonId: string;
    dicePersonId: string;
    adminPersonId: string;
  }): Promise<TeamFormation> => {
    const response = await fetch(`${API_BASE_URL}${endpoints.TEAM_FORMATIONS}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teamData),
    });
    return handleApiResponse(response);
  },

  /**
   * Retrieves details of a specific team formation by its ID.
   * Corresponds to: GET /api/team-formations/{id}
   * @param formationId - The UUID of the team formation to retrieve.
   */
  getTeamFormationById: async (formationId: string): Promise<TeamFormation> => {
    const response = await fetch(`${API_BASE_URL}${endpoints.TEAM_FORMATION_BY_ID(formationId)}`);
    return handleApiResponse(response);
  },

  /**
   * Handles the response (accept/reject) from a team member.
   * Corresponds to: PUT /api/team-formations/{id}/response
   * @param formationId - The UUID of the team formation.
   * @param department - The responding department ('POLICE', 'DICE', 'ADMINISTRATION').
   * @param status - The response status ('ACCEPTED', 'REJECTED').
   */
  updateTeamResponse: async (
    formationId: string,
    department: 'POLICE' | 'DICE' | 'ADMINISTRATION',
    status: 'ACCEPTED' | 'REJECTED'
  ): Promise<void> => {
    const url = new URL(`${API_BASE_URL}${endpoints.TEAM_FORMATION_RESPONSE(formationId)}`);
    url.searchParams.append('department', department);
    url.searchParams.append('status', status);

    const response = await fetch(url.toString(), {
      method: 'PUT',
    });
    await handleApiResponse(response);
  },

  // --- Manual Intervention ---

  /**
   * Manually forms a team for a specific case.
   * Corresponds to: POST /api/cases/{caseId}/team
   * @param caseId - The UUID of the case.
   * @param teamData - The details of the team members to assign.
   */
  manuallyAssignTeam: async (
    caseId: string,
    teamData: { policePersonId: string; dicePersonId: string; adminPersonId: string }
  ): Promise<TeamFormation> => {
    const response = await fetch(`${API_BASE_URL}${endpoints.MANUAL_TEAM_ASSIGNMENT(caseId)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teamData),
    });
    return handleApiResponse(response);
  },
};