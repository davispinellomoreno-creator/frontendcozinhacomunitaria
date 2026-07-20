import { api } from './api'
import type { Product, CreateProductPayload, UpdateProductPayload } from '@/types'

// Path deve bater com o @RequestMapping do ProdutoController no backend
const BASE = '/Produtos'

// O backend não envelopa a resposta em { success, data } e é inconsistente no nome
// do campo do produto: a listagem serializa "produtos" (plural), o detalhe "produto".
interface RawProduto {
  id: string
  produto?: string | null
  produtos?: string | null
  validade: string | null
  quantidade: number
}

function normalize(raw: RawProduto): Product {
  return {
    id: raw.id,
    produto: raw.produto ?? raw.produtos ?? '',
    validade: raw.validade,
    quantidade: raw.quantidade,
  }
}

export const productService = {
  async getAll(): Promise<Product[]> {
    const { data } = await api.get<RawProduto[]>(BASE)
    return data.map(normalize)
  },

  async getById(id: string): Promise<Product> {
    const { data } = await api.get<RawProduto>(`${BASE}/${id}`)
    return normalize(data)
  },

  async create(payload: CreateProductPayload): Promise<Product> {
    const { data } = await api.post<RawProduto>(BASE, payload)
    return normalize(data)
  },

  async update(id: string, payload: UpdateProductPayload): Promise<Product> {
    const { data } = await api.put<RawProduto>(`${BASE}/${id}`, payload)
    return normalize(data)
  },

  remove(id: string) {
    return api.delete<void>(`${BASE}/${id}`)
  },
}
