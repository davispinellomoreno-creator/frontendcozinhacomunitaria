import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { public: true },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
      meta: { public: true },
    },
    {
      path: '/',
      component: () => import('@/layout/DashboardLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
        },
        {
          path: 'produtos',
          name: 'products-list',
          component: () => import('@/views/ProductListView.vue'),
        },
        {
          path: 'produtos/novo',
          name: 'products-new',
          component: () => import('@/views/ProductFormView.vue'),
        },
        {
          path: 'produtos/:id/editar',
          name: 'products-edit',
          component: () => import('@/views/ProductFormView.vue'),
        },
        {
          path: 'alimentacao',
          name: 'alimentacao-list',
          component: () => import('@/views/AlimentoListView.vue'),
        },
        {
          path: 'alimentacao/novo',
          name: 'alimentacao-new',
          component: () => import('@/views/AlimentoFromView.vue'),
        },
        {
          path: 'alimentacao/:id/editar',
          name: 'alimentacao-edit',
          component: () => import('@/views/AlimentoFromView.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: () => {
        const auth = useAuthStore()
        return auth.isAuthenticated ? { name: 'dashboard' } : { name: 'login' }
      },
    },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login' }
  }

  if ((to.name === 'login' || to.name === 'register') && auth.isAuthenticated) {
    return { name: 'dashboard' }
  }
})

export default router
