<template>
  <div class="warp">
    <div>
      <div class="title">修改密码</div>
      <p class="set-y">
        <i class="el-icon-circle-check"> 已设置</i> <span class="link" @click="setUp">修改</span>
        <p>高安全性的密码可以使账户更安全。建议您定期更换密码，设置一个包含字母，数字和标点符号中至少两项且长度大于6的密码</p>
      </p>
    </div>
  </div>
</template>
<script>

  export default {
    methods: {
      setUp () {
        this.$router.push({name: 'changePassword'})
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
