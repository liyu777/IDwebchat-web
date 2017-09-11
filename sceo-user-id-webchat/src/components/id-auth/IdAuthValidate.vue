<template>
  <div>
    <div id="validations" v-show="currentValidateWay === 0">
      <div class="validate-title">为确定是您本人操作，请选择验证方式完成身份验证</div>
      <div class="validate-item icon-phone" v-if="validations.mobileNumber">
        <div class="disp-area">
          <p>通过手机验证码</p>
          <span>如果您的手机还在正常使用，请选择此方式</span>
        </div>
        <div class="button-area">
          <el-button type="info" @click="currentValidateWay = 1">立即验证</el-button>
        </div>
      </div>
      <div class="validate-item icon-email" v-if="validations.email">
        <div class="disp-area">
          <p>通过邮箱验证码</p>
        </div>
        <div class="button-area">
          <el-button type="info" @click="currentValidateWay = 2">立即验证</el-button>
        </div>
      </div>
      <div class="validate-item icon-ques" v-if="validations.questionFlag">
        <div class="disp-area">
          <p>通过密保问题</p>
        </div>
        <div class="button-area">
          <el-button type="info" @click="currentValidateWay = 3">立即验证</el-button>
        </div>
      </div>
    </div>
    <validate-by-phone 
      :phone-number="validations.mobileNumber"
      :world-post="validations.worldPost"
      :userId="userId"
      :captchaType="captchaType"
      :isPrev="isPrev"
      v-if="validations.mobileNumber"
      v-show="currentValidateWay === 1"
      @next="next"
      @prev="prev"
      @other="currentValidateWay = 0"></validate-by-phone>
    <validate-by-email
      :email="validations.email"
      :userId="userId"
      :isPrev="isPrev"
      :captchaType="captchaType"
      v-if="validations.email"
      v-show="currentValidateWay === 2"
      @next="next"
      @prev="prev"
      @other="currentValidateWay = 0"></validate-by-email>
    <validate-by-questions
      :userId="userId"
      :isPrev="isPrev"
      v-if="validations.questionFlag"
      v-show="currentValidateWay === 3"
      @next="next"
      @prev="prev"
      @other="currentValidateWay = 0"></validate-by-questions>
      
    </validate-by-email>
  </div>
</template>
<script>
  import authApi from '../../api/auth.js'
  import validateByPhone from './ValidateByPhone'
  import validateByEmail from './ValidateByEmail'
  import validateByQuestions from './ValidateByQuestions'

  export default {
    props: ['userId', 'isPrev', 'captchaType'],
    mounted () {
      const that = this
      // 获取认证方式
      authApi.getValidations(this.userId, (data) => {
        // 获得数据
        that.validations.mobileNumber = data.mobileNumber
        that.validations.worldPost = data.worldPost
        that.validations.email = data.email
        that.validations.nationality = data.nationality
        that.validations.questionFlag = data.questionFlag
      })
    },
    data () {
      return {
        // 验证相关信息
        validations: {
          mobileNumber: null,
          worldPost: null,
          email: null,
          nationality: null,
          questionFlag: false
        },
        // 当前验证方式,0:未验证，1：手机，2：邮箱，3：密保问题
        currentValidateWay: 0
      }
    },
    components: {
      'validate-by-phone': validateByPhone,
      'validate-by-email': validateByEmail,
      'validate-by-questions': validateByQuestions
    },
    methods: {
      next () {
        // 验证成功,触发下一步事件
        this.$emit('success')
      },
      prev () {
        // 上一步, 触发上一步事件
        this.$emit('prev')
      }
    }
  }
</script>
<style scoped>
  #validations {
    width: 800px;
    margin: 80px auto;
  }
  .validate-item {
    border: solid 1px #ddd;
    height: 90px;
    margin-top: 40px;
    padding-left: 100px;
  }
  .validate-item:hover{
    border: #AFD3F5;
    box-shadow: 0px 0px 15px #AFD3F5;
    background-color: #FAFCFE;
  }
  .validate-item .disp-area{
    float: left;
    width:300px;
  }
  .validate-item .button-area{
    float: right;
    line-height: 90px;
    padding-right: 30px
  }
  .validate-item p{
    font-size: 16px;
    width:300px;
  }
  .validate-item span{
    color: #999;
  }
  .icon-phone {
    background: url(../../assets/images/back-pass/icon-validate-phone.png) 30px center no-repeat;
  }
  .icon-email {
    line-height: 58px;
    background: url(../../assets/images/back-pass/icon-validate-email.png) 30px center no-repeat;
  }
  .icon-ques {
    line-height: 58px;
    background: url(../../assets/images/back-pass/icon-validate-ques.png) 30px center no-repeat;
  }
  .validate-title{
    font-size: 16px;
    padding-left: 10px
  }
</style>
