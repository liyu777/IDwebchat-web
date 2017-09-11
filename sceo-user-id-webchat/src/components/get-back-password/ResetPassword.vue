<template>
  <div class="warper">
    <p class="title">设置登录密码</p>
    <el-form :model="formData" ref="formData" :rules="rules" label-width="110px">
      <el-form-item prop='password' label="登录密码">
        <el-tooltip placement="right" effect="light" v-model="isShowTip" :manual="true">
          <div slot="content">
            <password-validate :password="formData.password"/>
          </div>
          <el-input type="password" icon="lsf-icon" v-model="password" class="input" placeholder="请设置你的登录密码"
           @focus="isShowTip = true" 
           @blur="isShowTip = false"></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item prop='rePassword' label="重复登录密码">
        <el-input type="password" icon="lsf-icon" class="input" v-model="formData.rePassword" placeholder="请重复你的登录密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="input" type="info" @click="submit">完成</el-button >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import * as backPassTypes from '../../types/back-password-types'
  import {mapGetters} from 'vuex'
  import {validatePassword} from '../../utils/validate'
  import passwordValidate from '../commons/PasswordValidate'

  export default {
    beforeMount () {
      // 判断前置条件，不满足返回上一步
      if (!this.validate.isDragValidate || !this.validate.isAccountValidate) {
        this.$router.push({name: 'InputAccoutName'})
      }
    },
    components: {
      'password-validate': passwordValidate
    },
    mounted () {
      // 设置本页面步骤
      this.$store.commit(backPassTypes.SET_CURRENT_STEP, 3)
    },
    computed: {
      ...mapGetters({
        formData: backPassTypes.GET_FORM_DATA,
        validate: backPassTypes.GET_VALIDATE
      }),
      password: {
        get () {
          return this.formData.password
        },
        set (val) {
          this.$store.commit(backPassTypes.SET_PASSWORD, val)
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
              that.$refs['formData'].validateField('password', message => {
                if (!message) {
                  // 通过验证，验证密码是否正确
                  if (that.formData.password !== that.formData.rePassword) {
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
        // 验证表单
        this.$refs['formData'].validate(result => {
          if (result) {
            this.$store.dispatch(backPassTypes.RESET_PASSWORD, () => {
              // 跳转到成功界面
              this.$router.push({name: 'ResetPasswordDone'})
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
