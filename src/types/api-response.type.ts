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
