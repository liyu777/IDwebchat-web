import * as menuTypes from '../../types/menu-types'
import menuAPI from '../../api/menu'

const state = {
  // 所有菜单
  menus: null,
  // 当前匹配的所有菜单
  matchedMenus: null
}

const getters = {
  [menuTypes.GET_ALL_MENUS]: state => state.menus,
  [menuTypes.GET_CURRENT_MENUS]: state => state.matchedMenus
}

const mutations = {
  [menuTypes.RECIVE_MENUS] (state, {menus}) {
    state.menus = menus
  },
  [menuTypes.CHANGE_CURRENT_MENU] (state, to) {
    state.matchedMenus = to.matched
  }
}

const actions = {
  [menuTypes.RECIVE_MENUS] ({ commit }) {
    return menuAPI.getMenus().then((menus) => {
      commit(menuTypes.RECIVE_MENUS, { menus })
    })
  },
  [menuTypes.CHANGE_CURRENT_MENU] ({ commit }, to) {
    commit(menuTypes.CHANGE_CURRENT_MENU, to)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
