import Reg from '@/components/reg/Reg'
import RegCreateByPhone from '@/components/reg/RegCreateByPhone'
import RegCreateByEmail from '@/components/reg/RegCreateByEmail'
import RegSetPassword from '@/components/reg/RegSetPassword'
import RegDone from '@/components/reg/RegDone'

const router = {// 注册
  path: '/reg',
  name: 'Reg',
  component: Reg,
  redirect: '/reg/reg-create-by-phone',
  meta: {
    passAuthorization: true
  },
  children: [{
    path: 'reg-create-by-phone',
    name: 'RegCreateByPhone',
    component: RegCreateByPhone,
    meta: {
      passAuthorization: true
    }
  }, {
    path: 'reg-create-by-email',
    name: 'RegCreateByEmail',
    component: RegCreateByEmail,
    meta: {
      passAuthorization: true
    }
  }, {
    path: 'reg-set-password',
    name: 'RegSetPassword',
    component: RegSetPassword,
    meta: {
      passAuthorization: true
    }
  }, {
    path: 'reg-done',
    name: 'RegDone',
    component: RegDone,
    meta: {
      passAuthorization: true
    }
  }]
}

export default router
