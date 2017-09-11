import ChangeQuestion from '../components/question-security/ChangeQuestion'
import AuthValidate from '../components/question-security/AuthValidate'
import SetQuestion from '../components/question-security/SetQuestion'
import ChangeQuestionDone from '../components/question-security/ChangeQuestionDone'

const router = {
  path: '/change-question',
  name: 'changeQuestion',
  component: ChangeQuestion,
  redirect: '/change-question/auth-validate',
  children: [{
    path: 'auth-validate',
    name: 'QuestionAuthValidate',
    component: AuthValidate
  }, {
    path: 'set-question',
    name: 'setQuestion',
    component: SetQuestion
  }, {
    path: 'set-done',
    name: 'changeQuestionDone',
    component: ChangeQuestionDone
  }]
}

export default router
