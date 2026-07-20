<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product.store'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

const productId = computed(() => {
  const id = route.params.id
  return typeof id === 'string' ? id : null
})
const isEditing = computed(() => productId.value !== null)

const form = reactive({
  produto: '',
  validade: '',
  quantidade: 0,
})

const fieldErrors = reactive({
  produto: '',
  quantidade: '',
})

const loading = ref(false)
const saving = ref(false)
const submitError = ref('')
const submitSuccess = ref(false)

onMounted(async () => {
  if (!isEditing.value) return

  loading.value = true
  try {
    await productStore.fetchById(productId.value as string)
    const product = productStore.selectedProduct
    if (product) {
      form.produto = product.produto
      form.validade = product.validade ?? ''
      form.quantidade = product.quantidade
    }
  } finally {
    loading.value = false
  }
})

function validate() {
  fieldErrors.produto = form.produto.trim() ? '' : 'Informe o nome do produto.'
  fieldErrors.quantidade = form.quantidade >= 0 ? '' : 'A quantidade não pode ser negativa.'
  return !fieldErrors.produto && !fieldErrors.quantidade
}

async function handleSubmit() {
  submitError.value = ''
  submitSuccess.value = false

  if (!validate()) return

  const payload = {
    produtos: form.produto.trim(),
    validade: form.validade || null,
    quantidade: form.quantidade,
  }

  saving.value = true
  try {
    if (isEditing.value) {
      await productStore.update(productId.value as string, payload)
    } else {
      await productStore.create(payload)
    }
    submitSuccess.value = true
    router.push({ name: 'products-list' })
  } catch (err) {
    console.error('Falha ao salvar produto:', err)
    submitError.value =
      productStore.error ??
      (isEditing.value
        ? 'Não foi possível atualizar o produto. Verifique os dados e tente novamente.'
        : 'Não foi possível criar o produto. Verifique os dados e tente novamente.')
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="mx-auto max-w-xl">
    <div class="mb-6">
      <h2 class="text-xl font-semibold text-slate-900">
        {{ isEditing ? 'Editar produto' : 'Novo produto' }}
      </h2>
      <p class="mt-1 text-sm text-slate-500">
        {{ isEditing ? 'Atualize as informações do produto.' : 'Preencha os dados para cadastrar um novo produto.' }}
      </p>
    </div>

    <div v-if="loading" class="rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500">
      Carregando produto...
    </div>

    <form v-else class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm" @submit.prevent="handleSubmit">
      <label class="mb-1 block text-sm font-medium text-slate-700" for="produto">Nome do produto</label>
      <input
        id="produto"
        v-model="form.produto"
        type="text"
        class="mb-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
      />
      <p v-if="fieldErrors.produto" class="mb-3 text-xs text-red-600">{{ fieldErrors.produto }}</p>
      <div v-else class="mb-3"></div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700" for="validade">Validade</label>
          <input
            id="validade"
            v-model="form.validade"
            type="date"
            class="mb-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-slate-700" for="quantidade">Quantidade</label>
          <input
            id="quantidade"
            v-model.number="form.quantidade"
            type="number"
            step="1"
            min="0"
            class="mb-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
          <p v-if="fieldErrors.quantidade" class="text-xs text-red-600">{{ fieldErrors.quantidade }}</p>
        </div>
      </div>

      <p v-if="submitError" class="mb-4 mt-4 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700">
        <svg class="h-4.5 w-4.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
        </svg>
        {{ submitError }}
      </p>

      <div class="mt-4 flex items-center gap-3">
        <button
          type="submit"
          :disabled="saving"
          class="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {{ saving ? 'Salvando...' : 'Salvar' }}
        </button>
        <RouterLink
          :to="{ name: 'products-list' }"
          class="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
        >
          Cancelar
        </RouterLink>
      </div>
    </form>
  </div>
</template>
