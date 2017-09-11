import * as config from './config'
import axios from 'axios'

export default {
  // 根据多个code获取数据字典
  getDictByCodes (codes) {
    return axios.get(config.COMMON_HOST + 'dict/code', {
      params: {
        'codes[]': codes.join(',')
      }
    })
  },
  // 获得省级行政区划
  getProvinces () {
    return axios.get(config.COMMON_HOST + 'dict/code/XZQH_sheng')
  },
  // 根据省，获取市信息
  getCitysByProvince (provinceId) {
    return axios.get(config.COMMON_HOST + 'dict/childs/' + provinceId)
  },
  // 根据市查找省
  getProvinceByCity (cityId) {
    return axios.get(config.COMMON_HOST + 'dict/parent_sort/' + cityId)
  }
}
