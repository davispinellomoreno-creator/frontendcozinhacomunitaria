import { api } from './api'
import type { ApiResponse, PaginatedResponse, PaginationParams } from '@/types'
import type { User, CreateUserPayload, UpdateUserPayload } from '@/types'

// TODO: ajustar os endpoints conforme a API do backend
const BASE = '/users'

export const userService = {
  getAll(params?: PaginationParams) {
    return api.get<PaginatedResponse<User>>(BASE, { params })
  },

  getById(id: number) {
    return api.get<ApiResponse<User>>(`${BASE}/${id}`)
  },

  create(payload: CreateUserPayload) {
    return api.post<ApiResponse<User>>(BASE, payload)
  },

  update(id: number, payload: UpdateUserPayload) {
    return api.put<ApiResponse<User>>(`${BASE}/${id}`, payload)
  },

  remove(id: number) {
    return api.delete<ApiResponse<null>>(`${BASE}/${id}`)
  },
}
