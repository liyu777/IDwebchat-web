import MySCEO from '@/components/main/my-sceo/MySCEO'
import List from '@/components/main/my-sceo/List'
import Register from '@/components/main/my-sceo/Register'

const router = {
  name: 'mySCEO',
  path: '/mySCEO',
  component: MySCEO,
  redirect: '/mySCEO/sceoList',
  children: [{
    name: 'sceoList',
    path: 'sceoList',
    component: List
  }, {
    name: 'sceoRegister',
    path: 'sceoRegister',
    component: Register
  }]
}

export default router

