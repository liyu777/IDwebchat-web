import Vue from 'vue'
import _ from 'lodash'
import Router from 'vue-router'
// import LoginRouter from './router-login'
import regRouter from './router-reg'
import backPasswordRouter from './router-back-password'
import mainRouter, {mainRoutersBeforeEach} from './main/router-main'
import setSceoNumber from './router-set-sceo-number'
import changePhoneNumber from './router-change-phone-number'
import changeEmail from './router-change-email'
import changeQuestion from './router-change-question'
import changePassword from './router-change-password'

Vue.use(Router)

const router = [{// 根目录
  path: '/',
  name: 'Root',
  redirect: '/home',
  meta: {
    passAuthorization: true
  }
}]

const routes = _.concat(
  router, // 根
  // LoginRouter, 登录模块
  regRouter, // 注册模块
  mainRouter, // 主功能区
  backPasswordRouter, // 找回密码模块
  setSceoNumber, // 设置锐信号模块
  changePhoneNumber, // 修改密保手机模块
  changeEmail, // 修改邮箱模块
  changeQuestion, // 修改密保问题模块
  changePassword) // 修改密码模块

var _router = new Router({
  routes
})

_router.beforeEach((to, from, next) => {
  // 无效跳转验证, 页面无变化
  if (!to.name) {
    return next({name: from.name, params: from.params})
  }
  next()
})

_router.beforeEach(mainRoutersBeforeEach)
export default _router

