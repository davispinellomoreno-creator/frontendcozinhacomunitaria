export interface Product {
  id: number
  nome: string
  preco: number
  quantidade: number
  descricao?: string
  categoria?: string
  created_at?: string
  updated_at?: string
}

export interface CreateProductPayload {
  nome: string
  preco: number
  quantidade: number
  descricao?: string
  categoria?: string
}

export interface UpdateProductPayload {
  nome?: string
  preco?: number
  quantidade?: number
  descricao?: string
  categoria?: string
}
