<template>
  <div class="warper">
    <el-form :model="regInfo" ref="regInfo" :rules="rules" label-width="100px">
      <el-form-item prop="account" label="电子邮箱">
        <el-input  class="input" v-model="regInfo.account" placeholder="请输入邮箱地址"></el-input>
      </el-form-item>
      <el-form-item prop="captcha" label="验证码" :error="captchaError">
        <el-input  class="input" v-model="regInfo.captcha" placeholder="请输入验证码" :maxlength="6" @change="captchaError = ''">
          <el-button slot="append" 
            @click="getCaptcha">
            {{interval.interval? '(' + interval.time + ')秒后重试' : '获取验证码'}}
          </el-button>
        </el-input>
      </el-form-item>
      <el-form-item :error="noAggreeError">
        <el-checkbox class="aggree-desc" v-model="isAggree">同意</el-checkbox>
        <span class="rule">《SCEO使用条款》</span>
      </el-form-item>
      <div class="row">
        <el-button class="input" type="info" @click="next">下一步</el-button>
      </div>
      <div class="use-phone row" @click="usePhone">使用手机号注册</div>
    </el-form>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import * as regTypes from '../../types/reg-types'
  import validate from '../../utils/validate'

  export default {
    created () {
      // 初始化
      this.$store.commit(regTypes.CHANGE_REGISTER_TYPE, {type: 2})
    },
    mounted () {
      // 设置当前步骤
      this.$store.commit(regTypes.SET_CURRENT_STEP, 1)
    },
    computed: {
      ...mapGetters({
        regInfo: regTypes.GET_REG_INFO,
        validationInfo: regTypes.GET_VALIDATE_INFO,
        interval: regTypes.GET_TIME_INTERVAL,
        currentStep: regTypes.GET_CURRENT_STEP
      })
    },
    data () {
      const store = this.$store
      return {
        isAggree: true,
        noAggreeError: '',
        captchaError: '',
        rules: {
          account: [{
            required: true,
            message: '请输入邮箱地址'
          }, {
            validator (rule, value, callback) {
              if (!validate(value, 'email')) {
                callback('邮箱格式不正确')
              } else {
                // 远端验证邮箱是否可用
                store.dispatch(regTypes.EMAIL_VALIDATE, {
                  success () {
                    callback()
                  },
                  error () {
                    callback('该邮箱不可用')
                  }
                })
              }
            },
            trigger: 'blur'
          }],
          captcha: [{
            required: true,
            message: '验证码不能为空'
          }]
        }
      }
    },
    methods: {
      getCaptcha () {
        const store = this.$store
        // 不可重试期间点击无效
        if (this.interval.interval) {
          return
        }
        // 验证邮箱格式是否正确
        this.$refs['regInfo'].validateField('account', (message) => {
          if (!message) {
            // 邮箱通过验证，获取验证码
            store.dispatch(regTypes.GET_EMAIL_CAPTCHA)
          }
        })
      },
      next () {
        const that = this
        // 验证表单
        this.$refs['regInfo'].validate((isSuccess) => {
          if (isSuccess) {
            // 表单验证通过
            if (this.isAggree) {
              // 验证手机验证码
              that.$store.dispatch(regTypes.CAPTCHA_VALIDATE, {
                sendStr: that.regInfo.account,
                sendType: '2',
                success () {
                  // 跳转到下一步
                  that.$router.push({name: 'RegSetPassword'})
                },
                error (err) {
                  // 强制触发错误信息变更
                  that.captchaError = ''
                  setTimeout(() => {
                    that.captchaError = err
                  })
                }
              })
            } else {
              that.noAggreeError = '请同意《SCEO使用条款》'
            }
          }
        })
      },
      usePhone () {
        this.$router.push({name: 'RegCreateByPhone'})
      }
    },
    watch: {
      isAggree (newValue, oldValue) {
        if (newValue) {
          this.noAggreeError = ''
        }
      }
    }
  }
</script>
<style scoped>
  .warper{
    width: 480px;
    margin: 80px auto;
  }
  .change-to-email{
    font-size: 12px;
  }
  .aggree-desc{
    white-space: nowrap;
  }
  .rule{
    color: #E1C596;
    font-size: 14px;
    user-select: none;
    cursor: pointer;
    white-space: nowrap;
  }
  .use-phone{
    cursor: pointer;
    color: #5485FE;
  }
  .input{
    width: 280px
  }
  .input-pre{
    width: 70px;
  }
  .row{
    margin-left: 100px;
    margin-top: 20px;
  }
</style>

