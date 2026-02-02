import type { League, Season } from '../../types';

export interface LeaguesResponse {
  leagues: League[];
}

export interface SeasonsResponse {
  seasons: Season[] | null;
}

export interface FetchOptions extends RequestInit {
  timeout?: number;
}