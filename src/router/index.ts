import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/discovery',
      meta: { auth: false },
    },
    {
      name: 'discovery',
      path: '/discovery',
      component: () => import('@/views/home/DiscoveryView.vue'),
      meta: { auth: false },
    },
    {
      name: 'songs',
      path: '/songList',
      component: () => import('@/views/songList/RecommendSongListView.vue'),
      meta: { auth: false },
    },
    {
      name: 'latestMusic',
      path: '/latestMusic',
      component: () => import('@/views/music/LatestMusicView.vue'),
      meta: { auth: false },
    },
  ],
});

export default router;
