/**
 * mock数据
 */
const _menus = [{
  text: '首页',
  name: 'home'
}, {
  text: '我的账户',
  name: 'myAccount',
  children: [{
    text: '个人信息',
    name: 'personal',
    children: [{
      text: '基本资料',
      name: 'basic'
    }, {
      text: '详细资料',
      name: 'detail'
    }, {
      text: '教育经历',
      name: 'edu'
    }, {
      text: '培训经历',
      name: 'tran'
    }, {
      text: '工作经历',
      name: 'job'
    }, {
      text: '头像设置',
      name: 'avatar'
    }]
  }, {
    text: '账户安全',
    name: 'security',
    children: [{
      text: '锐信号',
      name: 'sceoNumber'
    }, {
      text: '实名认证',
      name: 'certification'
    }, {
      text: '密保手机',
      name: 'phone'
    }, {
      text: '密保邮箱',
      name: 'email'
    }, {
      text: '密保问题',
      name: 'question'
    }, {
      text: '登录密码',
      name: 'password'
    }]
  }]
}, {
  text: '我的资产',
  name: 'mySubject'
}, {
  text: '我的职场',
  name: 'myJob'
}, {
  text: '我的SCEO',
  name: 'mySCEO',
  children: [{
    text: '我的SCEO',
    name: 'sceoList'
  }, {
    text: '注册SCEO',
    name: 'sceoRegister'
  }]
}, {
  text: '系统设置',
  name: 'setup',
  children: [{
    text: '新消息提醒',
    name: 'newMsgRemain'
  }, {
    text: '勿扰模式',
    name: 'noMsgOn'
  }, {
    text: '聊天',
    name: 'chatSetup'
  }, {
    text: '隐私',
    name: 'privateShow'
  }]
}, {
  text: '好友列表',
  name: 'chatMain'
}]

export default {
  getMenus () {
    return new Promise((resolve, reject) => {
      resolve(_menus)
    })
  }
}
