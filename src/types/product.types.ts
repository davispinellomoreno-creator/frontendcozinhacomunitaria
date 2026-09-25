export interface Product {
  id: string
  produto: string
  validade: string | null
  quantidade: number
  criadoPor: string // ✅ novo campo
}
export interface CreateProductPayload {
  produtos: string // ⚠️ o backend espera "produtos" (plural) no DTO de entrada
  validade: string | null
  quantidade: number
}

export interface UpdateProductPayload {
  produtos: string
  validade: string | null
  quantidade: number
}