import { api } from './api'
import type { PaginationParams } from '@/types'
import type { User, CreateUserPayload, UpdateUserPayload } from '@/types'

const BASE = '/usuario'

export const userService = {
  getAll(params?: PaginationParams) {
    return api.get<User[]>(BASE, { params }) // ✅ array direto
  },

  getById(id: string) {
    return api.get<User>(`${BASE}/${id}`) // ✅ objeto direto
  },

  create(payload: CreateUserPayload) {
    return api.post<User>(BASE, payload)
  },

  update(id: string, payload: UpdateUserPayload) {
    return api.put<User>(`${BASE}/${id}`, payload)
  },

  updatePerfil(id: string, perfil: 'ADMIN' | 'USER') {
    return api.patch<User>(`${BASE}/${id}/perfil`, { perfil })
  },

  remove(id: string) {
    return api.delete<void>(`${BASE}/${id}`)
  },
}