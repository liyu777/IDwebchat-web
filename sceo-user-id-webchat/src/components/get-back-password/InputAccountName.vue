<template>
	<div class="input-account">
    <el-form :model="formData" ref="formData" :rules="rules" label-width="70px">
      <el-form-item prop="account" label="账户名">
        <el-input  class="input" placeholder="锐信号/手机号/邮箱" v-model="formData.account"></el-input>
      </el-form-item>
      <el-form-item label="验证">
        <drag-validate @success="dragValidateSuccess"></drag-validate>
      </el-form-item>
      <el-form-item>
        <el-button class="submit" type="info" @click="next">下一步</el-button >
      </el-form-item>
    </el-form> 
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import * as backPassTypes from '../../types/back-password-types'
  import dragValidate from '../commons/DragValidate'
  import validate from '../../utils/validate'

  export default {
    data () {
      const that = this
      return {
        rules: {
          account: [{
            required: true,
            message: '账户名不能为空'
          }, {
            validator (rules, value, callback) {
              // 验证格式, 手机号，邮箱，锐信号满足其中之一即可
              if (!validate(value, 'phone') && !validate(value, 'email') && !validate(value, 'account')) {
                callback('请输入正确的 手机 / 邮箱 / 锐信号 格式')
              } else {
                // 远端验证用户名
                that.$store.dispatch(backPassTypes.VALIDATE_ACCOUNT, {
                  success (data) {
                    callback()
                  },
                  error (errMsg) {
                    callback(errMsg)
                  }
                })
              }
            },
            trigger: 'blur'
          }]
        }
      }
    },
    computed: {
      ...mapGetters({
        formData: backPassTypes.GET_FORM_DATA,
        currentStep: backPassTypes.GET_CURRENT_STEP,
        validate: backPassTypes.GET_VALIDATE
      })
    },
    created () {
       // 初始化数据
      this.$store.commit(backPassTypes.RESET_DATA)
    },
    mounted () {
      // 设置本页面步骤
      this.$store.commit(backPassTypes.SET_CURRENT_STEP, 1)
    },
    components: {
      'drag-validate': dragValidate
    },
    methods: {
      dragValidateSuccess () {
        this.$store.commit(backPassTypes.PASS_DRAG_VALIDATE)
      },
      next () {
        const that = this
        // 表单验证
        this.$refs['formData'].validate(isPassValidate => {
          if (isPassValidate) {
            // 是否拖拽验证
            if (!that.validate.isDragValidate) {
              // 未验证
              this.$message({
                message: '请完成拖动验证',
                type: 'warning'
              })
              return
            }
            // 跳转到下一步
            that.$router.push({name: 'AuthValidate'})
          }
        })
      }
    }
  }
</script>
<style scoped>
  .input-account{
    text-align: center;
    width: 350px;
    margin: 80px auto;
    padding-right: 60px;
  }
  .submit{
    width:100%;
  }
</style>
