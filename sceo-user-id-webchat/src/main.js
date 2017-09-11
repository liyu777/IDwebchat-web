// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store'
import 'element-ui/lib/theme-default/index.css'
import './main.css'
import './api/api-util'
import VueI18n from 'vue-i18n'
import messages from './i18n'

// 使用国际化插件
Vue.use(VueI18n)
// 配置国际化，默认简体中文
const i18n = new VueI18n({
  locale: 'zh-CN',
  messages
})

Vue.use(ElementUI, {
  i18n: key => i18n.vm._t(key)
})

Vue.config.productionTip = false

document.getElementsByTagName('title')[0].innerText = i18n.t('title')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  template: '<App/>',
  components: { App }
})

