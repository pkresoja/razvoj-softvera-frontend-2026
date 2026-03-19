import About from '@/pages/About.vue'
import Details from '@/pages/Details.vue'
import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import User from '@/pages/User.vue'
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
    },
    {
      path: '/login',
      component: Login,
      meta: {
        title: 'Prijava'
      }
    },
    {
      path: '/user',
      component: User,
      meta: {
        title: 'Moj Profil'
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
