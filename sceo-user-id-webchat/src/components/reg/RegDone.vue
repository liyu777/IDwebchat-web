<template>
  <div>
    <el-row>
      <el-col :span="24" class="rol top">
        <i class="el-icon-circle-check"></i>
      </el-col>
      <el-col :span="24" class="rol">
        恭喜您，注册成功！
      </el-col>
      <el-col :span="24" class="rol-goto">
        <span v-text="time" class="time"></span> 秒钟之后，跳转至 <router-link :to="{name: 'home'}">首页</router-link>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import * as regTypes from '../../types/reg-types'

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
      this.$store.commit(regTypes.SET_CURRENT_STEP, 3)
    },
    data () {
      return {
        time: 3
      }
    }
  }
</script>
<style scoped>
  .step{
    float: left;
    margin-top: 40px;
    height: 60px;
    line-height: 60px;
    white-space: nowrap;
    text-align: center;
    user-select: none;
    cursor: default;
  }
  .step.current{
    color: #5485FE;
  }
  .step.current .step-index{
    background: #20A0FF;
  }
  .step-1{
    background: #F7F7F7;
    background: linear-gradient(-135deg, transparent 20px, #F7F7F7 0) top right, 
                linear-gradient(-45deg, transparent 20px, #F7F7F7 0) bottom right;
    background-size: 100% 50%;
    background-repeat: no-repeat;
  }
  .step-2{
    background: #F7F7F7;
    background: linear-gradient(135deg, transparent 20px, #F7F7F7 0) bottom left,
                linear-gradient(45deg, transparent 20px, #F7F7F7 0) top left,
                linear-gradient(-135deg, transparent 20px, #F7F7F7 0) top right, 
                linear-gradient(-45deg, transparent 20px, #F7F7F7 0) bottom right;
    background-size: 51% 50%;
    background-repeat: no-repeat;
  }
  .step-3{
    background: #D5E6FD;
    background: linear-gradient(135deg, transparent 20px, #D5E6FD 0) bottom left,
                linear-gradient(45deg, transparent 20px, #D5E6FD 0) top left;
    background-size: 100% 50%;
    background-repeat: no-repeat;
  }
  .step-name{
    padding-left: 10px;
  }
  .step-index{
    font-size: 20px;
    padding: 5px 11px;
    border-radius: 18px;
    background: #C1C7D2;
    color: #fff;
  }
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

