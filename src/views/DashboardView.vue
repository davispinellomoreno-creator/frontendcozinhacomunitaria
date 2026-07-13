<script setup lang="ts">
import { onMounted, ref } from 'vue'
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
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
    <div class="rounded-lg border border-gray-200 bg-white p-5">
      <p class="text-sm text-gray-500">Produtos cadastrados</p>
      <p class="mt-1 text-2xl font-semibold text-gray-900">
        {{ productStore.loading ? '—' : productStore.total }}
      </p>
    </div>
    <div class="rounded-lg border border-gray-200 bg-white p-5">
      <p class="text-sm text-gray-500">Itens de alimentação</p>
      <p class="mt-1 text-2xl font-semibold text-gray-900">
        {{ alimentoStore.loading ? '—' : alimentoStore.total }}
      </p>
    </div>
    <div class="rounded-lg border border-gray-200 bg-white p-5">
      <p class="text-sm text-gray-500">Usuários cadastrados</p>
      <p class="mt-1 text-2xl font-semibold text-gray-900">
        {{ usersError ? '—' : userStore.loading ? '—' : userStore.total }}
      </p>
    </div>
  </div>
</template>
