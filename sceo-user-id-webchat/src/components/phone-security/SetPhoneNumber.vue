<template>
  <div id="mainArea">
    <p class="title">设置手机号</p>
    <el-form :model="formData" ref="formData" :rules="rules" label-width="95px" class="form">
      <el-form-item prop="newMobileNumber" label="手机号">
        <el-input class="input"  placeholder="请输入手机号码" v-model.number="formData.newMobileNumber" :maxlength="11">
          <el-select class="input-pre" slot="prepend"  placeholder="请选择" v-model="formData.worldPost" disabled>
            <el-option
              v-for="item in dicts['SJHLX']"
              :key="item.value" 
              :label="item.label" 
              :value="item.value">
            </el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="短信验证码" prop="captcha" :error="errInfo">
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
  import * as dictTypes from '../../types/dict-types'
  import * as userTypes from '../../types/user-info-types'
  import * as commonTypes from '../../types/common-types'
  import authApi from '../../api/auth'
  import validate from '../../utils/validate'

  export default {
    mounted () {
      if (!this.userInfo) {
        this.$router.push({name: 'changePhoneNumber'})
      }
      const that = this
      // 获取数据字典
      this.$store.dispatch(dictTypes.GET_DICT_BY_CODES, ['SJHLX'])
      // 设置当前步骤
      that.$emit('setStep', 2)
    },
    computed: {
      ...mapGetters({
        dicts: dictTypes.GET_ALL_DICTS,
        userInfo: userTypes.GET_CURRENT_USER
      })
    },
    data () {
      const that = this
      return {
        formData: {
          newMobileNumber: null,
          captcha: null,
          worldPost: '0086'
        },
        sendCaptchaFlag: false,
        interval: false,
        time: 60,
        errInfo: '',
        rules: {
          newMobileNumber: [{
            required: true,
            message: '手机号不能为空'
          }, {
            validator (rule, value, callback) {
              // 验证手机号
              if (!validate(value, 'phone')) {
                callback('手机号格式不正确')
              } else {
                // 远程验证用户名是否可用
                authApi.validatePhone({
                  account: that.formData.newMobileNumber,
                  worldPost: that.formData.worldPost
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
        // 验证手机号是否正确
        this.$refs['formData'].validateField('newMobileNumber', (message) => {
          if (!message) {
            // 获取验证码，验证相关信息初始化
            this.sendCaptchaFlag = false
            this.isValidated = false
            authApi.getPhoneCaptcha({
              account: this.formData.newMobileNumber,
              worldPost: this.formData.worldPost,
              captchaType: commonTypes.FUNCTION_TYPE_CHANGE_PHONE_NUMBER
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
              sendStr: that.formData.worldPost + that.formData.newMobileNumber,
              sendType: '1'
            }, data => {
              // 验证成功，修改手机号
              authApi.changePhoneNumber({
                id: that.userInfo.id,
                newMobileNumber: that.formData.newMobileNumber,
                worldPost: that.formData.worldPost
              }).then(() => {
                that.$router.push({name: 'changePhoneNumberDone'})
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
