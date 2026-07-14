<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useProductStore } from '@/stores/product.store'
import { useAlimentoStore } from '@/stores/alimento.store'
import { useUserStore } from '@/stores/user.store'

const productStore = useProductStore()
const alimentoStore = useAlimentoStore()
const userStore = useUserStore()

const usersError = ref(false)

onMounted(() => {
  productStore.fetchAll()
  alimentoStore.fetchAll()
  userStore.fetchAll().catch(() => {
    // usuário logado pode não ter permissão pra listar todos os usuários
    usersError.value = true
  })
})

const stats = computed(() => [
  {
    label: 'Produtos cadastrados',
    value: productStore.loading ? null : productStore.total,
    to: { name: 'products-list' },
    accent: 'bg-indigo-50 text-indigo-600',
    icon: 'M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z',
  },
  {
    label: 'Itens de alimentação',
    value: alimentoStore.loading ? null : alimentoStore.total,
    to: { name: 'alimentacao-list' },
    accent: 'bg-emerald-50 text-emerald-600',
    icon: 'M12 3c-3.5 0-6 2.5-6 6 0 4.5 6 12 6 12s6-7.5 6-12c0-3.5-2.5-6-6-6zM9 9a3 3 0 106 0 3 3 0 00-6 0z',
  },
  {
    label: 'Usuários cadastrados',
    value: usersError.value || userStore.loading ? null : userStore.total,
    to: null,
    accent: 'bg-amber-50 text-amber-600',
    icon: 'M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m5-2.13a4 4 0 100-8 4 4 0 000 8zm6 0a4 4 0 10-8 0',
  },
])
</script>

<template>
  <div>
    <div class="mb-6">
      <h2 class="text-xl font-semibold text-slate-900">Visão geral</h2>
      <p class="mt-1 text-sm text-slate-500">Resumo rápido do que está acontecendo no seu CRM.</p>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <component
        :is="stat.to ? 'RouterLink' : 'div'"
        v-for="stat in stats"
        :key="stat.label"
        :to="stat.to ?? undefined"
        class="group flex items-start justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow"
        :class="stat.to ? 'hover:shadow-md' : ''"
      >
        <div>
          <p class="text-sm text-slate-500">{{ stat.label }}</p>
          <p class="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            {{ stat.value === null ? '—' : stat.value }}
          </p>
        </div>
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" :class="stat.accent">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" :d="stat.icon" />
          </svg>
        </div>
      </component>
    </div>

    <div class="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-6">
      <p class="text-sm font-medium text-slate-700">Ações rápidas</p>
      <div class="mt-3 flex flex-wrap gap-3">
        <RouterLink
          :to="{ name: 'products-new' }"
          class="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          + Novo produto
        </RouterLink>
        <RouterLink
          :to="{ name: 'products-list' }"
          class="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Ver catálogo
        </RouterLink>
      </div>
    </div>
  </div>
</template>
