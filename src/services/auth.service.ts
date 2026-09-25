import { api } from './api'

export interface LoginPayload {
  email: string
  senha: string
}

export interface LoginResponse {
  token: string
  perfil: string
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
    return api.post('/usuario', payload)
  },

  logout() {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user_perfil')
    window.location.href = '/login'
  },
}