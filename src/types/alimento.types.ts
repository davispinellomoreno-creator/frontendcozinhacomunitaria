export interface Alimento {
  id: string
  alimentacao: string
  criadoPor: string 
}

export interface CreateAlimentoPayload {
  alimentacao: string
}

export interface UpdateAlimentoPayload {
  alimentacao: string
}