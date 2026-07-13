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
      <h1 class="text-xl font-semibold text-gray-900">Alimentação</h1>
      <p class="mt-1 text-sm text-gray-500">Itens de alimentação cadastrados.</p>
    </div>

    <div v-if="alimentoStore.loading" class="rounded-lg border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
      Carregando alimentos...
    </div>

    <div
      v-else-if="alimentoStore.error"
      class="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700"
    >
      {{ alimentoStore.error }}
    </div>

    <div
      v-else-if="alimentoStore.alimentos.length === 0"
      class="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500"
    >
      Nenhum item de alimentação cadastrado ainda.
    </div>

    <div v-else class="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Nome</th>
            <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Categoria</th>
            <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Calorias</th>
            <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Proteínas</th>
            <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Carboidratos</th>
            <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Gorduras</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="alimento in alimentoStore.alimentos" :key="alimento.id">
            <td class="px-4 py-3 text-sm font-medium text-gray-900">{{ alimento.nome }}</td>
            <td class="px-4 py-3 text-sm text-gray-700">{{ alimento.categoria ?? '—' }}</td>
            <td class="px-4 py-3 text-sm text-gray-700">{{ alimento.calorias ?? '—' }}</td>
            <td class="px-4 py-3 text-sm text-gray-700">{{ alimento.proteinas ?? '—' }}</td>
            <td class="px-4 py-3 text-sm text-gray-700">{{ alimento.carboidratos ?? '—' }}</td>
            <td class="px-4 py-3 text-sm text-gray-700">{{ alimento.gorduras ?? '—' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
