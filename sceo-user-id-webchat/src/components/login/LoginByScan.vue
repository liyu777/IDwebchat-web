<template>
	<div id="loginByScan">
		<div class="top">
      扫码登录
    </div>
    <div class="code-image">
      <img src="../../assets/images/login/code.png" />
    </div>
    <div class="code-desc">
      <div>打开<span class="sceo-app">SCEO APP</span></div>
      <div>扫一扫登录</div>
    </div>
    <div class="aggree">
      <el-checkbox class="aggree-desc" v-model="aggree">我已阅读并同意</el-checkbox><span class="rule">《SCEO使用条款》</span>
    </div>
    <div class="help">
      <span class="user-help">使用帮助</span> | 下载 <span class="sceo-app">SCEO APP</span>
    </div>
    <router-link :to="'login-by-password'"  class="to-password-login" title="密码登录"></router-link >
    <div class="password-cover"></div>
	</div>
</template>
<script>
  export default {
    data () {
      return {
        aggree: true
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
    user-select:none;
    cursor: default;
  }
  .code-image{
    height: 150px;
    width: 150px;
    margin-left: 105px;
    user-select: none;
    cursor: default;
  }
  .code-desc{
    height: 40px;
    width: 150px;
    margin-left: 105px;
    margin-top: 20px;
    user-select: none;
    cursor: default;
    padding-left:50px;
    color: #E4ECF2;
    font-size: 14px;
    background: url(../../assets/images/login/scan-in.png) no-repeat 4px center,url(../../assets/images/login/scan-out.png) no-repeat 5px center;
  }
  .sceo-app{
    color: #E1C596;
    cursor: pointer;
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
  }
  .aggree .rule{
    color: #E1C596;
    font-size: 14px;
    user-select: none;
    cursor: pointer;
  }
  .help{
    text-align: center;
    font-size: 14px;
    color: #E4ECF2;
    margin-top: 15px;
    user-select: none;
    cursor: default;
  }
  .help span{
    cursor: pointer;
  }
  .user-help:hover{
    color: #A5D3F7;
  }
  .to-password-login{
    height: 35px;
    width: 33px;
    position: absolute;
    background: url(../../assets/images/login/login-by-pass.png);
    margin-top: -365px;
    margin-left: 318px;
    cursor: pointer;
  }
  .password-cover{
    height: 50px;
    width: 50px;
    background: #657582;
    position: absolute;
    transform: rotate(45deg);
    margin-top: -358px;
    margin-left: 277px;
  }
</style>
