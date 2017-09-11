import setup from '@/components/main/my-setup/setup'
import newMsgRemain from '@/components/main/my-setup/newMsgRemain'
import noMsgOn from '@/components/main/my-setup/noMsgOn'
import chatSetup from '@/components/main/my-setup/chatSetup'
import privateShow from '@/components/main/my-setup/privateShow'

const router = {
  name: 'setup',
  path: '/setup',
  component: setup,
  redirect: '/setup/newMsgRemain',
  children: [{
    name: 'newMsgRemain',
    path: 'newMsgRemain',
    component: newMsgRemain
  }, {
    name: 'noMsgOn',
    path: 'noMsgOn',
    component: noMsgOn
  }, {
    name: 'chatSetup',
    path: 'chatSetup',
    component: chatSetup
  }, {
    name: 'privateShow',
    path: 'privateShow',
    component: privateShow
  }]
}

export default router

