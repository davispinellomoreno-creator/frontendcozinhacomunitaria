import { api } from './api'

export interface LoginPayload {
  email: string
  senha: string
}

export interface LoginResponse {
  token: string
}

export interface RegisterPayload {
  nome: string
  email: string
  senha: string
}

export const authService = {
  login(payload: LoginPayload) {
    return api.post<LoginResponse>('/auth/login', payload)
  },

  register(payload: RegisterPayload) {
    // Cadastro usa a rota do UsuarioController, não existe /auth/register
    return api.post('/usuario', payload)
  },

  logout() {
    // JWT é stateless — não precisa chamar o backend, só limpar o token local
    localStorage.removeItem('auth_token')
    window.location.href = '/login'
  },

  // ⚠️ /auth/me ainda não existe no backend — comentado até criarmos essa rota
  // me() {
  //   return api.get<{ id: string; nome: string; email: string }>('/auth/me')
  // },
}