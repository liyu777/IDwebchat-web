<template>
  <div class="warper"  v-loading.body="loading">
    <el-form :model="regInfo" ref="regInfo" :rules="rules" label-width="100px">
      <el-form-item prop="nationality" label="国籍/地区">
        <el-select class="input" placeholder="请选择" v-model="regInfo.nationality" disabled>
          <el-option 
            v-for="item in dicts['GJDQ']" 
            :key="item.value" 
            :label="item.label" 
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="account" label="手机号">
        <el-input class="input"  placeholder="请输入手机号码" v-model.number="regInfo.account" :maxlength="11">
          <el-select class="input-pre" slot="prepend"  placeholder="请选择" v-model="regInfo.worldPost" disabled>
            <el-option
              v-for="item in dicts['SJHLX']"
              :key="item.value" 
              :label="item.label" 
              :value="item.value">
            </el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item prop="captcha" label="验证码" :error="errorInfo.captchaError">
        <el-input  class="input" v-model="regInfo.captcha" placeholder="请输入验证码" :maxlength="6" 
          @change="errorInfo.captchaError = ''">
          <el-button slot="append" 
            @click="getCaptcha">
            {{interval.interval? '(' + interval.time + ')秒后重试' : '获取验证码'}}
          </el-button>
        </el-input>
      </el-form-item>
      <el-form-item :error="errorInfo.noAggreeError">
        <el-checkbox class="aggree-desc" v-model="isAggree">同意</el-checkbox>
        <span class="rule">《SCEO使用条款》</span>
      </el-form-item>
      <div class="row">
        <el-button class="input" type="info" @click="next">下一步</el-button>
      </div>
      <div class="use-email row" @click="useEmail">使用邮箱注册</div>
    </el-form>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import * as dictTypes from '../../types/dict-types'
  import * as regTypes from '../../types/reg-types'
  import validate from '../../utils/validate'

  export default {
    computed: {
      ...mapGetters({
        dicts: dictTypes.GET_ALL_DICTS,
        regInfo: regTypes.GET_REG_INFO,
        validationInfo: regTypes.GET_VALIDATE_INFO,
        interval: regTypes.GET_TIME_INTERVAL,
        currentStep: regTypes.GET_CURRENT_STEP
      })
    },
    created () {
      // 初始化
      this.$store.commit(regTypes.CHANGE_REGISTER_TYPE, {type: 1})
    },
    mounted () {
      // 获取数据字典
      this.$store.dispatch(dictTypes.GET_DICT_BY_CODES, ['GJDQ', 'SJHLX']).then(() => {
        this.loading = false
      })
      // 设置当前步骤
      this.$store.commit(regTypes.SET_CURRENT_STEP, 1)
    },
    data () {
      const store = this.$store
      return {
        loading: true,
        errorInfo: {
          captchaError: '',
          noAggreeError: ''
        },
        rules: {
          account: [{
            required: true,
            message: '手机号不能为空'
          }, {
            validator (rule, value, callback) {
              // 验证手机号
              if (!validate(value, 'phone')) {
                callback('手机号格式不正确')
              } else {
                // 远程验证用户名是否可用
                store.dispatch(regTypes.PHONE_VALIDATE, {
                  success () {
                    callback()
                  },
                  error (err) {
                    callback(err.message)
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
        },
        // 是否同意使用条款
        isAggree: true
      }
    },
    methods: {
      getCaptcha () {
        // 不可重试期间点击无效
        if (this.interval.interval) {
          return
        }
        // 验证手机号是否正确
        this.$refs['regInfo'].validateField('account', (message) => {
          if (!message) {
            // 手机号通过验证，获取验证码
            this.$store.dispatch(regTypes.GET_PHONE_CAPTCHA)
          }
        })
      },
      next () {
        const that = this
        // 验证表单
        this.$refs['regInfo'].validate((isSuccess) => {
          // 表单验证通过
          if (isSuccess) {
            // 是否同意
            if (this.isAggree) {
              // 验证手机验证码
              this.$store.dispatch(regTypes.CAPTCHA_VALIDATE, {
                sendStr: that.regInfo.worldPost + that.regInfo.account,
                sendType: '1',
                success () {
                  // 跳转到下一步
                  that.$router.push({name: 'RegSetPassword'})
                },
                error (err) {
                  // 强制触发错误信息变更
                  that.errorInfo.captchaError = ''
                  setTimeout(() => {
                    that.errorInfo.captchaError = err
                  })
                }
              })
            } else {
              this.errorInfo.noAggreeError = '请同意《SCEO使用条款》'
            }
          }
        })
      },
      useEmail () {
        this.$router.push({name: 'RegCreateByEmail'})
      }
    },
    watch: {
      isAggree (newValue, oldValue) {
        if (newValue) {
          this.errorInfo.noAggreeError = ''
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
  .use-email{
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

