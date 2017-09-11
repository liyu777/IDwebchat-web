import locale from 'element-ui/lib/locale/lang/en'
import home from './home.json'
import myAccount from './my-account.json'

export default {
  // elementUI 国际化
  ...locale,
  // title
  title: 'SCEO ID System',
  // 首页
  home,
  myAccount
}
