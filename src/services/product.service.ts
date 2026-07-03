import { api } from './api'
import type { ApiResponse, PaginatedResponse, PaginationParams } from '@/types'
import type { Product, CreateProductPayload, UpdateProductPayload } from '@/types'

// TODO: ajustar os endpoints conforme a API do backend
const BASE = '/products'

export const productService = {
  getAll(params?: PaginationParams) {
    return api.get<PaginatedResponse<Product>>(BASE, { params })
  },

  getById(id: number) {
    return api.get<ApiResponse<Product>>(`${BASE}/${id}`)
  },

  create(payload: CreateProductPayload) {
    return api.post<ApiResponse<Product>>(BASE, payload)
  },

  update(id: number, payload: UpdateProductPayload) {
    return api.put<ApiResponse<Product>>(`${BASE}/${id}`, payload)
  },

  remove(id: number) {
    return api.delete<ApiResponse<null>>(`${BASE}/${id}`)
  },
}
