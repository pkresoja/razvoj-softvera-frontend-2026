import About from '@/About.vue'
import Details from '@/Details.vue'
import Home from '@/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Home,
      meta: {
        title: 'Početna'
      }
    },
    {
      path: '/about',
      component: About,
      meta: {
        title: 'O nama'
      }
    },
    {
      path: '/toy/:permalink',
      component: Details,
      meta: {
        title: 'Detalji'
      }
    }
  ],
})

router.afterEach((to, from, next) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} :: RS2026`
  }
})

export default router
