import { defineStore } from 'pinia'
import { authService, type LoginPayload, type RegisterPayload } from '@/services/auth.service'

interface AuthState {
  token: string | null
  perfil: string | null
}

// Payloads que a TELA usa (inglês) — a store traduz antes de chamar o service
interface RegisterFormPayload {
  name: string
  email: string
  password: string
}

interface LoginFormPayload {
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: localStorage.getItem('auth_token'),
    perfil: localStorage.getItem('user_perfil'),
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.perfil === 'ADMIN',
  },
  actions: {
    async login(payload: LoginFormPayload) {
      const loginPayload: LoginPayload = {
        email: payload.email,
        senha: payload.password,
      }
      const { data } = await authService.login(loginPayload)
      this.token = data.token
      this.perfil = data.perfil
      localStorage.setItem('auth_token', data.token)
      localStorage.setItem('user_perfil', data.perfil)
    },

    async register(payload: RegisterFormPayload) {
      const registerPayload: RegisterPayload = {
        nome: payload.name,
        email: payload.email,
        senha: payload.password,
      }
      await authService.register(registerPayload)
      // cadastro não gera token — usuário precisa fazer login depois
    },

    logout() {
      this.token = null
      this.perfil = null
      authService.logout() // já limpa localStorage e redireciona
    },
  },
})