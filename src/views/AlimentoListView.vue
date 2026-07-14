<script setup lang="ts">
import { onMounted } from 'vue'
import { useAlimentoStore } from '@/stores/alimento.store'

const alimentoStore = useAlimentoStore()

onMounted(() => {
  alimentoStore.fetchAll()
})
</script>

<template>
  <div>
    <div class="mb-6">
      <h2 class="text-xl font-semibold text-slate-900">Alimentação</h2>
      <p class="mt-1 text-sm text-slate-500">Itens de alimentação cadastrados.</p>
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
            <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Nome</th>
            <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Categoria</th>
            <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Calorias</th>
            <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Proteínas</th>
            <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Carboidratos</th>
            <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Gorduras</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200">
          <tr v-for="alimento in alimentoStore.alimentos" :key="alimento.id" class="hover:bg-slate-50">
            <td class="px-4 py-3 text-sm font-medium text-slate-900">{{ alimento.nome }}</td>
            <td class="px-4 py-3 text-sm text-slate-500">
              <span v-if="alimento.categoria" class="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                {{ alimento.categoria }}
              </span>
              <span v-else>—</span>
            </td>
            <td class="px-4 py-3 text-sm text-slate-700">{{ alimento.calorias ?? '—' }}</td>
            <td class="px-4 py-3 text-sm text-slate-700">{{ alimento.proteinas ?? '—' }}</td>
            <td class="px-4 py-3 text-sm text-slate-700">{{ alimento.carboidratos ?? '—' }}</td>
            <td class="px-4 py-3 text-sm text-slate-700">{{ alimento.gorduras ?? '—' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
