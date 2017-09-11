import _ from 'lodash'
import Main from '@/components/main/Main'
import Home from '@/components/main/home/Home'
import store from '../../store'
import * as menuTypes from '../../types/menu-types'

import accountRouter from './router-my-account'
import sceoRouter from './router-my-sceo'
import jobRouter from './router-my-job'
import setupRouter from './router-setup'
import myFriendsList from './router-my-friendList'

let children = [{
  name: 'home',
  path: '/home',
  component: Home
}]

children = _.concat(children, accountRouter, sceoRouter, jobRouter, setupRouter, myFriendsList)

const router = {
  name: 'main',
  path: '/main',
  component: Main,
  children: children,
  redirect: '/myAccount',
  meta: {
    menuLevel: 'root',
    passAuthorization: true
  }
}

export default router
export const mainRoutersBeforeEach = (to, from, next) => {
  // 修改菜单选中状态
  if (to.matched[1]) {
    store.dispatch(menuTypes.CHANGE_CURRENT_MENU, to)
  }
  next()
}
