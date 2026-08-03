<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAlimentoStore } from '@/stores/alimento.store'

const router = useRouter()
const alimentoStore = useAlimentoStore()

onMounted(() => {
  alimentoStore.fetchAll()
})

async function handleDelete(id: string) {
  if (confirm('Tem certeza que deseja excluir este item?')) {
    await alimentoStore.remove(id)
  }
}
</script>

<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold text-slate-900">Alimentação</h2>
        <p class="mt-1 text-sm text-slate-500">Itens de alimentação cadastrados.</p>
      </div>
      <RouterLink
        :to="{ name: 'alimentacao-new' }"
        class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        + Novo Alimento
      </RouterLink>
    </div>

    <div v-if="alimentoStore.loading" class="rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
      Carregando alimentos...
    </div>

    <div
      v-else-if="alimentoStore.error"
      class="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700"
    >
      {{ alimentoStore.error }}
    </div>

    <div
      v-else-if="alimentoStore.alimentos.length === 0"
      class="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500"
    >
      Nenhum item de alimentação cadastrado ainda.
    </div>

    <div v-else class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table class="min-w-full divide-y divide-slate-200">
        <thead class="bg-slate-50">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Alimento</th>
            <th class="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500">Ações</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200">
          <tr v-for="alimento in alimentoStore.alimentos" :key="alimento.id" class="hover:bg-slate-50">
            <td class="px-4 py-3 text-sm font-medium text-slate-900">{{ alimento.alimentacao }}</td>
            <td class="px-4 py-3 text-right text-sm">
              <button
                @click="router.push({ name: 'alimentacao-edit', params: { id: alimento.id } })"
                class="mr-3 text-indigo-600 hover:text-indigo-800"
              >
                Editar
              </button>
              <button
                @click="handleDelete(alimento.id)"
                class="text-red-600 hover:text-red-800"
              >
                Excluir
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>