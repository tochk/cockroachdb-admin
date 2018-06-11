import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import Post from './components/Post.vue'
import Hello from './components/Hello.vue'
import Materials from "vue-materials"
Vue.use(Router)
Vue.use(Materials)

const router = new Router({
  routes: [
    {
      path: '/',
      name:'home',
      component: Hello,
    },
    {
      path: '/post/:id',
      name:'post',
      component: Post,
      props: true,
    },
  ],
  mode: 'history'
})



new Vue({
  el: '#app',
  render: h => h(App),
  router
})

