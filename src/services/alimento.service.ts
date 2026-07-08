import { api } from './api'
import type { ApiResponse, PaginatedResponse, PaginationParams } from '@/types'
import type { Alimento, CreateAlimentoPayload, UpdateAlimentoPayload } from '@/types'

// TODO: ajustar os endpoints conforme a API do backend
const BASE = '/alimentos'

export const alimentoService = {
  getAll(params?: PaginationParams) {
    return api.get<PaginatedResponse<Alimento>>(BASE, { params })
  },

  getById(id: number) {
    return api.get<ApiResponse<Alimento>>(`${BASE}/${id}`)
  },

  create(payload: CreateAlimentoPayload) {
    return api.post<ApiResponse<Alimento>>(BASE, payload)
  },

  update(id: number, payload: UpdateAlimentoPayload) {
    return api.put<ApiResponse<Alimento>>(`${BASE}/${id}`, payload)
  },

  remove(id: number) {
    return api.delete<ApiResponse<null>>(`${BASE}/${id}`)
  },
}
