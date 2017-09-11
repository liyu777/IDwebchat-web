import Vuex from 'vuex'
import Vue from 'vue'

import menuStore from './modules/menu-store'
import userInfoStore from './modules/user-info-store'
import dictStore from './modules/dict-store'
import regStore from './modules/reg-store'
import backPasswordStore from './modules/back-password-store'

Vue.use(Vuex)

let _opt = {
  modules: {
    menuStore,
    userInfoStore,
    dictStore,
    regStore,
    backPasswordStore
  }
}

export default new Vuex.Store(_opt)
