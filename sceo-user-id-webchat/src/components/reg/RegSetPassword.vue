<template>
  <div class="warper">
    <p class="title">设置登录密码</p>
    <el-form :model="regInfo" ref="regInfo" :rules="rules" label-width="110px">
      <el-form-item prop='password' label="登录密码">
        <el-tooltip placement="right" effect="light" v-model="isShowTip" :manual="true">
          <div slot="content">
            <password-validate :password="regInfo.password"/>
          </div>
          <el-input type="password" icon="lsf-icon" v-model="password" class="input" placeholder="请设置你的登录密码"
           @focus="isShowTip = true" 
           @blur="isShowTip = false"></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item prop='rePassword' label="重复登录密码">
        <el-input type="password" icon="lsf-icon" class="input" v-model="regInfo.rePassword" placeholder="请设置你的登录密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="input" type="info" @click="submit">完成</el-button >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import passwordValidate from '../commons/PasswordValidate'
  import { mapGetters } from 'vuex'
  import * as regTypes from '../../types/reg-types'
  import {validatePassword} from '../../utils/validate'

  export default {
    mounted () {
      // 前置验证未完成，跳回到前置步骤
      if (this.regInfo.registerType === '1' && (!this.validationInfo.phone || !this.validationInfo.captcha)) {
        this.$router.push({name: 'RegCreateByPhone'})
      } else if (this.regInfo.registerType === '2' && (!this.validationInfo.email || !this.validationInfo.captcha)) {
        this.$router.push({name: 'RegCreateByEmail'})
      }
      // 设置当前步骤
      this.$store.commit(regTypes.SET_CURRENT_STEP, 2)
    },
    components: {
      'password-validate': passwordValidate
    },
    computed: {
      ...mapGetters({
        regInfo: regTypes.GET_REG_INFO,
        validationInfo: regTypes.GET_VALIDATE_INFO
      }),
      password: {
        get () {
          return this.regInfo.password
        },
        set (val) {
          this.$store.commit(regTypes.SET_PASSWORD, val)
        }
      }
    },
    data () {
      const that = this
      return {
        // 是否显示密码验证框
        isShowTip: false,
        rules: {
          password: [{
            required: true,
            message: '密码不能为空'
          }, {
            validator (rules, value, callback) {
              const result = validatePassword(value)
              if (!result.length.result) {
                callback(result.length.message)
              }
              if (!result.format.result) {
                callback(result.format.message)
              }
              if (!result.complexity.result) {
                callback(result.complexity.message)
              }
              callback()
            },
            trigger: 'blur'
          }],
          rePassword: [{
            required: true,
            message: '请再次输入密码'
          }, {
            validator (rules, value, callback) {
              // 先验证密码是否通过验证
              that.$refs['regInfo'].validateField('password', message => {
                if (!message) {
                  // 通过验证，验证密码是否正确
                  if (that.regInfo.password !== that.regInfo.rePassword) {
                    callback('两次输入的密码不相同')
                  } else {
                    callback()
                  }
                }
              })
            },
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      submit () {
        const that = this
        // 验证表单
        this.$refs['regInfo'].validate(result => {
          if (result) {
            that.$store.dispatch(regTypes.REGISTER, result => {
              that.$router.push({name: 'RegDone'})
            })
          }
        })
      }
    }
  }
</script>
<style scoped>
  .warper{
    width: 480px;
    margin: 80px auto;
  }
  .warper .title {
    font-size: 16px;
    font-weight: bold;
    margin-left: 110px;
    margin-bottom: 20px;
  }
  .input{
    width: 280px
  }
</style>

