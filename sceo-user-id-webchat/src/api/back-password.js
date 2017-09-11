import * as config from './config'
import axios from 'axios'

// 账号验证
export default {
  valdateAccount (account, success, error) {
    axios.get(config.ID_SYS_AUTH + 'status/account', {
      params: {
        account
      }
    }).then(data => {
      if (success) {
        success(data)
      }
    }).catch(err => {
      if (error) {
        error(err.message)
        alert(111)
      }
    })
  },
  resetPassword ({id, password}, success) {
    axios.put(config.ID_SYS_AUTH + 'sys_user/password/reset', {id, newPassword: password}).then(() => {
      if (success) {
        success()
      }
    })
  }
}

