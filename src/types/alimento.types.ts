export interface Alimento {
  id: number
  name: string
  // TODO: adicionar campos conforme a API do backend (calorias, proteinas, carboidratos, gorduras, categoria, etc.)
  created_at?: string
  updated_at?: string
}

export interface CreateAlimentoPayload {
  name: string
  // TODO: adicionar campos conforme a API do backend
}

export interface UpdateAlimentoPayload {
  name?: string
  // TODO: adicionar campos conforme a API do backend
}
