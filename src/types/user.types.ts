export interface User {
  id: number
  name: string
  email: string
  // TODO: adicionar campos conforme a API do backend
  created_at?: string
  updated_at?: string
}

export interface CreateUserPayload {
  name: string
  email: string
  password: string
  // TODO: adicionar campos conforme a API do backend
}

export interface UpdateUserPayload {
  name?: string
  email?: string
  // TODO: adicionar campos conforme a API do backend
}
