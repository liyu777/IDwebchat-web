import * as dictTypes from '../../types/dict-types'
import dictAPI from '../../api/dict'
import Vue from 'vue'

const state = {
  // 所有数据字典
  dicts: {

  },
  // 行政区划
  distict: null
}

const getters = {
  [dictTypes.GET_ALL_DICTS]: state => state.dicts,
  [dictTypes.GET_DISTRICT]: state => state.distict
}

const mutations = {
  [dictTypes.ADD_DICT_TO_CACHE] (state, {data}) {
    for (let index in data) {
      Vue.set(state.dicts, index, data[index])
    }
  },
  [dictTypes.GET_PROVINCES] (state, {data}) {
    Vue.set(state, 'distict', data)
  },
  [dictTypes.GET_CITYIS_BY_PROVINCE] (state, {data, province}) {
    Vue.set(province, 'children', data)
  }
}

const actions = {
  // 根据一组code查找下级数据字典，并缓存
  [dictTypes.GET_DICT_BY_CODES] ({state, commit}, codes) {
    return new Promise((resolve, reject) => {
      let codesToGet = []
      for (let index = 0; index < codes.length; index++) {
        if (!state.dicts[codes[index]]) {
          codesToGet.push(codes[index])
        }
      }
      // 没有新的数据字典需要获取
      if (!codesToGet.length) {
        resolve()
      } else {
        dictAPI.getDictByCodes(codesToGet).then(data => {
          commit(dictTypes.ADD_DICT_TO_CACHE, {data})
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      }
    })
  },
  // 查找省
  [dictTypes.GET_PROVINCES] ({state, commit}) {
    return new Promise((resolve, reject) => {
      if (state.distict) {
        resolve(state.distict)
      } else {
        dictAPI.getProvinces().then(data => {
          commit(dictTypes.GET_PROVINCES, {data})
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      }
    })
  },
  // 查找市
  [dictTypes.GET_CITYIS_BY_PROVINCE] ({state, commit}, {provinceId}) {
    return new Promise((resolve, reject) => {
      const province = findProvinceById(state.distict, provinceId)
      if (!province) {
        reject({message: '未知省份'})
      } else if (province.children && province.children.length > 0) {
        // 直接从缓存中获取
        resolve(province.children)
      } else {
        // 从服务端获取
        dictAPI.getCitysByProvince(provinceId).then((data) => {
          commit(dictTypes.GET_CITYIS_BY_PROVINCE, {data, province})
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      }
    })

    function findProvinceById (distict, id) {
      if (!distict) {
        return null
      }
      for (let index = 0; index < distict.length; index++) {
        const item = distict[index]
        if (item.id === id) {
          return item
        }
      }
      return null
    }
  },
  // 根据市查找省
  [dictTypes.GET_PROVINCE_BY_CITY] ({state}, {cityId}) {
    return new Promise((resolve, reject) => {
      let flag = false
      for (let index in state.distict) {
        let item = state.distict[index]
        if (item.children && item.children.length > 0) {
          for (let i in item.children) {
            if (item.children[i].id === cityId) {
              flag = true
              resolve({province: item})
              break
            }
          }
          if (flag) break
        }
      }
      // 没有查找到，从服务端查找
      if (!flag) {
        dictAPI.getProvinceByCity(cityId).then((data) => {
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      }
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
