<template>
  <div class="warp">
    <div>
      <div class="title">设置手机号</div>
      <div v-if="userInfo.mobileNumber">
        <p class="set-y">
          <i class="el-icon-circle-check"> 已设置</i> <span class="link" @click="setUp">修改</span>
          <p>您已绑定了手机<span class="sceo-number">{{userInfo.mobileNumber}}</span>[您的手机为安全手机，可以找回密码，也可用于登录]</p>
        </p>
      </div>
      <div v-else>
        <p class="set-n">
          <i class="el-icon-circle-close"> 未设置</i> <span class="link" @click="setUp">设置</span>
          <p>未绑定手机号，点击设置绑定手机号</p>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import * as userTypes from '../../../types/user-info-types'

  export default {
    computed: {
      ...mapGetters({
        userInfo: userTypes.GET_CURRENT_USER
      })
    },
    methods: {
      setUp () {
        this.$router.push({name: 'changePhoneNumber'})
      }
    }
  }
</script>
<style scoped>
  .warp{
    margin-left: 30px;
  }
  .title{
    font-size: 18px;
    height:40px;
    line-height: 40px;
    border-bottom: solid 1px #ddd;
    color: #aaa
  }
  .set-n {
    font-size: 14px;
    color: red;
    line-height: 20px;
  }
  .set-y{
    font-size: 14px;
    color: #33DABE;
    line-height: 20px;
  }
  .link{
    margin-left: 60px;
    font-size: 14px;
    text-decoration: underline;
    color: #0E6C9C;
    cursor: pointer;
  }
  .sceo-number{
    color: green;
  }
</style>
