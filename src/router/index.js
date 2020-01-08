import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import User from '../components/user/user.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/user', component: User }

]

const router = new VueRouter({
  routes
})

export default router
