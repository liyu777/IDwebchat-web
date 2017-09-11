<template>
  <div class="chatList">
  chatList
  </div>
</template>

<script>
  // import FriendsApi from '../../../api/my-friends'
  export default {
    name: 'chatList',
    data () {
      return {
        chatsList: [{
          name: '张三',
          rxnum: 'rxh1'
        },
        {
          name: '李四',
          rxnum: 'rxh2'
        },
        {
          name: '王五',
          rxnum: 'rxh3'
        }]
      }
    },
    methods: {
      serchUserForAdd: function () {
        // var _this = this
        // FriendsApi.serchUserForAdd(this.input_serch).catch((error) => {
        //   _this.$message({
        //     type: 'error',
        //     showClose: true,
        //     message: '查找失败:' + error
        //   })
        // })
      }
    }
  }
</script>

<style scoped>
</style>
