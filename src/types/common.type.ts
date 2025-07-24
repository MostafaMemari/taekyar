export interface PaginationQuery {
  page?: number
  take?: number
}

export type SortDirection = 'asc' | 'desc'

export type DateSort = 'updatedAt' | 'createdAt'
