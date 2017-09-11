<template>
  <div class="mainArea">
    <p class="title">邮箱验证码验证</p>
    <span class="disc">请确认是您本人操作，并完成以下验证</span>
    <el-form :model="formData" ref="formData" :rules="rules" label-width="95px" class="form">
      <el-form-item label="邮箱地址">
        <span v-text="email"></span>
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
        <el-button class="prev" @click="prev" v-if="isPrev">上一步</el-button>
        <el-button :class="isPrev? 'next' : 'input'" type="info" @click="next">下一步</el-button>
      </el-form-item>
      <el-form-item>
        <span class="other" @click="other">其他验证方式</span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import authApi from '../../api/auth'

  export default {
    props: ['email', 'nationality', 'isPrev', 'userId', 'captchaType'],
    data () {
      const that = this
      return {
        formData: {
          captcha: null
        },
        sendCaptchaFlag: false,
        interval: false,
        time: 60,
        errInfo: '',
        rules: {
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
        // 上次发送的验证码没有结束
        if (this.interval) {
          return
        }
        const that = this
        // 获取验证码，验证相关信息初始化
        this.sendCaptchaFlag = false
        this.isValidated = false
        authApi.getCathchaByUserId({
          id: this.userId,
          sendType: 2,
          captchaType: this.captchaType
        }).then(() => {
          that.sendCaptchaFlag = true
          that.interval = setInterval(() => {
            that.time--
            if (that.time === 0) {
              clearInterval(that.interval)
              // 重置验证码相关信息
              that.interval = null
              that.time = 60
            }
          }, 1000)
        })
      },
      // 上一步
      prev () {
        // 触发父组件事件
        this.$emit('prev')
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
              sendStr: that.userId,
              sendType: '2'
            }, data => {
              // 验证成功,跳转到下一步
              that.$emit('next')
            }, err => {
              // 验证失败，给出提示
              that.errInfo = ''
              setTimeout(() => {
                that.errInfo = err.message
              })
            })
          }
        })
      },
      // 其他验证方式
      other () {
        this.$emit('other')
      }

    }
  }
</script>
<style scoped>
  .mainArea{
    width: 480px;
    margin: 80px auto;
  }
  .mainArea .title {
    font-size: 16px;
    font-weight: bold;
    margin-left: 90px;
    margin-bottom: 5px;
  }
  .mainArea .disc{
    margin-left: 90px
  }
  .form{
    margin-top: 20px
  }
  .input{
    width: 280px
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
