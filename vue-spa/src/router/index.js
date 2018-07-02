import Vue from 'vue'
import Router from 'vue-router'
import Post from '../components/post/Post.vue'
import Auth from '../components/authentication/Auth'
import Home from '../components/home/Home.vue'
import store from '../store'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
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
      name:'auth',
      component: Auth,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/',
      name:'home',
      component: Home,
      children: [
        {
          path: 'post/:id',
          name:'post',
          component: Post,
          props: true
        },
      ],
      beforeEnter: ifAuthenticated
    },
  ],
  mode: 'history'
})
