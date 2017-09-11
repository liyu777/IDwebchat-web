e<template>
  <div id="mainArea">
    <p class="title">设置邮箱</p>
    <el-form :model="formData" ref="formData" :rules="rules" label-width="95px" class="form">
      <el-form-item prop="newEmail" label="新邮箱地址">
        <el-input class="input"  placeholder="请输入邮箱地址" v-model="formData.newEmail">
        </el-input>
      </el-form-item>
      <el-form-item label="邮箱验证码" prop="captcha" :error="errInfo">
        <el-input  class="input" v-model="formData.captcha" placeholder="请输入验证码" :maxlength="6" @change="errorInfo = ''">
          <el-button slot="append" 
            @click="getCaptcha">
            {{interval ? '(' + time + ')秒后重试' : '获取验证码'}}
          </el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="input" type="info" @click="next">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import * as userTypes from '../../types/user-info-types'
  import * as commonTypes from '../../types/common-types'
  import authApi from '../../api/auth'
  import validate from '../../utils/validate'

  export default {
    mounted () {
      if (!this.userInfo) {
        this.$router.push({name: 'changeEmail'})
      }
      // 设置当前步骤
      this.$emit('setStep', 2)
    },
    computed: {
      ...mapGetters({
        userInfo: userTypes.GET_CURRENT_USER
      })
    },
    data () {
      const that = this
      return {
        formData: {
          newEmail: null,
          captcha: null,
          nationality: 'CN'
        },
        sendCaptchaFlag: false,
        interval: false,
        time: 60,
        errInfo: '',
        rules: {
          newEmail: [{
            required: true,
            message: '邮箱地址不能为空'
          }, {
            validator (rule, value, callback) {
              // 验证邮箱地址
              if (!validate(value, 'email')) {
                callback('邮箱格式不正确')
              } else {
                // 远程验证用户名是否可用
                authApi.validateEmail({
                  account: that.formData.newEmail,
                  nationality: that.formData.nationality
                }, () => {
                  callback()
                }, err => {
                  callback(err.message)
                })
              }
            },
            trigger: 'blur'
          }],
          captcha: [{
            required: true,
            message: '请输入验证码'
          }, {
            validator (rules, value, callback) {
              // 判断有没有获取验证码
              if (!that.sendCaptchaFlag) {
                callback('请先获取验证码')
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      getCaptcha () {
        if (this.interval) {
          return
        }
        // 验证邮箱是否正确
        this.$refs['formData'].validateField('newEmail', (message) => {
          if (!message) {
            // 获取验证码，验证相关信息初始化
            this.sendCaptchaFlag = false
            this.isValidated = false
            authApi.getEmailCaptcha({
              account: this.formData.newEmail,
              nationality: this.formData.nationality,
              captchaType: commonTypes.FUNCTION_TYPE_CHANGE_EMAIL
            }, () => {
              this.sendCaptchaFlag = true
              this.interval = setInterval(() => {
                this.time--
                if (this.time === 0) {
                  clearInterval(this.interval)
                  // 重置验证码相关信息
                  this.interval = null
                  this.time = 60
                }
              }, 1000)
            })
          }
        })
      },
      // 下一步
      next () {
        const that = this
        // 验证表单
        this.$refs['formData'].validate(result => {
          if (result) {
            // 验证成功, 远程验证验证码
            authApi.captchaValidate({
              captcha: that.formData.captcha,
              sendStr: that.formData.newEmail,
              sendType: '2'
            }, data => {
              // 验证成功，修改手机号
              authApi.changeEmail({
                id: that.userInfo.id,
                newEmail: that.formData.newEmail,
                nationality: that.userInfo.nationality
              }).then(() => {
                that.$router.push({name: 'changeEmailDone'})
              })
            }, err => {
              that.errInfo = ''
              setTimeout(() => {
                that.errInfo = err.message
              })
            })
          }
        })
      }
    }
  }
</script>
<style scoped>
  #mainArea{
    width: 480px;
    margin: 80px auto;
  }
  #mainArea .title {
    font-size: 16px;
    font-weight: bold;
    margin-left: 90px;
    margin-bottom: 5px;
  }
  .form{
    margin-top: 20px
  }
  .input{
    width: 280px
  }
  .input-pre{
    width: 80px;
  }
  .prev{
    width: 90px;
  }
  .next{
    width: 177px;
  }
  .other{
    float: right;
    margin-right: 105px;
    color: #5485FE;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
    cursor: pointer;
  }
</style>
