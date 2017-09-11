import * as config from './config'
import axios from 'axios'

export default {
  // 获得用户的认证方式
  getValidations (id, success, error) {
    axios.get(config.ID_SYS_AUTH + 'sys_user/' + id + '/validation').then(data => {
      if (success) {
        success(data)
      }
    }).catch(err => {
      if (error) {
        error(err)
      }
    })
  },
  // 发送短信验证码
  getPhoneCaptcha ({worldPost, account, captchaType}, success, error) {
    axios.get(config.ID_SYS_AUTH + 'captcha/sms', {
      params: {
        worldPost,
        mobileNumber: account,
        captchaType
      }
    }).then(data => {
      if (success) {
        success(data)
      }
    }).catch(err => {
      if (error) {
        error(err)
      }
    })
  },
  // 发送邮箱验证码
  getEmailCaptcha ({account, nationality, captchaType}, success, error) {
    axios.get(config.ID_SYS_AUTH + 'captcha/email', {
      params: {
        email: account,
        nationality,
        captchaType
      }
    }).then(data => {
      if (success) {
        success(data)
      }
    }).catch(err => {
      if (error) {
        error(err)
      }
    })
  },
  // 发送验证码
  getCathchaByUserId ({id, sendType, captchaType}) {
    return axios.get(config.ID_SYS_AUTH + 'captcha', {
      params: {
        id, sendType, captchaType
      }
    })
  },
  // 校验验证码
  captchaValidate ({captcha, sendStr, sendType}, success, error) {
    axios.get(config.ID_SYS_AUTH + 'captcha/status', {
      params: {
        sendStr,
        captcha,
        sendType
      }
    }).then(data => {
      if (success) {
        success(data)
      }
    }).catch(err => {
      if (error) {
        error(err)
      }
    })
  },
  // 设置锐信号
  setSceoNumber ({id, newLoginName}) {
    return axios.put(config.ID_SYS_AUTH + 'sys_user/login_name', {
      id, newLoginName
    })
  },
  // 手机号验证
  validatePhone ({worldPost, account}, success, error) {
    axios.get(config.ID_SYS_AUTH + 'status/mobile', {
      params: {
        worldPost,
        mobileNumber: account
      }
    }).then(data => {
      success(data)
    }).catch(err => {
      error(err)
    })
  },
  // 邮箱验证
  validateEmail ({account, nationality}, success, error) {
    axios.get(config.ID_SYS_AUTH + 'status/email', {
      params: {
        email: account,
        nationality
      }
    }).then(data => {
      success(data)
    }).catch(err => {
      error(err)
    })
  },
  // 账号验证
  validateSceoNumber ({sceoNumber}) {
    return axios.get(config.ID_SYS_AUTH + 'status/login_name/' + sceoNumber)
  },
  // 注册
  register (regInfo, success, error) {
    axios.post(config.ID_SYS_AUTH + 'sys_user', regInfo).then(data => {
      success(data)
    }).catch(err => {
      error(err)
    })
  },
  // 修改手机号
  changePhoneNumber ({id, newMobileNumber, worldPost}) {
    return axios.put(config.ID_SYS_AUTH + 'sys_user/mobile', {
      id,
      newMobileNumber,
      worldPost
    })
  },
  // 修改邮箱
  changeEmail ({id, newEmail, nationality}) {
    return axios.put(config.ID_SYS_AUTH + 'sys_user/email', {
      id, newEmail, nationality
    })
  },
  // 修改密码
  changePassword ({id, oldPassword, newPassword}) {
    return axios.put(config.ID_SYS_AUTH + 'sys_user/password', {
      id, newPassword, oldPassword
    })
  },
  // 保存密保问题
  saveQuestions ({id, list}) {
    return axios.post(config.ID_SYS_AUTH + 'sys_user/' + id + '/questions', list)
  },
  // 获取密保问题
  getQuestions ({id}) {
    return axios.get(config.ID_SYS_AUTH + 'sys_user/' + id + '/questions')
  },
  // 验证密保问题
  validateQuestions ({id, list}) {
    return axios.post(config.ID_SYS_AUTH + 'sys_user/' + id + '/questions/validity', list)
  }
}
