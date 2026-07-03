export interface Product {
  id: number
  name: string
  // TODO: adicionar campos conforme a API do backend (price, description, category, etc.)
  created_at?: string
  updated_at?: string
}

export interface CreateProductPayload {
  name: string
  // TODO: adicionar campos conforme a API do backend
}

export interface UpdateProductPayload {
  name?: string
  // TODO: adicionar campos conforme a API do backend
}
