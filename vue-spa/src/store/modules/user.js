import {USER_REQUEST, USER_ERROR, USER_SUCCESS, } from '../actions/user'
// import apiCall from '../../utils/api'
import Vue from 'vue'
import {AUTH_ERROR, AUTH_LOGOUT, AUTH_SUCCESS} from '../actions/auth'

const state = {status: '', profile: {}}

const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.name,
}

const actions = {
  [USER_REQUEST]: ({commit, dispatch}) => {
    // commit(USER_REQUEST)
    // fetch('http://localhost:5003/api/databases/', {
    //   method: 'POST',
    //   // headers: myHeaders,
    //   cache: 'no-cache',
    //   mode: 'cors',
    //   body: JSON.stringify({'token': localStorage.getItem('user-token')})
    // }).then(resp => {
    //   return resp.json()
    // }).then(resp => {
    //   // console.log(resp)
    //   if (resp) {
    //     commit(USER_SUCCESS, resp)
    //     resolve(resp)
    //   } else {
    //     const err = [resp]
    //     throw new Error(err)
    //   }
    //
    // }).catch(err => {
    //   commit(USER_ERROR)
    //   dispatch(AUTH_LOGOUT)
    // })

  },
}

const mutations = {
  [USER_REQUEST]: (state) => {
    state.status = 'loading'
  },
  [USER_SUCCESS]: (state, resp) => {
    state.status = 'success'
    Vue.set(state, 'profile', resp)
  },
  [USER_ERROR]: (state) => {
    state.status = 'error'
  },
  [AUTH_LOGOUT]: (state) => {
    state.profile = {}
  }
}

export default {
  state,
  getters,
  actions,
  mutations,
}
