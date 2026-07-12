import axios from 'axios'


const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3070'

if (!import.meta.env.VITE_API_URL) {
  console.warn(
    '[api.ts] VITE_API_URL não definida no .env — usando fallback:',
    baseURL,
  )
}

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)
