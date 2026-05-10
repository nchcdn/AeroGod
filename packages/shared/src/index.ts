// Shared types — used by both backend and frontend.

export interface HealthResponse {
  status: 'ok';
  timestamp: number;
}

export interface Player {
  id: string;
  name: string;
  equity: number;
  cash: number;
  createdAt: string;
  updatedAt: string;
}