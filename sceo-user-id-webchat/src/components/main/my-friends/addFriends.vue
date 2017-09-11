<template>
  <div class="addFriends">
    <div class="title_tabs">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="找人" name="first">
          <div class="serch_bar">
            <el-input v-model="input_serch" icon="search" placeholder="锐信号、昵称、姓名、邮箱地址或手机号"></el-input>
            <el-button type="primary" v-on="serchUserForAdd()">查找</el-button>
          </div>
          <div class="friends_list">
            <el-table :data="userList" height="340" border style="width: 100%">
              <el-table-column align="center" type="index" label="序号" width="70"></el-table-column>
              <el-table-column align="center" prop="name" label="姓名"></el-table-column>
              <el-table-column align="center" prop="rxnum" label="锐信号"></el-table-column>
              <el-table-column align="center" label="操作" width="80">
                <template scope="scope">
                  <el-button @click="" type="text" size="small">
                    添加
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="找群" name="second">
          <div class="serch_bar">
            <el-input v-model="input_serch" icon="search" placeholder="群ID、名称、描述"></el-input>
            <el-button type="primary" v-on="serchUserForAdd()">查找</el-button>
          </div>
          <div class="friends_list">
            <el-table :data="groupList" height="340" border style="width: 100%">
              <el-table-column align="center" type="index" label="序号" width="70"></el-table-column>
              <el-table-column align="center" prop="id" label="群ID"></el-table-column>
              <el-table-column align="center" prop="name" label="群名称"></el-table-column>
              <el-table-column align="center" label="操作" width="80">
                <template scope="scope">
                  <el-button @click="" type="text" size="small">
                    添加
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import * as userTypes from '../../../types/user-info-types'
  // import FriendsApi from '../../../api/my-friends'
  export default {
    name: 'addFriends',
    data () {
      return {
        activeName: 'first',
        input_serch: '',
        userList: [{
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
        }],
        groupList: [{
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
    created: function () {
      console.log(this.userInfo)
    },
    computed: {
      ...mapGetters({
        userInfo: userTypes.GET_CURRENT_USER
      })
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
.serch_bar{
  text-align: left;
}
.el-input{
  width: 80%;
  margin-right: 10px;
}
.friends_list{
  padding-top: 10px;
}
</style>
