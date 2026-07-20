import { defineStore } from 'pinia'
import { productService } from '@/services/product.service'
import type { Product, CreateProductPayload, UpdateProductPayload } from '@/types'

interface ProductState {
  products: Product[]
  selectedProduct: Product | null
  loading: boolean
  error: string | null
}

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
  }),

  getters: {
    total: (state) => state.products.length,
    getProductById: (state) => (id: string) =>
      state.products.find((p) => p.id === id) ?? null,
  },

  actions: {
    async fetchAll() {
      this.loading = true
      this.error = null
      try {
        this.products = await productService.getAll()
      } catch (err: any) {
        this.error = err.response?.data?.message ?? 'Erro ao buscar produtos'
      } finally {
        this.loading = false
      }
    },

    async fetchById(id: string) {
      this.loading = true
      this.error = null
      try {
        this.selectedProduct = await productService.getById(id)
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
        const product = await productService.create(payload)
        this.products.push(product)
      } catch (err: any) {
        this.error = err.response?.data?.message ?? 'Erro ao criar produto'
        throw err
      } finally {
        this.loading = false
      }
    },

    async update(id: string, payload: UpdateProductPayload) {
      this.loading = true
      this.error = null
      try {
        const product = await productService.update(id, payload)
        const index = this.products.findIndex((p) => p.id === id)
        if (index !== -1) this.products[index] = product
        if (this.selectedProduct?.id === id) this.selectedProduct = product
      } catch (err: any) {
        this.error = err.response?.data?.message ?? 'Erro ao atualizar produto'
        throw err
      } finally {
        this.loading = false
      }
    },

    async remove(id: string) {
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
