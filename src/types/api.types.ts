export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface PaginatedData<T> {
  items: T[]
  total: number
  page: number
  per_page: number
}

export type PaginatedResponse<T> = ApiResponse<PaginatedData<T>>

export interface PaginationParams {
  page?: number
  per_page?: number
  search?: string
}
