import Login from '@/components/login/Login'
import LoginByPassword from '@/components/login/LoginByPassword'
import LoginByScan from '@/components/login/LoginByScan'

const router = {
  path: '/login',
  name: 'Login',
  component: Login,
  redirect: '/login/login-by-password',
  meta: {
    passAuthorization: true
  },
  children: [{// 登录：密码登录
    path: 'login-by-password',
    name: 'LoginByPassword',
    component: LoginByPassword,
    meta: {
      passAuthorization: true
    }
  }, {// 登录：扫码登录
    path: 'login-by-scan',
    name: 'LoginByScan',
    component: LoginByScan,
    meta: {
      passAuthorization: true
    }
  }]
}

export default router

