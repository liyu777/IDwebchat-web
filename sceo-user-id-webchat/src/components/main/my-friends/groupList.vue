<template>
  <div class="groupList">
  groupList
  </div>
</template>

<script>
  // import FriendsApi from '../../../api/my-friends'
  export default {
    name: 'groupList',
    data () {
      return {
        groupsList: [{
          id: '123456',
          name: '群聊1'
        },
        {
          id: '123457',
          name: '群聊2'
        },
        {
          id: '123458',
          name: '群聊3'
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
