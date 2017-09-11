import ChangeEmail from '../components/email-security/ChangeEmail'
import AuthValidate from '../components/email-security/AuthValidate'
import SetEmail from '../components/email-security/SetEmail'
import ChangeEmailDone from '../components/email-security/ChangeEmailDone'

const router = {
  path: '/change-email',
  name: 'changeEmail',
  component: ChangeEmail,
  redirect: '/change-email/auth-validate',
  children: [{
    path: 'auth-validate',
    name: 'emailAuthValidate',
    component: AuthValidate
  }, {
    path: 'set-email',
    name: 'setEmail',
    component: SetEmail
  }, {
    path: 'set-done',
    name: 'changeEmailDone',
    component: ChangeEmailDone
  }]
}

export default router
