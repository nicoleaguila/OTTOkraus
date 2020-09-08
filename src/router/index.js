import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/toys',
    name: 'ToysComp',
    component: () => import(/* webpackChunkName: "ToysComp" */ '../views/ToysComp.vue'),
    meta: { 
      login: true 
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

router.beforeEach((to, from, next) => {
  let user = firebase.auth().currentUser
  let authRequired = to.matched.some(route => route.meta.login)
  if(!user && authRequired) {
    next('/')
  } else {
    next()
  }
})