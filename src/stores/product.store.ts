import { defineStore } from 'pinia'
import { productService } from '@/services/product.service'
import type { Product, CreateProductPayload, UpdateProductPayload, PaginationParams } from '@/types'

interface ProductState {
  products: Product[]
  selectedProduct: Product | null
  total: number
  loading: boolean
  error: string | null
}

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    products: [],
    selectedProduct: null,
    total: 0,
    loading: false,
    error: null,
  }),

  getters: {
    getProductById: (state) => (id: number) =>
      state.products.find((p) => p.id === id) ?? null,
  },

  actions: {
    async fetchAll(params?: PaginationParams) {
      this.loading = true
      this.error = null
      try {
        const { data } = await productService.getAll(params)
        this.products = data.data.items
        this.total = data.data.total
      } catch (err: any) {
        this.error = err.response?.data?.message ?? 'Erro ao buscar produtos'
      } finally {
        this.loading = false
      }
    },

    async fetchById(id: number) {
      this.loading = true
      this.error = null
      try {
        const { data } = await productService.getById(id)
        this.selectedProduct = data.data
      } catch (err: any) {
        this.error = err.response?.data?.message ?? 'Erro ao buscar produto'
      } finally {
        this.loading = false
      }
    },

    async create(payload: CreateProductPayload) {
      this.loading = true
      this.error = null
      try {
        const { data } = await productService.create(payload)
        this.products.push(data.data)
      } catch (err: any) {
        this.error = err.response?.data?.message ?? 'Erro ao criar produto'
        throw err
      } finally {
        this.loading = false
      }
    },

    async update(id: number, payload: UpdateProductPayload) {
      this.loading = true
      this.error = null
      try {
        const { data } = await productService.update(id, payload)
        const index = this.products.findIndex((p) => p.id === id)
        if (index !== -1) this.products[index] = data.data
        if (this.selectedProduct?.id === id) this.selectedProduct = data.data
      } catch (err: any) {
        this.error = err.response?.data?.message ?? 'Erro ao atualizar produto'
        throw err
      } finally {
        this.loading = false
      }
    },

    async remove(id: number) {
      this.loading = true
      this.error = null
      try {
        await productService.remove(id)
        this.products = this.products.filter((p) => p.id !== id)
        if (this.selectedProduct?.id === id) this.selectedProduct = null
      } catch (err: any) {
        this.error = err.response?.data?.message ?? 'Erro ao remover produto'
        throw err
      } finally {
        this.loading = false
      }
    },
  },
})
