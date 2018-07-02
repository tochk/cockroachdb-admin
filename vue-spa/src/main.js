import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'materialize-css'
import 'materialize-css/dist/css/materialize.css'

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})

