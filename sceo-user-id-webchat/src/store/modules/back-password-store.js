import * as backPassTypes from '../../types/back-password-types'
import backPassApi from '../../api/back-password'
import Vue from 'vue'

const state = {
  // 当前步骤，默认1
  currentStep: 1,
  validate: {
    // 是否已拖动验证
    isDragValidate: false,
    // 是否身份验证
    isIdValidate: false,
    // 是否通过账号验证
    isAccountValidate: false,
    // 是否修改成功
    isSuccess: false,
    // 当前已经验证的账号
    validatedAccount: null
  },
  // 表单数据
  formData: {
    // 账号
    account: null,
    // 用户ID
    userId: null,
    // 重置密码
    password: null,
    // 重复密码
    rePassword: null
  }
}

const getters = {
  [backPassTypes.GET_CURRENT_STEP]: state => state.currentStep,
  [backPassTypes.GET_VALIDATE]: state => state.validate,
  [backPassTypes.GET_FORM_DATA]: state => state.formData
}

const mutations = {
  // 重置数据
  [backPassTypes.RESET_DATA] (state) {
    state.currentStep = 1
    state.validate.isDragValidate = false
    state.validate.isIdValidate = false
    state.validate.isAccountValidate = false
    state.validate.isSuccess = false
    state.validate.validatedAccount = null
    state.formData.account = null
    state.formData.userId = null
    state.formData.password = null
    state.formData.rePassword = null
  },
  // 给密码字段赋值，用于强度效验
  [backPassTypes.SET_PASSWORD] (state, password) {
    Vue.set(state.formData, 'password', password)
  },
  // 设置当前步骤序号
  [backPassTypes.SET_CURRENT_STEP] (state, step) {
    state.currentStep = step
  },
  // 通过账号验证
  [backPassTypes.PASS_ACCOUNT_VALIDATE] (state, {isValidate, id}) {
    state.validate.isAccountValidate = isValidate
    state.formData.userId = id
    // 记录当前已经通过验证的账号
    if (isValidate) {
      state.validate.validatedAccount = state.formData.account
    }
  },
  // 通过拖拽验证
  [backPassTypes.PASS_DRAG_VALIDATE] (state) {
    state.validate.isDragValidate = true
  },
  // 通过身份认证
  [backPassTypes.PASS_ID_VALIDATE] (state) {
    state.validate.isIdValidate = true
  },
  // 提交密码变更
  [backPassTypes.SUBMIT] (state) {
    state.validate.isSuccess = true
  }
}

const actions = {
  // 验证账号
  [backPassTypes.VALIDATE_ACCOUNT] ({state, commit}, {success, error}) {
    if (state.validate.validatedAccount === state.formData.account) {
      // 当前账号已经验证过，无需再远程验证
      success()
      return
    }
    backPassApi.valdateAccount(state.formData.account, data => {
      commit(backPassTypes.PASS_ACCOUNT_VALIDATE, {isValidate: true, id: data})
      success()
    }, err => {
      commit(backPassTypes.PASS_ACCOUNT_VALIDATE, {isValidate: false, id: null})
      error(err)
    })
  },
  // 提交重置密码请求
  [backPassTypes.RESET_PASSWORD] ({state, commit}, success) {
    backPassApi.resetPassword({
      id: state.formData.userId,
      password: state.formData.password
    }, () => {
      commit(backPassTypes.SUBMIT)
      success()
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
