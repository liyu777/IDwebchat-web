<template>
  <div class="warp">
    <div>
      <div class="title">设置锐信号</div>
      <div v-if="userInfo.sceoNumber">
        <p class="set-y">
          <i class="el-icon-circle-check"> 已设置</i>
          <p>您已设置锐信号为<span class="sceo-number">{{userInfo.sceoNumber}}</span>，可用于登录</p>
        </p>
      </div>
      <div v-else>
        <p class="set-n">
          <i class="el-icon-circle-close"> 未设置</i> <span class="link" @click="setUp">设置</span>
          <p>锐信号可用作登录账号，只可设置一次，请谨慎操作</p>
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
        this.$router.push({name: 'setSceoNumber'})
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
