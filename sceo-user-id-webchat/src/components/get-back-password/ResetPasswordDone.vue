<template>
  <div>
    <el-row>
      <el-col :span="24" class="rol top">
        <i class="el-icon-circle-check"></i>
      </el-col>
      <el-col :span="24" class="rol">
        恭喜您，修改密码成功！
      </el-col>
      <el-col :span="24" class="rol-goto">
        <span v-text="time" class="time"></span> 秒钟之后，跳转至 <router-link :to="{name: 'Root'}">登录页面</router-link>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import * as backPassTypes from '../../types/back-password-types'
  
  export default {
    mounted () {
      const that = this
      let interval = setInterval(() => {
        if (that.time > 0) {
          that.time --
        } else {
          clearInterval(interval)
          that.$router.push({name: 'home'})
        }
      }, 1000)
      // 设置当前的步骤
      this.$store.commit(backPassTypes.SET_CURRENT_STEP, 4)
    },
    data () {
      return {
        time: 3
      }
    }
  }
</script>
<style scoped>
  .rol{
    text-align: center;
    font-size: 20px;
    margin-top: 20px;
  }
  .top{
    margin-top: 80px;
    font-size: 60px;
    color: #8AD863;
  }
  .rol-goto{
    text-align: center;
    margin-top: 20px;
  }
  .time{
    color: #20A0FF;
  }
</style>
