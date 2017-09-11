import * as config from './config'
import axios from 'axios'

// const _userInfo = {
//   id: '10000',
//   name: '张三',
//   sceoNumber: ''
// }

export default {
  /**
   * @return {系统用户信息}
   */
  getSysUserInfo () {
    return new Promise((resolve, reject) => {
      axios.get(config.ID_SYS_HOST + 'user/base').then(data => {
        if (data.path) {
          data.path = config.FILE_SYS_HOST + data.path
        }
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  logout () {
    return new Promise((resolve, reject) => {
      resolve(true)
    })
  }
}
