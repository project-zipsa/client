import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Join from '@/pages/Join.vue'
import Login from '@/pages/Login.vue'
import Checklist from '@/pages/Checklist.vue'
import CheckDetail from '@/pages/CheckDetail.vue'
import Dicts from '@/pages/Dicts.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/join',
      name: 'join',
      component: Join,
    },
    { path: '/login', name: 'login', component: Login },
    {
      path: '/check',
      name: 'checklist-main',
      component: Checklist,
    },
    { path: '/checklist/:id', name: 'checklistId', component: CheckDetail },
    {
      path: '/dicts',
      name: 'dicts',
      component: Dicts,
    },
    {
      path: '/docu/upload',
      name: 'docu-upload',
      component: () => import('@/pages/DocuUpload.vue'),
    },
    {
      path: '/docu/loading',
      name: 'docu-loading',
      component: () => import('@/pages/DocuLoading.vue'),
    },
    {
      path: '/docu/result',
      name: 'docu-result',
      component: () => import('@/pages/DocuResult.vue'),
    },
  ],
})

export default router
