// Common utility types used across the application

export type BaseEntity = {
  id: string
  createdAt?: string
  updatedAt?: string
}

export type ApiResponse<T> = {
  data: T
  success: boolean
  message?: string
  error?: string
}

export type PaginationParams = {
  page?: number
  limit?: number
  offset?: number
}

export type PaginatedResponse<T> = ApiResponse<T[]> & {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
