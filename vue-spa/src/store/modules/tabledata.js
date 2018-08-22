import request from '../../utils/request'
import Vue from 'vue'
import {
  TABLE_DATA_REQUEST,
  TABLE_DATA_ERROR,
  TABLE_DATA_SUCCESS,
  SET_CARRENT_TABLE
} from '../actions/tabledata'
import databaseStorange from './databases'

const state = {status: '', currentTable: '', tableData: []}

const getters = {
  getStatusDataTable: state => state.tableData,
  getCurrentTableData: state => state.tableData,
}

const actions = {

  [TABLE_DATA_REQUEST]: async ({commit, dispatch}, payload) => {
    commit(TABLE_DATA_SUCCESS)
    // console.log(payload)
    let params
    if (payload.offset || payload.limit) {
      params = {
        'token': localStorage.getItem('user-token'),
        'database': payload.db,
        'table': state.currentTable,
        'limit': payload.limit,
        'offset': payload.offset
      }
    } else {
      params = {
        'token': localStorage.getItem('user-token'),
        'database': payload.db,
        'table': state.currentTable,
      }
    }
    // console.log(params)
    return await request(
      'api/data/',
      params,
      (resolve) => {

        commit(TABLE_DATA_SUCCESS, resolve.rows)
        return {
          rows: resolve.rows,
          count: resolve.count
        }
      },
      (err) => {
        commit(TABLE_DATA_ERROR)
        return err
      })
  },
}

const mutations = {
  [TABLE_DATA_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [SET_CARRENT_TABLE]: (state, tb) => {
    state.currentTable = tb
  },
  [TABLE_DATA_SUCCESS]: (state, resp) => {
    state.status = 'success'
    // console.log("12345")
    Vue.set(state, 'tableData', resp)
  },
  [TABLE_DATA_ERROR]: (state) => {
    state.status = 'error'
  },

}

export default {
  state,
  getters,
  actions,
  mutations,
}

