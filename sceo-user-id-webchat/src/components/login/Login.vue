<template>
  <div id="login">
    <el-row>
      <el-col :span="8" :offset="2" class="logo">
        <div>云SCEO</div>
      </el-col>
      <el-col :span="13" class="nav">
        <ul>
          <li>首页</li>
          <li class="split">|</li>
          <li>登录</li>
          <li class="split">|</li>
          <li><router-link :to="'/reg'">注册</router-link ></li>
          <li class="split">|</li>
          <li>帮助与文档</li>
          <li class="split">|</li>
          <li>简体中文</li>
        </ul>
      </el-col>
    </el-row>
    <el-row class="center">
      <el-col :span="13" :offset="3" class="poster">
        <div class="title1">一站式数字化管理平台</div>
        <div class="title2">帮你实现业务的精细化管理，简单可落地</div>
        <div class="button">立即体验</div>
      </el-col>
      <el-col :span="8" class="login-area">
        <div class="login-form">
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div  class="bottom-info">Copyright2017深圳嘉源锐信管理软件有限公司版权所有</div>
      </el-col>
    </el-row>
    <div class="bottom"></div>
  </div>
</template>
<script>

  export default {
    name: 'login',
    data () {
      return {
      }
    }
  }

</script>
<style scoped>
  #login {
    height: 100%;
    background: url(../../assets/images/login/main-bg2.png),url(../../assets/images/login/main-bg3.png);
  }
  .logo {
    height: 100px;
    line-height: 100px;
    font-size: 26px;
    background: url(../../assets/images/login/logo.png) no-repeat 10px center;
    padding-left: 60px;
    color: #323B44;
    user-select: none;
    cursor: default;
  }
  .nav{
    height: 100px;
    line-height: 100px;
    font-size: 14px;
  }
  .nav ul{
    text-align: right;
    height: 100px;
    width: 350px;
    margin: 0;
    padding: 0;
    float: right;
    user-select: none;
  }
  .nav li{
    list-style: none;
    float: left;
    margin-left: 10px;
    cursor: pointer;
  }
  .nav li:hover{
    color: blue;
  }
  .nav li.split{
    color: #B3B8BE;
    cursor: default;
  }
  .center{
    background: #323C48 url(../../assets/images/login/poster.png) no-repeat 15% 0;
  }
  .poster{
    height: 658px;
    color: #F2F7FA;
    user-select: none;
    cursor: default;
  }
  .poster .title1{
    margin-top : 270px;
    font-size: 50px; 
    font-weight: lighter;
    height:100px;
    line-height:100px;
    white-space: nowrap;
    letter-spacing: 5px;
  }
  .poster .title2{
    height: 40px;
    line-height: 40px;
    font-size: 32px;
    white-space: nowrap;
  }
  .button{
    margin-top: 20px;
    width: 200px;
    height: 43px;
    line-height: 43px;
    text-align: center;
    background: rgba(200,200,200,0.3);
    font-size: 20px;
    border : solid 1px #FFF;
    border-radius: 2px;
    cursor: pointer;
  }
  .button:hover{
    background: rgba(200,200,200,0.6);
  }
  .login-form{
    background: #657582;
    height: 480px;
    width: 360px;
    margin-top: 90px;
  }
  .bottom-info{
    font-size: 12px;
    width: 80%;
    margin-left: 10%;
    border-top: solid 1px #999EA4;
    color: #999EA4;
    text-align: center;
    margin-top: 50px;
  }
  .bottom{
    position: fixed;
    bottom: 0px;
  }
</style>
