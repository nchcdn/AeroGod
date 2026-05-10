// Shared types â€” used by both backend and frontend.
// As the game grows, add new entities here.

export interface HealthResponse {
  status: 'ok';
  timestamp: number;
}

export interface Player {
  id: string;
  name: string;
  createdAt: string;
}
