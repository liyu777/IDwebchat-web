<template>
  <div id="backPass">
    <el-row class="top">
      <el-col :span="10" :offset="2" class="logo">
        云SCEO<span class="second-logo">找回密码</span>
      </el-col>
      <el-col :span="11" class="nav">
        <ul>
          <li>首页</li>
          <li class="split">|</li>
          <li>登录</li>
          <li class="split">|</li>
          <li>注册</li>
          <li class="split">|</li>
          <li>帮助与文档</li>
          <li class="split">|</li>
          <li>简体中文</li>
        </ul>
      </el-col>
    </el-row>
    <el-row class="center">
      <el-col :span="16" :offset="4" class="main-area">
        <el-row>
          <el-col :span="5" :offset="2" :class="['step', {'step-1-current current': currentStep === 1}, {'step-1': currentStep !== 1}]">
            <span class="step-index">1</span><span class="step-name">输入账户名</span>
          </el-col>
          <el-col :span="5"  :class="['step', {'step-2-current current': currentStep === 2}, {'step-2': currentStep !== 2}]">
            <span class="step-index">2</span><span class="step-name">验证身份</span>
          </el-col>
          <el-col :span="5"  :class="['step', {'step-3-current current': currentStep === 3}, {'step-3': currentStep !== 3}]">
            <span class="step-index">3</span><span class="step-name">重置登录密码</span>
          </el-col>
          <el-col :span="5"  :class="['step', {'step-4-current current': currentStep === 4}, {'step-4': currentStep !== 4}]">
            <span class="step-index">4</span><span class="step-name">重置成功</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <router-view></router-view>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="bottom">
      <el-col :span="16" :offset="4">
        Copyright2017 深圳嘉源锐信管理软件有限公司版权所有
      </el-col>
    </el-row> 
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import * as backPassTypes from '../../types/back-password-types'

export default{
  computed: {
    ...mapGetters({
      currentStep: backPassTypes.GET_CURRENT_STEP
    })
  }
}
</script>
<style scoped>
  #backPass{
    background: #F2F5F8;
    height: 100%;
  }
  .top{
    background: #4D5568;
  }
  .logo{
    background: url(../../assets/images/main/logo.png) no-repeat 10px center;
    height: 80px;
    line-height: 80px;
    font-size: 24px;
    user-select: none;
    cursor: default;
    color: #FFF;
    padding-left: 50px;
  }
  .second-logo{
    font-size: 20px;
    margin-left: 30px;
    border-left: 1px solid #FFF;
    padding-left: 20px;
  }
  .nav{
    height: 80px;
    line-height: 80px;
    font-size: 14px;
    color: #939FAF;
  }
  .nav ul{
    text-align: right;
    height: 80px;
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
  .nav li.split{
    color: #B3B8BE;
    opacity: 0.5;
    cursor: default;
  }
  .bottom {
    position: fixed;
    bottom: 0px;
    height: 50px;
    line-height: 50px;
    background: #F2F5F8;
    width: 100%;
    text-align: center;
    font-size: 12px;
  }
  .main-area{
    margin-top: 30px;
    height: 1000px;
    background: #FFF;
  }
  .step{
    float: left;
    margin-top: 40px;
    height: 60px;
    line-height: 60px;
    white-space: nowrap;
    text-align: center;
    user-select: none;
    cursor: default;
  }
  .step.current{
    color: #5485FE;
  }
  .step.current .step-index{
    background: #20A0FF;
  }
  .step-1{
    background: #F7F7F7;
    background: linear-gradient(-135deg, transparent 20px, #F7F7F7 0) top right, 
                linear-gradient(-45deg, transparent 20px, #F7F7F7 0) bottom right;
    background-size: 100% 50%;
    background-repeat: no-repeat;
  }
  .step-1-current{
    background: #D5E6FD;
    background: linear-gradient(-135deg, transparent 20px, #D5E6FD 0) top right, 
                linear-gradient(-45deg, transparent 20px, #D5E6FD 0) bottom right;
    background-size: 100% 50%;
    background-repeat: no-repeat;
  }
  .step-2,.step-3{
    background: #F7F7F7;
    background: linear-gradient(135deg, transparent 20px, #F7F7F7 0) bottom left,
                linear-gradient(45deg, transparent 20px, #F7F7F7 0) top left,
                linear-gradient(-135deg, transparent 20px, #F7F7F7 0) top right, 
                linear-gradient(-45deg, transparent 20px, #F7F7F7 0) bottom right;
    background-size: 51% 50%;
    background-repeat: no-repeat;
  }
  .step-2-current,.step-3-current{
    background: #D5E6FD;
    background: linear-gradient(135deg, transparent 20px, #D5E6FD 0) bottom left,
                linear-gradient(45deg, transparent 20px, #D5E6FD 0) top left,
                linear-gradient(-135deg, transparent 20px, #D5E6FD 0) top right, 
                linear-gradient(-45deg, transparent 20px, #D5E6FD 0) bottom right;
    background-size: 51% 50%;
    background-repeat: no-repeat;
  }
  .step-4{
    background: #F7F7F7;
    background: linear-gradient(135deg, transparent 20px, #F7F7F7 0) bottom left,
                linear-gradient(45deg, transparent 20px, #F7F7F7 0) top left;
    background-size: 100% 50%;
    background-repeat: no-repeat;
  }
  .step-4-current{
    background: #D5E6FD;
    background: linear-gradient(135deg, transparent 20px, #D5E6FD 0) bottom left,
                linear-gradient(45deg, transparent 20px, #D5E6FD 0) top left;
    background-size: 100% 50%;
    background-repeat: no-repeat;
  }
  .step-name{
    padding-left: 10px;
  }
  .step-index{
    font-size: 20px;
    padding: 5px 11px;
    border-radius: 18px;
    background: #C1C7D2;
    color: #fff;
  }
</style>
