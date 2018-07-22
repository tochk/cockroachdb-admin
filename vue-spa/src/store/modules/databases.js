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
} from '../actions/databases'
import request from '../../utils/request'
import Vue from 'vue'

const state = {status: '', currentDb:'', currentTable:'', databasesList: [], tablesList: []}

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
      {'token':localStorage.getItem('user-token'), 'database': name},
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
      {'token':localStorage.getItem('user-token'), 'database': name},
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
  return await request(
    'api/tables/',
    {'token':localStorage.getItem('user-token'), 'database': state.currentDb},
    (resolve) => {
      commit(TABLES_SUCCESS, resolve)
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
  [SET_CURRENT_DATABASE]: (state, db) =>{
    Vue.set(state, 'currentDb', db)
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
