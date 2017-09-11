<template>
  <div class="set-number">
    <p class="title">设置锐信号</p>
    <el-form :model="formData" ref="formData" :rules="rules" label-width="100px">
      <el-form-item prop="sceoNumber" label="锐信号">
        <el-input class="input" v-model="formData.sceoNumber" :maxlength="20" placeholder="输入锐信号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="input" type="info" @click="done">完成</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import validate from '../../utils/validate'
  import * as userTypes from '../../types/user-info-types'
  import authApi from '../../api/auth'
  import {mapGetters} from 'vuex'

  export default {
    mounted () {
      if (!this.userInfo) {
        this.$router.push({name: 'setSceoNumber'})
      }
      this.$emit('setStep', 2)
    },
    computed: {
      ...mapGetters({
        userInfo: userTypes.GET_CURRENT_USER
      })
    },
    data () {
      return {
        formData: {
          sceoNumber: null
        },
        rules: {
          sceoNumber: [{
            required: true,
            message: '请输入锐信号'
          }, {
            max: 20,
            min: 6,
            message: '长度必须为6~20'
          }, {
            validator (rules, value, callback) {
              if (!validate(value, 'account')) {
                callback('只能是数字，字母或下划线')
              } else {
                callback()
              }
            }
          }, {
            validator (rules, value, callback) {
              // 远程验证锐信号是否可用
              authApi.validateSceoNumber({sceoNumber: value}).then(() => {
                callback()
              }).catch((error) => {
                callback(error.message)
              })
            },
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      done () {
        // 验证
        this.$refs['formData'].validate(reslut => {
          if (reslut) {
            authApi.setSceoNumber({
              id: this.userInfo.id,
              newLoginName: this.formData.sceoNumber
            }).then(() => {
              this.$emit('setSuccess')
              this.$router.push({name: 'setSceoNumberDone'})
            })
          }
        })
      }
    }
  }
</script>
<style scoped>
  .set-number{
    width: 480px;
    margin: 80px auto;
  }
  .set-number .title {
    font-size: 16px;
    font-weight: bold;
    margin-left: 100px;
    margin-bottom: 25px;
  }
  .input{
    width: 280px;
  }
</style>
