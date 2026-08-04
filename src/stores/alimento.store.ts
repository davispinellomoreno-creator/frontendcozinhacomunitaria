import { defineStore } from 'pinia'
import { alimentoService } from '@/services/alimento.service'
import type { Alimento, CreateAlimentoPayload, UpdateAlimentoPayload, PaginationParams } from '@/types'

interface AlimentoState {
  alimentos: Alimento[]
  selectedAlimento: Alimento | null
  total: number
  loading: boolean
  error: string | null
}

export const useAlimentoStore = defineStore('alimento', {
  state: (): AlimentoState => ({
    alimentos: [],
    selectedAlimento: null,
    total: 0,
    loading: false,
    error: null,
  }),

  getters: {
    getAlimentoById: (state) => (id: string) =>
      state.alimentos.find((a) => a.id === id) ?? null,
  },

  actions: {
    async fetchAll(params?: PaginationParams) {
      this.loading = true
      this.error = null
      try {
        const { data } = await alimentoService.getAll(params)
        this.alimentos = (data ?? []).filter((item) => item != null) // ✅ proteção contra undefined/null
        this.total = this.alimentos.length
      } catch (err: any) {
        this.error = err.response?.data?.message ?? 'Erro ao buscar alimentos'
      } finally {
        this.loading = false
      }
    },

    async fetchById(id: string) {
      this.loading = true
      this.error = null
      try {
        const { data } = await alimentoService.getById(id)
        this.selectedAlimento = data
      } catch (err: any) {
        this.error = err.response?.data?.message ?? 'Erro ao buscar alimento'
      } finally {
        this.loading = false
      }
    },

    async create(payload: CreateAlimentoPayload) {
      this.loading = true
      this.error = null
      try {
        const { data } = await alimentoService.create(payload)
        if (data) this.alimentos.push(data) // ✅ só adiciona se data existir
      } catch (err: any) {
        this.error = err.response?.data?.message ?? 'Erro ao criar alimento'
        throw err
      } finally {
        this.loading = false
      }
    },

    async update(id: string, payload: UpdateAlimentoPayload) {
      this.loading = true
      this.error = null
      try {
        const { data } = await alimentoService.update(id, payload)
        const index = this.alimentos.findIndex((a) => a.id === id)
        if (index !== -1 && data) this.alimentos[index] = data
        if (this.selectedAlimento?.id === id) this.selectedAlimento = data
      } catch (err: any) {
        this.error = err.response?.data?.message ?? 'Erro ao atualizar alimento'
        throw err
      } finally {
        this.loading = false
      }
    },

    async remove(id: string) {
      this.loading = true
      this.error = null
      try {
        await alimentoService.remove(id)
        this.alimentos = this.alimentos.filter((a) => a.id !== id)
        if (this.selectedAlimento?.id === id) this.selectedAlimento = null
      } catch (err: any) {
        this.error = err.response?.data?.message ?? 'Erro ao remover alimento'
        throw err
      } finally {
        this.loading = false
      }
    },
  },
})