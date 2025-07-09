// src/utils/endpoints.ts

/**
 * ====================================================================
 * BASE CONFIGURATION
 * ====================================================================
 * Centralized base path for all API endpoints.
 * This makes it easy to version the API (e.g., change to '/api/v2')
 * or switch environments without touching every endpoint string.
 */
export const API_BASE_PATH = "/api";


/**
 * ====================================================================
 * CASE MANAGEMENT ENDPOINTS
 * ====================================================================
 * Endpoints related to creating, retrieving, updating, and deleting cases.
 */

// POST /api/cases
// GET /api/cases
export const CASES = `${API_BASE_PATH}/cases`;

// GET /api/cases/{id}
// PUT /api/cases/{id}
// DELETE /api/cases/{id}
export const CASE_BY_ID = (caseId: string): string => `${CASES}/${caseId}`;

/**
 * ====================================================================
 * TEAM FORMATION ENDPOINTS
 * ====================================================================
 * Endpoints for managing the formation and responses of intervention teams.
 */

// POST /api/team-formations
export const TEAM_FORMATIONS = `${API_BASE_PATH}/team-formations`;

// GET /api/team-formations/{id}
export const TEAM_FORMATION_BY_ID = (formationId: string): string => `${TEAM_FORMATIONS}/${formationId}`;

// PUT /api/team-formations/{id}/response
export const TEAM_FORMATION_RESPONSE = (formationId: string): string => `${TEAM_FORMATION_BY_ID(formationId)}/response`;


/**
 * ====================================================================
 * MANUAL INTERVENTION ENDPOINTS
 * ====================================================================
 * Endpoints for exceptional cases or manual administrative actions.
 */

// POST /api/cases/{caseId}/team
// This endpoint is for manually assigning a team to an existing case.
export const MANUAL_TEAM_ASSIGNMENT = (caseId: string): string => `${CASE_BY_ID(caseId)}/team`;