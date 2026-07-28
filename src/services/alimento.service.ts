import { api } from './api'
import type { PaginationParams } from '@/types'
import type { Alimento, CreateAlimentoPayload, UpdateAlimentoPayload } from '@/types'

// Path deve bater com o @RequestMapping do AlimentacaoController no backend
const BASE = '/alimentacao'

export const alimentoService = {
  getAll(params?: PaginationParams) {
    return api.get<Alimento[]>(BASE, { params })
  },

  getById(id: string) {
    return api.get<Alimento>(`${BASE}/${id}`)
  },

  create(payload: CreateAlimentoPayload) {
    return api.post<Alimento>(BASE, payload)
  },

  update(id: string, payload: UpdateAlimentoPayload) {
    return api.put<Alimento>(`${BASE}/${id}`, payload)
  },

  remove(id: string) {
    return api.delete<void>(`${BASE}/${id}`)
  },
}