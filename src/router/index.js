import {createRouter, createWebHistory} from 'vue-router'

import Home from '@/views/Home.vue'
import Register from '@/views/Register'
import Login from '@/views/Login'

const routes = [
  {
    path: '',
    name: 'home',
    component: Home,
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/feed',
    name: 'yorFeed',
    component: Home,
  },
  {
    path: '/tag/:slug',
    name: 'tag',
    component: Home,
  },
  {
    path: '/articles/new',
    name: 'createArticle',
    component: Home,
  },
  {
    path: '/articles/:slug',
    name: 'article',
    component: Home,
  },
  {
    path: '/articles/:slug/edit',
    name: 'editArticle',
    component: Home,
  },
  {
    path: '/settings',
    name: 'settings',
    component: Home,
  },
  {
    path: '/profiles/:slug',
    name: 'userProfile',
    component: Home,
  },
  {
    path: '/profiles/:slug/favorites',
    name: 'userProfileFavorites',
    component: Home,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
