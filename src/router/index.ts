import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    meta:{madian:'agent_landing'},
    component:  () => import( /* webpackChunkName: "home" */ '../views/home/index.vue')
  },
  {
    path: '/poster',
    name: 'poster',
    meta:{madian:''},
    component:  () => import( /* webpackChunkName: "poster" */ '../views/poster/index.vue')
  }, 
  {
    path: '/notice',
    name: 'notice',
    meta:{madian:''},
    component:  () => import( /* webpackChunkName: "notice" */ '../views/notice/index.vue')
  },
  {
    path: '/',
    name: 'getinfo',
    meta:{madian:'customer_landing'},
    component:  () => import( /* webpackChunkName: "getinfo" */ '../views/getinfo/index.vue')
  },
  {
    path: '/success',
    name: 'success',
    meta:{madian:'data_vision'},
    component:  () => import( /* webpackChunkName: "success" */ '../views/success/index.vue')
  },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
//   }
]

const router = new VueRouter({
  routes
})

export default router
