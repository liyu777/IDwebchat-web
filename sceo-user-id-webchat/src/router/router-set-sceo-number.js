import SetSceoNumber from '../components/sceo-number/SetSceoNumber'
import AuthValidate from '../components/sceo-number/AuthValidate'
import SetNumber from '../components/sceo-number/SetNumber'
import SetSceoNumberDone from '../components/sceo-number/SetSceoNumberDone'

const router = {
  path: '/set-sceo-number',
  name: 'setSceoNumber',
  component: SetSceoNumber,
  redirect: '/set-sceo-number/auth-validate',
  children: [{
    path: 'auth-validate',
    name: 'sceoNumberAuthValidate',
    component: AuthValidate
  }, {
    path: 'set-number',
    name: 'setNumber',
    component: SetNumber
  }, {
    path: 'set-done',
    name: 'setSceoNumberDone',
    component: SetSceoNumberDone
  }]
}

export default router
