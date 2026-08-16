export interface User {
  id: string
  nome: string
  email: string
  ativo: boolean
  perfil: 'ADMIN' | 'USER'
}

export interface CreateUserPayload {
  nome: string
  email: string
  senha: string
  ativo?: boolean
}

export interface UpdateUserPayload {
  nome: string
}
