/**
 * API base URL for the CoachApp backend.
 * Set EXPO_PUBLIC_API_URL in a root .env file (see .env.example).
 */
export const API_URL =
  process.env.EXPO_PUBLIC_API_URL?.trim() || 'http://localhost:3001';

export const apiRoutes = {
  health: `${API_URL}/api/health`,
  people: `${API_URL}/api/people`,
  attendance: `${API_URL}/api/attendance`,
} as const;
