import { createRouter, createWebHistory } from 'vue-router'
import PlayView from '@/views/PlayView.vue';
import GuestLayout from '@/components/layout/GuestLayout.vue';
import MainMenuView from '@/views/MainMenuView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: GuestLayout,
      redirect: to => {
        return {path: "/menu"}
      },
      children: [
        {
          path: 'menu',
          component: MainMenuView,
        },
        {
          path: 'play',
          component: PlayView,
        },
        
      ]
    },
  ]
})

export default router
