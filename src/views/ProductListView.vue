<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useProductStore } from '@/stores/product.store'
import type { Product } from '@/types'

const productStore = useProductStore()

const removingId = ref<number | null>(null)
const removeError = ref('')

onMounted(() => {
  productStore.fetchAll()
})

function formatPrice(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

async function handleRemove(product: Product) {
  if (!confirm(`Remover o produto "${product.nome}"?`)) return

  removeError.value = ''
  removingId.value = product.id
  try {
    await productStore.remove(product.id)
  } catch {
    removeError.value = productStore.error ?? 'Não foi possível remover o produto. Tente novamente.'
  } finally {
    removingId.value = null
  }
}
</script>

<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h2 class="text-xl font-semibold text-slate-900">Produtos</h2>
        <p class="mt-1 text-sm text-slate-500">Gerencie o catálogo de produtos cadastrados.</p>
      </div>
      <RouterLink
        :to="{ name: 'products-new' }"
        class="flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
      >
        <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
        Novo produto
      </RouterLink>
    </div>

    <p v-if="removeError" class="mb-4 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700">
      <svg class="h-4.5 w-4.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
      </svg>
      {{ removeError }}
    </p>

    <div v-if="productStore.loading" class="rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
      Carregando produtos...
    </div>

    <div
      v-else-if="productStore.error"
      class="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700"
    >
      {{ productStore.error }}
    </div>

    <div
      v-else-if="productStore.products.length === 0"
      class="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500"
    >
      Nenhum produto cadastrado ainda.
    </div>

    <div v-else class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <table class="min-w-full divide-y divide-slate-200">
        <thead class="bg-slate-50">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Nome</th>
            <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Categoria</th>
            <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Preço</th>
            <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500">Quantidade</th>
            <th class="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-500">Ações</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200">
          <tr v-for="product in productStore.products" :key="product.id" class="hover:bg-slate-50">
            <td class="px-4 py-3 text-sm font-medium text-slate-900">{{ product.nome }}</td>
            <td class="px-4 py-3 text-sm text-slate-500">
              <span v-if="product.categoria" class="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                {{ product.categoria }}
              </span>
              <span v-else>—</span>
            </td>
            <td class="px-4 py-3 text-sm text-slate-700">{{ formatPrice(product.preco) }}</td>
            <td class="px-4 py-3 text-sm text-slate-700">
              <span
                class="rounded-full px-2.5 py-0.5 text-xs font-medium"
                :class="product.quantidade > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'"
              >
                {{ product.quantidade }}
              </span>
            </td>
            <td class="px-4 py-3 text-right text-sm">
              <RouterLink
                :to="{ name: 'products-edit', params: { id: product.id } }"
                class="mr-3 font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                Editar
              </RouterLink>
              <button
                type="button"
                :disabled="removingId === product.id"
                class="font-medium text-red-600 hover:underline disabled:opacity-50"
                @click="handleRemove(product)"
              >
                {{ removingId === product.id ? 'Removendo...' : 'Remover' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
