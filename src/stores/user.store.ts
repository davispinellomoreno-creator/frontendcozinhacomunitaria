import { defineStore } from 'pinia'
import { userService } from '@/services/user.service'
import type { User, CreateUserPayload, UpdateUserPayload, PaginationParams } from '@/types'

interface UserState {
  users: User[]
  selectedUser: User | null
  total: number
  loading: boolean
  error: string | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    users: [],
    selectedUser: null,
    total: 0,
    loading: false,
    error: null,
  }),

  getters: {
    getUserById: (state) => (id: number) =>
      state.users.find((u) => u.id === id) ?? null,
  },

  actions: {
    async fetchAll(params?: PaginationParams) {
      this.loading = true
      this.error = null
      try {
        const { data } = await userService.getAll(params)
        this.users = data.data.items
        this.total = data.data.total
      } catch (err: any) {
        this.error = err.response?.data?.message ?? 'Erro ao buscar usuários'
      } finally {
        this.loading = false
      }
    },

    async fetchById(id: number) {
      this.loading = true
      this.error = null
      try {
        const { data } = await userService.getById(id)
        this.selectedUser = data.data
      } catch (err: any) {
        this.error = err.response?.data?.message ?? 'Erro ao buscar usuário'
      } finally {
        this.loading = false
      }
    },

    async create(payload: CreateUserPayload) {
      this.loading = true
      this.error = null
      try {
        const { data } = await userService.create(payload)
        this.users.push(data.data)
      } catch (err: any) {
        this.error = err.response?.data?.message ?? 'Erro ao criar usuário'
        throw err
      } finally {
        this.loading = false
      }
    },

    async update(id: number, payload: UpdateUserPayload) {
      this.loading = true
      this.error = null
      try {
        const { data } = await userService.update(id, payload)
        const index = this.users.findIndex((u) => u.id === id)
        if (index !== -1) this.users[index] = data.data
        if (this.selectedUser?.id === id) this.selectedUser = data.data
      } catch (err: any) {
        this.error = err.response?.data?.message ?? 'Erro ao atualizar usuário'
        throw err
      } finally {
        this.loading = false
      }
    },

    async remove(id: number) {
      this.loading = true
      this.error = null
      try {
        await userService.remove(id)
        this.users = this.users.filter((u) => u.id !== id)
        if (this.selectedUser?.id === id) this.selectedUser = null
      } catch (err: any) {
        this.error = err.response?.data?.message ?? 'Erro ao remover usuário'
        throw err
      } finally {
        this.loading = false
      }
    },
  },
})
