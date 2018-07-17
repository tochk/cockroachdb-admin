/* eslint-disable promise/param-names */
import {AUTH_REQUEST, AUTH_ERROR, AUTH_SUCCESS, AUTH_LOGOUT} from '../actions/auth'
import {USER_REQUEST, TEST_TOKEN} from '../actions/user'
// import axios from 'axios'

const state = {
  token: localStorage.getItem('user-token') || '',
  status: '',
  hasLoadedOnce: false
}

const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status,

}

const actions = {
  [TEST_TOKEN]:() =>{

  },
  [AUTH_REQUEST]: ({commit, dispatch}, user) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_REQUEST)
      fetch('http://localhost:5003/api/connect/', {
        method: 'POST',
        cache: 'no-cache',
        mode: 'cors',
        body: JSON.stringify({'login': user.username, 'password': user.password})
      }).then(resp => {
        return resp.json()
      }).then(resp => {
        if (resp.token) {
          localStorage.setItem('user-token', resp.token)
          dispatch(USER_REQUEST).then(() => {
            commit(AUTH_SUCCESS, resp.token)
            resolve(resp.token)
          })
        } else {
          const err = [resp.err, resp.code, resp.human]
          throw new Error(err)
        }
      }).catch(err => {
        commit(AUTH_ERROR, err)
        localStorage.removeItem('user-token')
        reject(err)
      })

    })
  },
  [AUTH_LOGOUT]: ({commit, dispatch}) => {
    return new Promise((resolve, reject) => {
      commit(AUTH_LOGOUT)
      localStorage.removeItem('user-token')
      resolve()
    })
  }
}

const mutations = {
  [AUTH_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [AUTH_SUCCESS]: (state, resp) => {
    state.status = 'success'
    state.token = resp
    state.hasLoadedOnce = true
  },
  [AUTH_ERROR]: (state) => {
    state.status = 'error'
    state.hasLoadedOnce = true
  },
  [AUTH_LOGOUT]: (state) => {
    state.token = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
