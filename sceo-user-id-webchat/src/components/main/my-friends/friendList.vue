<template>
  <div class="friendList">
    <el-table :data="friendsList" highlight-current-row style="width: 100%" max-height="450" :show-header="false" row-dblclick="">
      <el-table-column width="65">
        <template scope="scope">
          <!-- <span class="tx" :class="scope.row.url"></span> -->
          <img src="../img/touxiang.png">
        </template>
      </el-table-column>
      <el-table-column>
        <template scope="scope">
          <div class="nameclass">{{scope.row.name}}</div>
          <div class="descclass">{{scope.row.desc}}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  // import FriendsApi from '../../../api/my-friends'
  export default {
    name: 'friendList',
    data () {
      return {
        friendsList: [{
          name: '张三',
          rxnum: 'rxh1',
          url: '../img/touxiang.png',
          desc: '个性签名'
        },
        {
          name: '李四',
          rxnum: 'rxh2',
          url: 'http://localhost:8080/static/img/touxiang.png',
          desc: '个性签名'
        },
        {
          name: '王五',
          rxnum: 'rxh3',
          url: 'http://localhost:8080/static/img/touxiang.png',
          desc: '个性签名'
        },
        {
          name: '张三',
          rxnum: 'rxh1',
          url: '../img/touxiang.png',
          desc: '个性签名'
        },
        {
          name: '李四',
          rxnum: 'rxh2',
          url: '../img/touxiang.png',
          desc: '个性签名'
        },
        {
          name: '王五',
          rxnum: 'rxh3',
          url: '../img/touxiang.png',
          desc: '个性签名'
        },
        {
          name: '张三',
          rxnum: 'rxh1',
          url: '../img/touxiang.png',
          desc: '个性签名'
        },
        {
          name: '李四',
          rxnum: 'rxh2',
          url: '../img/touxiang.png',
          desc: '个性签名'
        },
        {
          name: '王五',
          rxnum: 'rxh3',
          url: '../img/touxiang.png',
          desc: '个性签名'
        },
        {
          name: '张三',
          rxnum: 'rxh1',
          url: '../img/touxiang.png',
          desc: '个性签名'
        },
        {
          name: '李四',
          rxnum: 'rxh2',
          url: '../img/touxiang.png',
          desc: '个性签名'
        },
        {
          name: '王五',
          rxnum: 'rxh3',
          url: '../img/touxiang.png',
          desc: '个性签名'
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
.nameclass{
  font-size: 15px;
  font-weight: 700;
}
.descclass{
  font-size: 12px;
}
.cell {
  padding: 1px 1px 1px 1px;
}
img {
  border-radius: 30px;
}
.tx{
  width: 40px;
  margin-left: 2px;
  background-size: 40px 40px;
}
</style>
