export interface Alimento {
  id: number
  nome: string
  calorias?: number
  proteinas?: number
  carboidratos?: number
  gorduras?: number
  categoria?: string
  created_at?: string
  updated_at?: string
}

export interface CreateAlimentoPayload {
  nome: string
  calorias?: number
  proteinas?: number
  carboidratos?: number
  gorduras?: number
  categoria?: string
}

export interface UpdateAlimentoPayload {
  nome?: string
  calorias?: number
  proteinas?: number
  carboidratos?: number
  gorduras?: number
  categoria?: string
}
