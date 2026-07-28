<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAlimentoStore } from '@/stores/alimento.store'

const route = useRoute()
const router = useRouter()
const alimentoStore = useAlimentoStore()

const isEditing = computed(() => !!route.params.id)
const alimentoId = computed(() => {
  const id = route.params.id
  return Array.isArray(id) ? id[0] : id
})

const alimentacao = ref('')
const error = ref('')
const loading = ref(false)

onMounted(async () => {
  if (isEditing.value) {
    await alimentoStore.fetchById(alimentoId.value)
    const item = alimentoStore.selectedAlimento
    if (item) {
      alimentacao.value = item.alimentacao
    }
  }
})

async function handleSubmit() {
  error.value = ''
  loading.value = true
  try {
    const payload = { alimentacao: alimentacao.value }

    if (isEditing.value) {
      await alimentoStore.update(alimentoId.value, payload)
    } else {
      await alimentoStore.create(payload)
    }

    router.push({ name: 'alimentacao' })
  } catch (err) {
    error.value = 'Erro ao salvar alimento. Verifique os dados informados.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <div class="mb-6">
      <h2 class="text-xl font-semibold text-slate-900">
        {{ isEditing ? 'Editar alimento' : 'Novo alimento' }}
      </h2>
    </div>

    <form @submit.prevent="handleSubmit" class="max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <label class="block text-sm font-medium text-slate-700 mb-1">Nome do Alimento</label>
      <input
        v-model="alimentacao"
        type="text"
        required
        class="mb-4 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
      />

      <p v-if="error" class="mb-4 text-sm text-red-600">{{ error }}</p>

      <div class="flex gap-3">
        <button type="submit" :disabled="loading" class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50">
          {{ loading ? 'Salvando...' : 'Salvar' }}
        </button>
        <button type="button" @click="router.push({ name: 'alimentacao' })" class="rounded-md px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>