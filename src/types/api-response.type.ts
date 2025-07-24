export interface ApiSuccessResponse<T> {
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

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse
