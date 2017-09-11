import chatMain from '../../components/main/my-friends/chatMain'
import friendList from '../../components/main/my-friends/friendList'
import groupList from '../../components/main/my-friends/groupList'
import chatList from '../../components/main/my-friends/chatList'

const router = {
  name: 'chatMain',
  path: '/chatMain',
  component: chatMain,
  children: [{
    name: 'friendList',
    path: 'friendList',
    component: friendList
  }, {
    name: 'groupList',
    path: 'groupList',
    component: groupList
  }, {
    name: 'chatList',
    path: 'chatList',
    component: chatList
  }]
}

export default router

