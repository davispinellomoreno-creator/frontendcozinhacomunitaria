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
    removeError.value = 'Não foi possível remover o produto. Tente novamente.'
  } finally {
    removingId.value = null
  }
}
</script>

<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-xl font-semibold text-gray-900">Produtos</h1>
        <p class="mt-1 text-sm text-gray-500">Gerencie o catálogo de produtos cadastrados.</p>
      </div>
      <RouterLink
        :to="{ name: 'products-new' }"
        class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
      >
        Novo produto
      </RouterLink>
    </div>

    <p v-if="removeError" class="mb-4 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700">
      {{ removeError }}
    </p>

    <div v-if="productStore.loading" class="rounded-lg border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
      Carregando produtos...
    </div>

    <div
      v-else-if="productStore.error"
      class="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-sm text-red-700"
    >
      {{ productStore.error }}
    </div>

    <div
      v-else-if="productStore.products.length === 0"
      class="rounded-lg border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500"
    >
      Nenhum produto cadastrado ainda.
    </div>

    <div v-else class="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Nome</th>
            <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Preço</th>
            <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Quantidade</th>
            <th class="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Ações</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="product in productStore.products" :key="product.id">
            <td class="px-4 py-3 text-sm font-medium text-gray-900">{{ product.nome }}</td>
            <td class="px-4 py-3 text-sm text-gray-700">{{ formatPrice(product.preco) }}</td>
            <td class="px-4 py-3 text-sm text-gray-700">{{ product.quantidade }}</td>
            <td class="px-4 py-3 text-right text-sm">
              <RouterLink
                :to="{ name: 'products-edit', params: { id: product.id } }"
                class="mr-3 font-medium text-gray-700 hover:underline"
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
