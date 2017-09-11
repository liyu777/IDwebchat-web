import GetBackPassword from '../components/get-back-password/GetBackPassword'
import InputAccoutName from '../components/get-back-password/InputAccountName'
import AuthValidate from '../components/get-back-password/AuthValidate'
import ResetPassword from '../components/get-back-password/ResetPassword'
import ResetPasswordDone from '../components/get-back-password/ResetPasswordDone'

const router = {// 找回密码
  path: '/get-back-password',
  name: 'GetBackPassword',
  component: GetBackPassword,
  meta: {
    passAuthorization: true
  },
  redirect: '/get-back-password/input-account-name',
  children: [{
    path: 'input-account-name',
    name: 'InputAccoutName',
    component: InputAccoutName,
    meta: {
      passAuthorization: true
    }
  }, {
    path: 'auth-validate',
    name: 'AuthValidate',
    component: AuthValidate,
    meta: {
      passAuthorization: true
    }
  }, {
    path: 'reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
    meta: {
      passAuthorization: true
    }
  }, {
    path: 'reset-password-done',
    name: 'ResetPasswordDone',
    component: ResetPasswordDone,
    meta: {
      passAuthorization: true
    }
  }]
}
export default router
