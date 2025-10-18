// Types pour la réponse paginée basée sur PaginatedResponseDto
export type PaginatedResponse<T> = {
  data: T[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Interface pour les paramètres de pagination
export type PaginationParams = {
  page: number;
  limit: number;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  organizer: string;
  category: string;
  status: 'published' | 'draft';
}

export interface StatCardData {
  id: number;
  title: string;
  value: number;
  icon: string;
  color: string;
}