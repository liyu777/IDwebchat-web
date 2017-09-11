import MyAccount from '@/components/main/my-account/MyAccount'
import Basic from '@/components/main/my-account/Basic'
import Detail from '@/components/main/my-account/Detail'
import Educate from '@/components/main/my-account/Educate'
import Tran from '@/components/main/my-account/Tran'
import Job from '@/components/main/my-account/Job'
import SceoNumber from '@/components/main/my-account/SceoNumber'
import PhoneSecurity from '@/components/main/my-account/PhoneSecurity'
import EmailSecurity from '@/components/main/my-account/EmailSecurity'
import QuestionSecurity from '@/components/main/my-account/QuestionSecurity'
import PasswordSecurity from '@/components/main/my-account/PasswordSecurity'
import Avatar from '@/components/main/my-account/Avatar'

export default {
  name: 'myAccount',
  path: '/myAccount',
  component: MyAccount,
  redirect: '/myAccount/basic',
  meta: {
    menuLevel: 'first'
  },
  children: [{
    name: 'basic',
    path: 'basic',
    component: Basic,
    meta: {
      menuLevel: 'second'
    }
  }, {
    name: 'detail',
    path: 'detail',
    component: Detail,
    meta: {
      menuLevel: 'second'
    }
  }, {
    name: 'edu',
    path: 'edu',
    component: Educate,
    meta: {
      menuLevel: 'second'
    }
  }, {
    name: 'tran',
    path: 'tran',
    component: Tran,
    meta: {
      menuLevel: 'second'
    }
  }, {
    name: 'job',
    path: 'job',
    component: Job,
    meta: {
      menuLevel: 'second'
    }
  }, {
    name: 'sceoNumber',
    path: 'sceoNumber',
    component: SceoNumber,
    meta: {
      menuLevel: 'second'
    }
  }, {
    name: 'phone',
    path: 'phone',
    component: PhoneSecurity,
    meta: {
      menuLevel: 'second'
    }
  }, {
    name: 'email',
    path: 'email',
    component: EmailSecurity,
    meta: {
      menuLevel: 'second'
    }
  }, {
    name: 'question',
    path: 'question',
    component: QuestionSecurity,
    meta: {
      menuLevel: 'second'
    }
  }, {
    name: 'password',
    path: 'password',
    component: PasswordSecurity,
    meta: {
      menuLevel: 'second'
    }
  }, {
    name: 'avatar',
    path: 'avatar',
    component: Avatar,
    meta: {
      menuLevel: 'second'
    }
  }]
}
