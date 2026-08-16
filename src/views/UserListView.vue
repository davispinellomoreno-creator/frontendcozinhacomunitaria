<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user.store'

const userStore = useUserStore()

onMounted(() => {
  userStore.fetchAll()
})

async function togglePerfil(user: { id: string; perfil: string }) {
  const novoPerfil = user.perfil === 'ADMIN' ? 'USER' : 'ADMIN'
  const acao = novoPerfil === 'ADMIN' ? 'promover' : 'rebaixar'

  if (!confirm(`Deseja ${acao} esse usuário para ${novoPerfil}?`)) return

  try {
    await userStore.updatePerfil(user.id, novoPerfil as 'ADMIN' | 'USER')
  } catch {
    alert('Erro ao atualizar o perfil do usuário.')
  }
}

async function handleRemove(user: { id: string; nome: string | null }) {
  if (!confirm(`Remover o usuário "${user.nome ?? '(sem nome)'}"? Essa ação não pode ser desfeita.`)) return

  try {
    await userStore.remove(user.id)
  } catch {
    alert('Erro ao remover usuário.')
  }
}
</script>

<template>
  <div>
    <div class="mb-6">
      <h2 class="text-xl font-semibold text-slate-900">Usuários</h2>
      <p class="mt-1 text-sm text-slate-500">Gerencie os usuários e suas permissões.</p>
    </div>

    <div v-if="userStore.loading" class="rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
      Carregando usuários...
    </div>

    <div
      v-else-if="userStore.error"
      class="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700"
    >
      {{ userStore.error }}
    </div>

    <div
      v-else-if="userStore.users.length === 0"
      class="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500"
    >
      Nenhum usuário cadastrado ainda.
    </div>

    <div v-else class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table class="min-w-full divide-y divide-slate-200">
        <thead class="bg-slate-50">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Nome</th>
            <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Email</th>
            <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Status</th>
            <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Perfil</th>
            <th class="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500">Ações</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200">
          <tr v-for="user in userStore.users" :key="user.id" class="hover:bg-slate-50">
            <td class="px-4 py-3 text-sm font-medium text-slate-900">{{ user.nome ?? '—' }}</td>
            <td class="px-4 py-3 text-sm text-slate-500">{{ user.email ?? '—' }}</td>
            <td class="px-4 py-3 text-sm">
              <span
                class="rounded-full px-2.5 py-0.5 text-xs font-medium"
                :class="user.ativo ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'"
              >
                {{ user.ativo ? 'Ativo' : 'Inativo' }}
              </span>
            </td>
            <td class="px-4 py-3 text-sm">
              <span
                v-if="user.perfil"
                class="rounded-full px-2.5 py-0.5 text-xs font-medium"
                :class="user.perfil === 'ADMIN' ? 'bg-indigo-50 text-indigo-700' : 'bg-slate-100 text-slate-600'"
              >
                {{ user.perfil }}
              </span>
              <span v-else class="text-xs text-slate-400">—</span>
            </td>
            <td class="px-4 py-3 text-right text-sm">
              <button
                @click="togglePerfil(user as any)"
                class="mr-3 font-medium text-indigo-600 hover:underline"
              >
                {{ user.perfil === 'ADMIN' ? 'Rebaixar' : 'Promover' }}
              </button>
              <button
                @click="handleRemove(user)"
                class="font-medium text-red-600 hover:underline"
              >
                Remover
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>