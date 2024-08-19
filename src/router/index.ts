import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/discovery',
      meta: {auth: false}
    },
    {
      path: '/discovery',
      name: '/discovery',
      component: () => import('@/views/home/DiscoveryView.vue'),
      meta: {auth: false}
    }
  ]
})

export default router;
