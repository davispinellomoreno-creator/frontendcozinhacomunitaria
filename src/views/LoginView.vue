<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const error = ref('')
const loading = ref(false)

async function handleSubmit() {
  error.value = ''
  loading.value = true
  try {
    await auth.login({ email: email.value, password: password.value })
    router.push({ name: 'dashboard' })
  } catch {
    error.value = 'E-mail ou senha inválidos.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen bg-white">
    <!-- Painel de marca -->
    <div class="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-slate-900 p-12 text-white lg:flex">
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-indigo-600/30 blur-3xl"></div>
        <div class="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-3xl"></div>
      </div>

      <div class="relative z-10 flex items-center gap-2.5">
        <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500 font-bold text-white">C</div>
        <span class="text-lg font-semibold tracking-tight">Painel CRM</span>
      </div>

      <div class="relative z-10 max-w-md">
        <h2 class="text-3xl font-bold leading-tight tracking-tight">
          Gerencie seus clientes e produtos em um só lugar.
        </h2>
        <p class="mt-4 text-sm leading-relaxed text-slate-300">
          Acompanhe métricas, cadastre usuários e mantenha seu catálogo sempre atualizado com uma
          plataforma pensada para o seu dia a dia.
        </p>

        <ul class="mt-8 space-y-3">
          <li class="flex items-center gap-2.5 text-sm text-slate-200">
            <svg class="h-4 w-4 shrink-0 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
            </svg>
            Visão consolidada em tempo real
          </li>
          <li class="flex items-center gap-2.5 text-sm text-slate-200">
            <svg class="h-4 w-4 shrink-0 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
            </svg>
            Gestão de usuários e produtos
          </li>
          <li class="flex items-center gap-2.5 text-sm text-slate-200">
            <svg class="h-4 w-4 shrink-0 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
            </svg>
            Acesso seguro e centralizado
          </li>
        </ul>
      </div>

      <p class="relative z-10 text-xs text-slate-400">© 2026 Painel CRM. Todos os direitos reservados.</p>
    </div>

    <!-- Formulário -->
    <div class="flex w-full flex-col justify-center px-6 py-12 sm:px-12 lg:w-1/2 lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm">
        <div class="mb-8 flex items-center gap-2.5 lg:hidden">
          <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 font-bold text-white">C</div>
          <span class="text-lg font-semibold tracking-tight text-slate-900">Painel CRM</span>
        </div>

        <h1 class="text-2xl font-bold tracking-tight text-slate-900">Bem-vindo de volta</h1>
        <p class="mt-2 text-sm text-slate-500">Entre com suas credenciais para acessar o painel.</p>

        <form class="mt-8 space-y-5" @submit.prevent="handleSubmit">
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700" for="email">E-mail</label>
            <div class="relative">
              <svg class="pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 4a2 2 0 0 0-2 2v.217l9 5.4 9-5.4V6a2 2 0 0 0-2-2H3Z" />
                <path d="m19 8.383-8.607 5.164a.75.75 0 0 1-.786 0L1 8.383V14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.383Z" />
              </svg>
              <input
                id="email"
                v-model="email"
                type="email"
                autocomplete="email"
                required
                placeholder="voce@empresa.com"
                class="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>
          </div>

          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700" for="password">Senha</label>
            <div class="relative">
              <svg class="pointer-events-none absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clip-rule="evenodd" />
              </svg>
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                required
                placeholder="••••••••"
                class="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                @click="showPassword = !showPassword"
              >
                <svg v-if="showPassword" class="h-4.5 w-4.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.3 10.3 0 0 0 3.093-4.293 1.25 1.25 0 0 0 0-.968C17.94 6.44 14.665 3.75 10 3.75c-1.28 0-2.462.207-3.51.575l-3.21-3.105ZM7 8.5a3 3 0 0 0 4.5 2.6l-3.9-3.9A3 3 0 0 0 7 8.5Z" />
                  <path d="M10.5 12.984 7.014 9.498a3 3 0 0 0 3.487 3.487ZM2.199 10.484A10.3 10.3 0 0 0 2 10c1.007 3.307 4.28 6 8.945 6a9.7 9.7 0 0 0 2.61-.35l-1.11-1.108a3 3 0 0 1-4-4L4.5 6.598" />
                </svg>
                <svg v-else class="h-4.5 w-4.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                  <path fill-rule="evenodd" d="M.664 10.59a1.65 1.65 0 0 1 0-1.186A10.3 10.3 0 0 1 10 3.75c4.29 0 7.863 2.708 9.336 5.654.14.28.14.652 0 .932A10.3 10.3 0 0 1 10 16.25c-4.29 0-7.863-2.708-9.336-5.654Z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <p v-if="error" class="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700">
            <svg class="h-4.5 w-4.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
            </svg>
            {{ error }}
          </p>

          <button
            type="submit"
            :disabled="loading"
            class="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg v-if="loading" class="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Z" />
            </svg>
            {{ loading ? 'Entrando...' : 'Entrar' }}
          </button>
        </form>

        <p class="mt-8 text-center text-sm text-slate-500">
          Não tem uma conta?
          <RouterLink :to="{ name: 'register' }" class="font-semibold text-indigo-600 hover:text-indigo-700">
            Criar conta
          </RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>
