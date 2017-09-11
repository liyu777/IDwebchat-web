import ChangePhoneNumber from '../components/phone-security/ChangePhoneNumber'
import AuthValidate from '../components/phone-security/AuthValidate'
import SetPhoneNumber from '../components/phone-security/SetPhoneNumber'
import ChangePhoneNumberDone from '../components/phone-security/ChangePhoneNumberDone'

const router = {
  path: '/change-phone-number',
  name: 'changePhoneNumber',
  component: ChangePhoneNumber,
  redirect: '/change-phone-number/auth-validate',
  children: [{
    path: 'auth-validate',
    name: 'phoneNumberAuthValidate',
    component: AuthValidate
  }, {
    path: 'set-phone-number',
    name: 'setPhoneNumber',
    component: SetPhoneNumber
  }, {
    path: 'set-done',
    name: 'changePhoneNumberDone',
    component: ChangePhoneNumberDone
  }]
}

export default router
