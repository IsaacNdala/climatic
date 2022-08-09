import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/60m-forecast',
    name: '60mforecast',
    component: () => import('../views/60mForecast.vue')
  },
  {
    path: '/16d-forecast',
    name: '16dforecast',
    component: () => import('../views/16dForecast.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
