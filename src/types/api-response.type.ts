export interface ApiResponse<T> {
  data: T
  error: false
  message: string
  status: number
}

export interface ApiErrorResponse {
  error: true
  message: string | string[]
  status: number
}
