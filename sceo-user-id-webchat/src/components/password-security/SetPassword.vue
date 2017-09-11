e<template>
  <div id="mainArea">
    <p class="title">修改登录密码</p>
    <el-form class="form" :model="formData" ref="formData" :rules="rules" label-width="90px">
      <el-form-item prop="oldPassword" label="原密码" :error="errorInfo">
        <el-input type="password" icon="lsf-icon" v-model="formData.oldPassword" class="input" placeholder="输入原密码"
          @change="errorInfo = ''"></el-input>
      </el-form-item>
      <el-form-item prop='newPassword' label="新密码">
        <el-tooltip placement="right" effect="light" v-model="isShowTip" :manual="true">
          <div slot="content">
            <password-validate :password="formData.newPassword"/>
          </div>
          <el-input type="password" icon="lsf-icon" v-model="formData.newPassword" class="input" placeholder="请输入新密码"
           @focus="isShowTip = true" 
           @blur="isShowTip = false"></el-input>
        </el-tooltip>
      </el-form-item>
      <el-form-item prop='rePassword' label="重复密码">
        <el-input type="password" icon="lsf-icon" class="input" v-model="formData.rePassword" placeholder="重复新密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="input" type="info" @click="next">完成</el-button >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import * as userTypes from '../../types/user-info-types'
  import authApi from '../../api/auth'
  import {validatePassword} from '../../utils/validate'
  import passwordValidate from '../commons/PasswordValidate'

  export default {
    mounted () {
      if (!this.userInfo) {
        this.$router.push({name: 'changePassword'})
      }
      // 设置当前步骤
      this.$emit('setStep', 2)
    },
    components: {
      'password-validate': passwordValidate
    },
    computed: {
      ...mapGetters({
        userInfo: userTypes.GET_CURRENT_USER
      })
    },
    data () {
      const that = this
      return {
        // 显示密码强度验证框标志
        isShowTip: false,
        errorInfo: null,
        formData: {
          oldPassword: null,
          newPassword: null,
          rePassword: null
        },
        rules: {
          oldPassword: [{
            required: true,
            message: '原密码不能为空'
          }],
          newPassword: [{
            required: true,
            message: '密码不能为空'
          }, {
            validator (rules, value, callback) {
              // 判断原密码与新密码是否相同
              if (that.formData.oldPassword === that.formData.newPassword) {
                callback('新密码于原密码不能相同')
              } else {
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
              }
            },
            trigger: 'blur'
          }],
          rePassword: [{
            required: true,
            message: '请再次输入密码'
          }, {
            validator (rules, value, callback) {
              // 先验证密码是否通过验证
              that.$refs['formData'].validateField('newPassword', message => {
                if (!message) {
                  // 通过验证，验证密码是否正确
                  if (that.formData.newPassword !== that.formData.rePassword) {
                    callback('两次输入的密码不相同')
                  } else {
                    callback()
                  }
                } else {
                  callback()
                }
              })
            },
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      // 下一步
      next () {
        const that = this
        // 验证表单
        this.$refs['formData'].validate(result => {
          if (result) {
            // 验证成功，修改手机号
            authApi.changePassword({
              id: that.userInfo.id,
              oldPassword: that.formData.oldPassword,
              newPassword: that.formData.newPassword
            }).then(() => {
              that.$router.push({name: 'changePasswordDone'})
            }).catch(() => {
              that.errorInfo = '原密码错误'
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
