<template>
  <div class="chatAll">
    <div class="chatMain">
      <div class="header">
        <div class="avatar">
          <img v-if="!!userInfo.path" :src="userInfo.path" class="head-image">
          <img src="../../../assets/images/main/default-avatar.jpg" class="head-image">
        </div>
        <div class="name-info">
          <!-- {{userInfo.nickName}} -->
          金城武
        </div>
        <div class="desc-info">
          自信人生两百年，会当水击三千里
        </div> 
        <div class="serch_info">
          <el-input v-model="input" icon="search" placeholder="搜索联系人、群"></el-input>
        </div>
      </div>

      <div class="tab">
        <el-row>
          <el-col :span="8"><router-link to='./chatMain/chatList'><i class="el-icon-message"></i></router-link></el-col>
          <el-col :span="8"><router-link to='./friendList'><i class="el-icon-message"></i></router-link></el-col>
          <el-col :span="8"><router-link to='./groupList'><i class="el-icon-message"></i></router-link></el-col>
        </el-row>
      </div>

      <div class="main-content">
        <router-view></router-view>
      </div>
      <div class="tab">
        <el-row>
          <el-col :span="8"><i class="el-icon-message"></i></el-col>
          <el-col :span="8"><div @click="dialogVisible = true"><i class="el-icon-plus"></i></div></el-col>
          <el-col :span="8"><i class="el-icon-message"></i></el-col>
        </el-row>
        <el-dialog title="添加好友" v-model="dialogVisible" size="tiny">
          <AddFriends align='center'></AddFriends>
        </el-dialog>
      </div>
    </div>
    <div class="chatMain2">
      <div class="chatHead">
        <img class="head-image2" src="../img/touxiang.png">
        <div class="chatName">张三</div>
      </div>
      <div class="chatArea">无消息记录</div>
      <hr/>
      <div class="chatMsg">
        <div class="chatTab1">
          <i class="el-icon-message"></i>
          <i class="el-icon-picture"></i>
          <i class="el-icon-document"></i>
          <i class="el-icon-time"></i>
        </div>
        <div class="chatInput">
          <!-- <pre></pre> -->
          <textarea></textarea>
        </div>
        <div class="chatTab2">
            <span class="chatTab2-desc">按下Ctrl+Enter换行</span>
            <el-button>发送</el-button>
        </div>
        </div>
      </div>
      <hr/>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import * as userTypes from '../../../types/user-info-types'
  import AddFriends from '@/components/main/my-friends/addFriends'
  export default {
    name: 'chatMain',
    data () {
      return {
        dialogVisible: false
      }
    },
    created: function () {
      console.log(this.userInfo)
    },
    components: {
      AddFriends
    },
    computed: {
      ...mapGetters({
        userInfo: userTypes.GET_CURRENT_USER
      })
    },
    methods: {
      showList (path) {
        this.$router.push({name: path})
      }
    }
  }
</script>

<style>
.chatAll {
  width: 100%;
  font-size: 0;
}
.chatMain {
  width: 300px;
  display: inline-block;
}
.chatMain2 {
  width: 750px;
  height: 100%;
  margin-left: 0px;
  display: inline-block;
  vertical-align: top;
  font-size: 14px;
  border-right: 1px solid #666;
}
.chatMain .header{
  background: linear-gradient(to right, #beb5ff, #7b9aff, #8599ff, #9fbcff);
  height: 180px;
  text-align: center;
  position: relative;
}
.chatMain .avatar{
  height: 50%;
  text-align: center;
  position: relative;
}
.chatMain .head-image{
  height: 60px;
  width: 60px;
  border-radius: 30px;
  position: absolute;
  bottom:0px;
  left:41%;
}
.chatMain .name-info{
  height: 30px;
  line-height: 30px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin: 2px;
}
.chatMain .desc-info{
  height: 15px;
  line-height: 15px;
  font-size: 12px;
  color: #fff;
}
.chatMain .serch_info{
  height: 25px;
  width: 100%;
  position: absolute;
  bottom:0px;
  left:0px;
}
.chatMain .search_bar_input {
  height: 20px;
  border: 0px;
  background: rgba(190,190,190,0.2);
  position: absolute;
  bottom:1px;
  left:1px;
}
.chatMain .el-input__inner {
  background: rgba(190,190,190,0.2);
  height: 25px;
  border: 0px;
}
.tab {
  height: 40px;
  text-align: center;
  border: 1px solid #D3DCE6;
  font-size: 16px;
}
.tab .el-col-8 {
  height: 40px;
  line-height: 40px;
}
.chatMain .main-content {
  border-right: 1px solid #D3DCE6;
  height: 450px;
}
.chatMain .el-dialog__header {
  padding: 10px 20px 0;
}
.chatMain .el-dialog__body{
  padding: 15px 20px;
}
.chatMain .el-dialog--tiny{
  height: 500px;
}
.chatHead {
  height: 70px;
  background: linear-gradient(to right, #9fbcff, #7b9aff, #8599ff, #9fbcff);
  text-align: center;
}
.chatArea {
  height: 480px;
  line-height: 480px;
  text-align: center;
}
.chatMsg {
  height: 160px;
}
hr {
  margin: 0;
}
.head-image2 {
  height: 50px;
  width: 50px;
  border-radius: 30px;
  margin-top: 8px;
}
.chatName {
  display: inline-block;
  height: 100%;
  line-height: 70px;
  vertical-align: top;
  padding-left: 15px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
}
.chatTab1{
  height: 30px;
  font-size: 22px;
}
.chatInput {
  height: 95px;
  font-size: 14px;
}
.chatTab2{
  height: 40px;
  font-size: 10px;
  text-align: right;
  padding-right: 10px;
}
.chatTab1 .el-icon-message {
  margin-left: 20px;
}
.chatTab1 .el-icon-picture, .el-icon-document, .el-icon-time {
  margin-left: 10px;
}
.chatTab2 .el-button {
  width: 100px;
}
textarea {
  border: 0;
  width: 99%;
  height: 99%;
}
:focus {
  outline-width: 0px;
  outline-color: #fff;
}
</style>
