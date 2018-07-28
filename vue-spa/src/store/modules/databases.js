import {
  DATABASES_REQUEST,
  DATABASES_ERROR,
  DATABASES_SUCCESS,
  DATABASES_CREATE,
  TABLES_REQUEST,
  TABLES_ERROR,
  TABLES_SUCCESS,
  SET_CURRENT_DATABASE,
  DROP_DATABASE,
  TABLE_DROP,
} from '../actions/databases'
import tabledata from './tabledata'
import request from '../../utils/request'

import Vue from 'vue'

const state = {status: '', currentDb: '', currentTable: '', databasesList: [], tablesList: []}

const getters = {
  getStatus: state => state.status,
  getDataBasesList: state => state.databasesList,
  getCurrentDataBasesTableList: state => state.tablesList,
  getCurrentDataBasesName: state => state.currentDb,
}

const actions = {
  [DATABASES_REQUEST]: async ({commit, dispatch}) => {
    commit(DATABASES_REQUEST)
    return await request(
      'api/databases/',
      {'token': localStorage.getItem('user-token')},
      (resolve) => {
        commit(DATABASES_SUCCESS, resolve)
        return resolve
      },
      (err) => {
        commit(DATABASES_ERROR)
        return err
      })

  },
  [DATABASES_CREATE]: async ({commit, dispatch}, name) => {
    commit(DATABASES_REQUEST)
    return await request(
      'api/databases/create/',
      {'token': localStorage.getItem('user-token'), 'database': name},
      (resolve) => {
        commit(DATABASES_SUCCESS, resolve)
        return ''
      },
      (err) => {
        commit(DATABASES_ERROR)
        return err
      })
  },
  [DROP_DATABASE]: async ({commit, dispatch}, name) => {
    commit(DATABASES_REQUEST)
    return await request(
      'api/databases/drop/',
      {'token': localStorage.getItem('user-token'), 'database': name},
      (resolve) => {
        commit(DATABASES_SUCCESS, resolve)
        return ''
      },
      (err) => {
        commit(DATABASES_ERROR)
        return err
      })
  },
  [TABLES_REQUEST]: async ({commit, dispatch}) => {
    commit(DATABASES_REQUEST)
    // console.log(state.currentDb)
    return await request(
      'api/tables/',
      {'token': localStorage.getItem('user-token'), 'database': state.currentDb},
      (resolve) => {
        resolve = resolve.map(el => {

          return el.table
        })
       // console.log(resolve)
        commit(TABLES_SUCCESS, resolve)
        return ''
      },

      (err) => {
        commit(DATABASES_ERROR)
        return err
      })
  },
  [TABLE_DROP]: async ({commit, dispatch}, tableName) => {
    commit(DATABASES_REQUEST)
    return await request(
      'api/tables/drop',
      {'token': localStorage.getItem('user-token'), 'database': state.currentDb, 'table': tableName},
      (resolve) => {
        resolve = resolve.map(el => {
          return el.table
        })
        commit(TABLES_SUCCESS, resolve)
        // commit(TABLE_DROP, resolve)
        return ''
      },
      (err) => {
        commit(DATABASES_ERROR)
        return err
      })
  },
}

const mutations = {
  [DATABASES_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [DATABASES_SUCCESS]: (state, resp) => {
    state.status = 'success'
    // console.log("12345")
    Vue.set(state, 'databasesList', resp)
  },
  [DATABASES_ERROR]: (state) => {
    state.status = 'error'
  },
  [TABLES_SUCCESS]: (state, resp) => {
    state.status = 'success'
    // console.log("12345")
    Vue.set(state, 'tablesList', resp)
  },
  [SET_CURRENT_DATABASE]: (state, db) => {
    Vue.set(state, 'currentDb', db)
  },
  [TABLE_DROP]: (resolve) => {
    //console.log(state)
    //resolve.push('qweqweq');
    state.tablesList.push('qweqwe')
    //Vue.set(state, 'tablesList', resolve)
  }
}
const modules ={
  tabledata
}

export default {
  state,
  getters,
  actions,
  mutations,
  modules
}
