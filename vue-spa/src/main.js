import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import 'materialize-css'
import 'materialize-css/dist/css/materialize.css'

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})

