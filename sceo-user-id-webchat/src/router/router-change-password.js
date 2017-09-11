import ChangePassword from '../components/password-security/ChangePassword'
import AuthValidate from '../components/password-security/AuthValidate'
import SetPassword from '../components/password-security/SetPassword'
import ChangePasswordDone from '../components/password-security/ChangePasswordDone'

const router = {
  path: '/change-password',
  name: 'changePassword',
  component: ChangePassword,
  redirect: '/change-password/auth-validate',
  children: [{
    path: 'auth-validate',
    name: 'PasswordAuthValidate',
    component: AuthValidate
  }, {
    path: 'set-password',
    name: 'setPassword',
    component: SetPassword
  }, {
    path: 'set-done',
    name: 'changePasswordDone',
    component: ChangePasswordDone
  }]
}

export default router
