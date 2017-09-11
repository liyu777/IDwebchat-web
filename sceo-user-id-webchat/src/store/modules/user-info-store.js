import * as userInfoTypes from '../../types/user-info-types'
import userInfoAPI from '../../api/user-info'

const state = {
  userInfo: null
}

const getters = {
  [userInfoTypes.GET_CURRENT_USER]: state => state.userInfo
}

const mutations = {
  [userInfoTypes.SET_USER_INFO] (state, {userInfo}) {
    state.userInfo = userInfo
  }
}

const actions = {
  [userInfoTypes.GET_CURRENT_USER] ({ commit }) {
    // 返回promise
    const promise = userInfoAPI.getSysUserInfo()
    promise.then(userInfo => {
      commit(userInfoTypes.SET_USER_INFO, {userInfo})
    })
    return promise
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
