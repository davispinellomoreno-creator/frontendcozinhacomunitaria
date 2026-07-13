<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product.store'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

const productId = computed(() => {
  const id = route.params.id
  return id ? Number(id) : null
})
const isEditing = computed(() => productId.value !== null)

const form = reactive({
  nome: '',
  preco: 0,
  quantidade: 0,
  descricao: '',
  categoria: '',
})

const fieldErrors = reactive({
  nome: '',
  preco: '',
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
    await productStore.fetchById(productId.value as number)
    const product = productStore.selectedProduct
    if (product) {
      form.nome = product.nome
      form.preco = product.preco
      form.quantidade = product.quantidade
      form.descricao = product.descricao ?? ''
      form.categoria = product.categoria ?? ''
    }
  } finally {
    loading.value = false
  }
})

function validate() {
  fieldErrors.nome = form.nome.trim() ? '' : 'Informe o nome do produto.'
  fieldErrors.preco = form.preco >= 0 ? '' : 'O preço não pode ser negativo.'
  fieldErrors.quantidade = form.quantidade >= 0 ? '' : 'A quantidade não pode ser negativa.'
  return !fieldErrors.nome && !fieldErrors.preco && !fieldErrors.quantidade
}

async function handleSubmit() {
  submitError.value = ''
  submitSuccess.value = false

  if (!validate()) return

  const payload = {
    nome: form.nome.trim(),
    preco: form.preco,
    quantidade: form.quantidade,
    descricao: form.descricao.trim() || undefined,
    categoria: form.categoria.trim() || undefined,
  }

  saving.value = true
  try {
    if (isEditing.value) {
      await productStore.update(productId.value as number, payload)
    } else {
      await productStore.create(payload)
    }
    submitSuccess.value = true
    router.push({ name: 'products-list' })
  } catch {
    submitError.value = isEditing.value
      ? 'Não foi possível atualizar o produto. Verifique os dados e tente novamente.'
      : 'Não foi possível criar o produto. Verifique os dados e tente novamente.'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <div class="mx-auto max-w-xl">
    <div class="mb-6">
      <h1 class="text-xl font-semibold text-gray-900">
        {{ isEditing ? 'Editar produto' : 'Novo produto' }}
      </h1>
      <p class="mt-1 text-sm text-gray-500">
        {{ isEditing ? 'Atualize as informações do produto.' : 'Preencha os dados para cadastrar um novo produto.' }}
      </p>
    </div>

    <div v-if="loading" class="rounded-lg border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
      Carregando produto...
    </div>

    <form v-else class="rounded-lg border border-gray-200 bg-white p-6" @submit.prevent="handleSubmit">
      <label class="mb-1 block text-sm font-medium text-gray-700" for="nome">Nome</label>
      <input
        id="nome"
        v-model="form.nome"
        type="text"
        class="mb-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
      />
      <p v-if="fieldErrors.nome" class="mb-3 text-xs text-red-600">{{ fieldErrors.nome }}</p>
      <div v-else class="mb-3"></div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700" for="preco">Preço (R$)</label>
          <input
            id="preco"
            v-model.number="form.preco"
            type="number"
            step="0.01"
            min="0"
            class="mb-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          <p v-if="fieldErrors.preco" class="text-xs text-red-600">{{ fieldErrors.preco }}</p>
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium text-gray-700" for="quantidade">Quantidade</label>
          <input
            id="quantidade"
            v-model.number="form.quantidade"
            type="number"
            step="1"
            min="0"
            class="mb-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          <p v-if="fieldErrors.quantidade" class="text-xs text-red-600">{{ fieldErrors.quantidade }}</p>
        </div>
      </div>

      <label class="mb-1 mt-3 block text-sm font-medium text-gray-700" for="categoria">Categoria</label>
      <input
        id="categoria"
        v-model="form.categoria"
        type="text"
        class="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
      />

      <label class="mb-1 block text-sm font-medium text-gray-700" for="descricao">Descrição</label>
      <textarea
        id="descricao"
        v-model="form.descricao"
        rows="3"
        class="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
      ></textarea>

      <p v-if="submitError" class="mb-4 rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700">
        {{ submitError }}
      </p>

      <div class="flex items-center gap-3">
        <button
          type="submit"
          :disabled="saving"
          class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {{ saving ? 'Salvando...' : 'Salvar' }}
        </button>
        <RouterLink
          :to="{ name: 'products-list' }"
          class="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          Cancelar
        </RouterLink>
      </div>
    </form>
  </div>
</template>
