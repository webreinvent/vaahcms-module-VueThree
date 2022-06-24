import { createRouter, createWebHistory, createWebHashHistory, createMemoryHistory  } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dashboard from '../pages/dashboard/Dashboard.vue'


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
      {
          path: '/dashboard',
          name: 'dashboard',
          component: Dashboard
      },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
