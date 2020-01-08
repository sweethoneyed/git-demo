import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Home from '../components/Home.vue'
import User from '../components/user/user.vue'
import cate from '../components/goods/cate.vue'
import list from '../components/goods/List.vue'
import params from '../components/goods/params.vue'
import order from '../components/order/order.vue'
import right from '../components/role/right.vue'
import role from '../components/role/role.vue'
import report from '../components/report/report.vue'
import welcome from '../components/welcome.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '/home', component: welcome },
        { path: '/users', component: User },
        { path: '/categories', component: cate },
        { path: '/goods', component: list },
        { path: '/params', component: params },
        { path: '/orders', component: order },
        { path: '/rights', component: right },
        { path: '/roles', component: role },
        { path: '/reports', component: report }
      ]
    }
  ]
})

// 路由导航守卫
router.beforeEach((to, form, next) => {
  // to 将要访问的路径
  // form 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
