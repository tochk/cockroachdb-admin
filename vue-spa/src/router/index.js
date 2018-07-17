import Vue from 'vue'
import Router from 'vue-router'
import Post from '../components/post/Post.vue'
import Auth from '../components/authentication/Auth'
import Home from '../components/home/Home.vue'
import store from '../store'
import request from '../utils/request'
import {AUTH_LOGOUT} from '../store/actions/auth'


Vue.use(Router)

const ifNotAuthenticated = async (to, from, next) => {

  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = async (to, from, next) => {
   const answ = await request(
      'api/databases/',
      localStorage.getItem('user-token'),
     () => {
       return true
     },
      () => {
       store.dispatch(AUTH_LOGOUT)
         .then(() => {
           next('/login')
         })
       return false
     })
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'auth',
      component: Auth,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'post/:id',
          name: 'post',
          component: Post,
          props: true
        },
      ],
      beforeEnter: ifAuthenticated
    },
  ],
  mode: 'history'
})
