export interface ApiResponse<T> {
  data: T
  error: boolean
  message: string
  status: number
}

export interface ApiErrorResponse {
  error: boolean
  message: string | string[]
  status: number
}

export interface GetDataResponse<T> {
  data: {
    items: T
    pager: Pager
  }
}

export interface Pager {
  totalCount: number
  totalPages: number
  currentPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}
