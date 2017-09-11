import * as config from './config'
import axios from 'axios'

export default {
  // 系统设置查询
  querySetup (userId) {
    return axios.get(config.SETUP_HOST + 'userSettings/' + userId)
  },
  saveSetup (listDate) {
    return axios.put(config.SETUP_HOST + 'userSettings/setSystem', listDate)
  }
}
