import authApi from '../../api/auth'
import * as commonTypes from '../../types/common-types'
import * as regTypes from '../../types/reg-types'
import Vue from 'vue'

const state = {
  // 注册信息
  regInfo: {
    // 手机号\邮箱
    account: null,
    // 注册类型，1手机，2邮箱，默认1
    registerType: 1,
    // 密码
    passowrd: null,
    // 再次输入密码
    rePassword: null,
    // 国际区号，默认0(+86)
    worldPost: '0086',
    // 国际地区，默认0(中国)
    nationality: 'CN',
    // 验证码
    captcha: null
  },
  // 验证状态,
  validate: {
    phone: null, // null时未验证，验证为false时，手机号码不可用, true时验证通过，手机可用
    email: null, // 邮箱验证，验证规则同上
    captcha: null, // 验证码验证，验证规则同上
    validatedPhone: null, // 当前通过验证的手机号
    validatedEmail: null// 当前通过验证的邮箱
  },
  // 当前步骤，默认1
  currentStep: 1,
  // 是否注册成功，默认false
  isRegisterSuccess: false,
  // 重新发送interval,time默认60秒
  timeInterval: null,
  time: 60,
  // 验证码ID
  sendCaptchaFlag: false
}

const getters = {
  [regTypes.GET_CURRENT_STEP]: state => state.currentStep,
  [regTypes.GET_REG_INFO]: state => state.regInfo,
  [regTypes.GET_VALIDATE_INFO]: state => state.validate,
  [regTypes.GET_TIME_INTERVAL]: state => {
    return {time: state.time, interval: state.timeInterval}
  }
}

const mutations = {
  [regTypes.INIT] (state) {
    state.regInfo.account = null
    state.regInfo.password = null
    state.regInfo.password = null
    state.regInfo.rePassword = null
    state.regInfo.captcha = null
    state.validate.phone = null
    state.validate.email = null
    state.validate.captcha = null
    state.validatedPhone = null
    state.validatedEmail = null
    if (state.timeInterval) {
      clearInterval(state.timeInterval)
    }
    state.isRegisterSuccess = false
    state.timeInterval = null
    state.time = 60
    state.captcha = null
    state.sendCaptchaFlag = false
  },
  // 设置当前步骤序号
  [regTypes.SET_CURRENT_STEP] (state, step) {
    state.currentStep = step
  },
  // 给密码字段赋值，用于强度效验
  [regTypes.SET_PASSWORD] (state, password) {
    Vue.set(state.regInfo, 'password', password)
  },
  // 切换注册类型,重置大部分数据
  [regTypes.CHANGE_REGISTER_TYPE] (state, {type}) {
    mutations[regTypes.INIT](state)
    state.regInfo.registerType = type
  },
  // 手机号验证
  [regTypes.PHONE_VALIDATE] (state, isPass) {
    state.validate.phone = isPass
    if (isPass) {
      state.validate.validatedPhone = state.regInfo.account
    }
  },
  // 邮箱验证
  [regTypes.EMAIL_VALIDATE] (state, isPass) {
    state.validate.email = isPass
    if (isPass) {
      state.validate.validatedEmail = state.regInfo.account
    }
  },
  // 获取手机验证码
  [regTypes.GET_PHONE_CAPTCHA] (state, {result}) {
    // 重置验证码验证状态
    state.validate.captcha = false
    state.sendCaptchaFlag = true
    clearInterval(state.timeInterval)
    state.time = 60
    state.timeInterval = setInterval(() => {
      state.time--
      if (state.time === 0) {
        clearInterval(state.timeInterval)
        // 重置
        state.timeInterval = null
        state.time = 60
      }
    }, 1000)
    state.regInfo.captcha = result
  },
  // 获取邮箱验证码
  [regTypes.GET_EMAIL_CAPTCHA] (state, {result}) {
    // 重置验证码验证状态
    state.validate.captcha = false
    state.sendCaptchaFlag = true
    clearInterval(state.timeInterval)
    state.time = 60
    state.timeInterval = setInterval(() => {
      state.time--
      if (state.time === 0) {
        clearInterval(state.timeInterval)
        // 重置
        state.timeInterval = null
        state.time = 60
      }
    }, 1000)
  },
  // 验证验证码
  [regTypes.CAPTCHA_VALIDATE] (state, isPass) {
    state.validate.captcha = isPass
  },
  // 注册
  [regTypes.REGISTER] (state) {
    state.isRegisterSuccess = true
  }
}

const actions = {
  // 切换注册类型,重置大部分数据
  [regTypes.CHANGE_REGISTER_TYPE] ({commit}, {type}) {
    commit(regTypes.CHANGE_REGISTER_TYPE, {type})
  },
  // 手机号验证
  [regTypes.PHONE_VALIDATE] ({commit, state}, {success, error}) {
    if (state.validate.phone && state.validate.validatedPhone === state.regInfo.account) {
      // 当前已经完成了手机验证，并且手机号没有变化
      success()
      return
    }
    authApi.validatePhone(state.regInfo, () => {
      commit(regTypes.PHONE_VALIDATE, true)
      success()
    }, err => {
      commit(regTypes.PHONE_VALIDATE, false)
      error(err)
    })
  },
  // 邮箱验证
  [regTypes.EMAIL_VALIDATE] ({commit, state}, {success, error}) {
    if (state.validate.email && state.validate.validatedEmail === state.regInfo.account) {
      // 当前已经完成了邮箱验证，并且邮箱没有变化
      success()
      return
    }
    authApi.validateEmail(state.regInfo, () => {
      commit(regTypes.EMAIL_VALIDATE, true)
      success()
    }, err => {
      commit(regTypes.EMAIL_VALIDATE, false)
      error(err)
    })
  },
  // 获取手机验证码
  [regTypes.GET_PHONE_CAPTCHA] ({commit, state}) {
    authApi.getPhoneCaptcha({
      account: state.regInfo.account,
      worldPost: state.regInfo.worldPost,
      captchaType: commonTypes.FUNCTION_TYPE_REG
    }, result => {
      console.log(result)
      commit(regTypes.GET_PHONE_CAPTCHA, {result})
    })
  },
  // 获取邮箱验证码
  [regTypes.GET_EMAIL_CAPTCHA] ({commit, state}) {
    authApi.getEmailCaptcha({
      account: state.regInfo.account,
      nationality: state.regInfo.nationality,
      captchaType: commonTypes.FUNCTION_TYPE_REG
    }, result => {
      commit(regTypes.GET_EMAIL_CAPTCHA, {result})
    })
  },
  // 验证验证码
  [regTypes.CAPTCHA_VALIDATE] ({commit, state}, {sendStr, sendType, success, error}) {
    if (!state.sendCaptchaFlag) {
      // 还未获取验证码
      error('还未获取验证码')
      return
    }
    authApi.captchaValidate({captcha: state.regInfo.captcha, sendStr, sendType}, () => {
      commit(regTypes.CAPTCHA_VALIDATE, true)
      success()
    }, err => {
      commit(regTypes.CAPTCHA_VALIDATE, false)
      error(err.message)
    })
  },
  // 注册
  [regTypes.REGISTER] ({commit, state}, callback) {
    authApi.register({
      account: state.regInfo.account,
      registerType: state.regInfo.registerType,
      password: state.regInfo.password,
      worldPost: state.regInfo.worldPost,
      nationality: state.regInfo.nationality
    }, () => {
      commit(regTypes.REGISTER)
      callback()
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
