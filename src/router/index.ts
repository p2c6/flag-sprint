import { createRouter, createWebHistory } from 'vue-router'
import PlayView from '@/views/PlayView.vue';
import GuestLayout from '@/components/layout/GuestLayout.vue';
import MainMenuView from '@/views/MainMenuView.vue';
import BestScoreView from '@/views/BestScoreView.vue';
import InstructionView from '@/views/InstructionView.vue';

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
          name: 'menu',
          component: MainMenuView,
        },
        {
          path: 'play',
          name: 'play',
          component: PlayView,
        },
        {
          path: 'best',
          name: 'best',
          component: BestScoreView,
        },
        {
          path: 'instruction',
          name: 'instruction',
          component: InstructionView,
        },
      ]
    },
  ]
})

export default router
