import { defineStore } from 'pinia'
import { authService, type LoginPayload, type RegisterPayload } from '@/services/auth.service'

interface AuthState {
  token: string | null
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
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(payload: LoginFormPayload) {
      const loginPayload: LoginPayload = {
        email: payload.email,
        senha: payload.password,
      }
      const { data } = await authService.login(loginPayload)
      this.token = data.token
      localStorage.setItem('auth_token', data.token)
    },

    async register(payload: RegisterFormPayload) {
      const registerPayload: RegisterPayload = {
        nome: payload.name,
        email: payload.email,
        senha: payload.password,
      }
      const { data } = await authService.register(registerPayload)
      this.token = data.token
      localStorage.setItem('auth_token', data.token)
    },

    logout() {
      this.token = null
      authService.logout() // já limpa localStorage e redireciona
    },

    // ⚠️ comentado — rota /auth/me ainda não existe no backend
    // async fetchCurrentUser() {
    //   const { data } = await authService.me()
    //   this.user = data
    // },
  },
})
