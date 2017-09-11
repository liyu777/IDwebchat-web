<template>
  <div id="loginByPassWord">
    <div class="top">
      密码登录
    </div>
    <div>
      <form>
        <div class="user-name-outer">
          <input type="input" id="username" name="username" placeholder="锐信号/手机号/邮箱" 
            autocomplete="off" @focus="highlightsplitLine1" @blur="backToNomal1"/>
        </div>
        <div class="split-line" :style="{'border-bottom-color': splitLineColor1}"></div>
        <div class="password-outer">
          <input type="password" id="password" class="password" name="password" placeholder="登录密码" 
            autocomplete="off" @focus="highlightsplitLine2" @blur="backToNomal2"/>
          <span class="forget" @click="getBackPassword">忘记密码</span>
        </div>
        <div class="split-line" :style="{'border-bottom-color': splitLineColor2}"></div>
        <div class="validate">
          <div class="slider">&gt;&gt;</div>
          <div class="tip">按住滑块拖动至最右边</div>
        </div>
        <div class="login-button" @click="login">
          登录
        </div>
        <div class="reg-margin">
          <router-link class="reg-button" :to="'/reg'">注册</router-link>
        </div>
        <div class="other-way-title">
          <div class="left-line"></div>
          <div class="title-desc">第三方登录</div>
          <div class="right-line"></div>
        </div>
        <div class="other-way-login">
          <span class="weixin"></span>
          <span class="qq"></span>
          <span class="weibo"></span>
        </div>
        <div class="aggree">
          <el-checkbox class="aggree-desc" v-model="aggree">我已阅读并同意</el-checkbox><span class="rule">《SCEO使用条款》</span>
        </div>
      </form>
    </div>
    <router-link :to="'login-by-scan'" class="to-scan-login" title="扫码登录"></router-link>
    <div class="code-cover"></div>
  </div>
</template>
<script>
  export default {
    mounted () {
      this.$el.querySelector('#username').focus()
    },
    data () {
      return {
        aggree: true,
        splitLineColor1: '#8E9EAB',
        splitLineColor2: '#8E9EAB'
      }
    },
    methods: {
      highlightsplitLine1 () {
        this.splitLineColor1 = '#FFF'
      },
      backToNomal1 () {
        this.splitLineColor1 = '#8E9EAB'
      },
      highlightsplitLine2 () {
        this.splitLineColor2 = '#FFF'
      },
      backToNomal2 () {
        this.splitLineColor2 = '#8E9EAB'
      },
      login () {
        // 跳转到主页
        this.$router.push({name: 'main'})
      },
      getBackPassword () {
        this.$router.push({name: 'GetBackPassword'})
      }
    }
  }
</script>
<style scoped>
  .top {  
    text-align: center;
    width: 100%;
    height: 80px;
    line-height: 80px;
    color: #E4ECF2;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 1px;
  }
  .password-outer{
    margin-top: 20px;
  }
  input{
    width: 70%;
    margin-left: 15%;
    height : 25px;
    background: #657582;
    border: none;
    color: #B1BEC6;
    outline: none;
    font-size: 14px;
  }
  .split-line{
    border-bottom: solid 1px;
    height: 1px;
    width: 70%;
    margin-left: 15%;
  }
  input::-webkit-input-placeholder { /* WebKit browsers */
    color: #B1BEC6;
    font-size: 14px;
  }
  input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #B1BEC6;
    font-size: 14px;
  }
  input::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #B1BEC6;
    font-size: 14px;
  }
  input:-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #B1BEC6;
    font-size: 14px;
  } 
  input.password{
    width: 200px;
  }
  .forget{
    font-size: 12px;
    color: #B1BEC6;
    cursor: pointer;
    user-select: none;
  }
  .forget:hover{
    color: #20A0FF;
  }
  .validate{
    width: 70%;
    margin-left: 15%;
    height: 30px;
    border: solid 1px #BCCAD5;
    margin-top: 40px;
    border-radius: 2px;
    background: rgba(255,255,255,0.2);
  }
  .validate .slider{
    width: 50px;
    background: rgba(255,255,255,0.2);
    height: 30px;
    line-height: 30px; 
    font-size: 20px;
    text-align: center;
    user-select: none;
    cursor: pointer;
    color: #B1BEC6;
    float:left;
  }
  .validate .tip{
    width: 200px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #B1BEC6;
    text-align: center;
    user-select: none;
    cursor: default;
    float:left;
  }
  .login-button{
    width: 70%;
    margin-left: 15%;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    background: #FFFFFF;
    text-align: center;
    border-radius: 2px;
    margin-top: 30px;
    color: #6E7376;
    user-select: none;
    cursor: pointer;
  }
  .login-button:hover{
    opacity: 0.9;
  }
  .reg-margin{
    margin-top: 10px;
  }
  .reg-button{
    width: 8%;
    margin-left: 77%;
    text-align: right;
    font-size: 12px;
    color: #B1BEC6;
    cursor: pointer;
    user-select: none;
  }
  .reg-button:hover{
    color: #20A0FF;
  }
  .other-way-title{
    margin-top: 20px;
    width: 80%;
    margin-left: 10%;
  }
  .other-way-title div{
    float: left;
  }
  .other-way-title .left-line{
    width: 100px;
    height: 1px;
    background-image: linear-gradient(to left, rgba(142, 158, 171, 1) 0%, rgba(142, 158, 171, 0)100%); 
  }
  .other-way-title .right-line{
    width: 100px;
    height: 1px;
    background-image: linear-gradient(to right, rgba(142, 158, 171, 1) 0%, rgba(142, 158, 171, 0)100%); 
  }
  .title-desc{
    width: 80px;
    font-size: 12px;
    color: #B1BEC6;
    text-align: center;
    margin-top: -8px;
    cursor: default;
    user-select: none;
  }
  .other-way-login{
    margin-top: 70px;
    width: 70%;
    margin-left: 15%;
  }
  .other-way-login span{
    margin-left: 30px;
    margin-right: 10px;
    padding-left: 36px;
    padding-top: 20px;
  }
  .other-way-login .weibo{
    background: url(../../assets/images/login/circular.png),url(../../assets/images/login/weibo.png)  no-repeat center;
  }
  .other-way-login .weixin{
    background: url(../../assets/images/login/circular.png),url(../../assets/images/login/weixin.png) no-repeat center;
  }
  .other-way-login .qq{
    background: url(../../assets/images/login/circular.png),url(../../assets/images/login/qq.png) no-repeat center;
  }
  .aggree{
    margin-top: 20px;
    width: 70%;
    margin-left: 15%;
    font-size: 12px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    user-select: none;
  }
  .aggree .aggree-desc{
    color: #E4ECF2;
    white-space: nowrap;
  }
  .aggree .rule{
    color: #E1C596;
    font-size: 14px;
    user-select: none;
    cursor: pointer;
    white-space: nowrap;
  }
  .to-scan-login{
    height: 33px;
    width: 33px;
    position: absolute;
    background: url(../../assets/images/login/two-dimension-code.png);
    margin-top: -454px;
    margin-left: 318px;
    cursor: pointer;
  }
  .code-cover{
    height: 50px;
    width: 50px;
    background: #657582;
    position: absolute;
    transform: rotate(45deg);
    margin-top: -445px;
    margin-left: 290px;
  }
</style>
