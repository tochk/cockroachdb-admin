import Vue from 'vue'
import Router from 'vue-router'
import Post from '../components/post/Post.vue'
import Auth from '../components/authentication/Auth'
import Home from '../components/home/Home.vue'
import dataBaseList from '../components/dataBaseList/dataBaseList.vue'
import tablesList from '../components/tablesList/tablesList'
import tablesView from '../components/tableView/tableView'
import showIndex from '../components/showIndex/showIndex'
import NotFoundComponent from '../components/notFoundComponent/NotFoundComponent'
import store from '../store'
import {AUTH_LOGOUT} from '../store/actions/auth'
import {DATABASES_REQUEST} from '../store/actions/databases'


Vue.use(Router)

const ifNotAuthenticated = async (to, from, next) => {

  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = async (to, from, next) => {
  await store.dispatch(DATABASES_REQUEST)
    .then((res) => {

      if (res instanceof Error)
        throw new Error(res)
      //console.log(res)
      return res
    })
    .catch((err) => {
      console.log(err)
      store.dispatch(AUTH_LOGOUT)
        .then(() => {
          next('/login')
        })
      //console.log(err)
      return err
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
        {
          path: 'db/:dbName',
          name: 'tableList',
          component: tablesList,
          props: true,
        },
        {
          path: '/databasesList',
          name: 'dataBaseList',
          component: dataBaseList,
          props: true,
        },
        {
          path: '/db/:dbName/table/:tableName',
          name: 'tableView',
          component: tablesView,
          props: true,
        },
        {
          path: '/db/:dbName/table/:tableName/index',
          name: 'showIndex',
          component: showIndex,
          props: true,
        }
      ],
      beforeEnter: ifAuthenticated
    },
    {path: '/*', component: NotFoundComponent},
  ],
  mode: 'history'
})
