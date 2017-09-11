<template>
  <div id="chatSetup">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>聊天</el-breadcrumb-item>
    </el-breadcrumb>
    <hr/>
    <div class="msglable">
      <strong class="msglable4">回车键发送消息</strong>
      <div class="msglable5">
        <el-switch v-model="listData.sendByEnterKey" on-value="Y" off-value="N" on-color="#13ce66" off-color="#ff4949" v-on:change="saveForm()"></el-switch>
      </div>
    </div>
    <hr/>
    <div class="msglable">
      <strong class="msglable4">聊天背景</strong>
      <div class="msglable5">
        <el-button type="text" @click="dialogVisible = true">打开</el-button>
        <el-dialog title="聊天背景" v-model="dialogVisible" size="small">
          <Backphoto align='center' v-model="dialogVisible"></Backphoto>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import Backphoto from '@/components/main/my-setup/backphoto'
  import {mapGetters} from 'vuex'
  import * as userTypes from '../../../types/user-info-types'
  import setupApi from '../../../api/my-setup'
  export default {
    name: 'chatSetup',
    data () {
      return {
        dialogVisible: false,
        listData: {
          userId: '',
          newMsgNotes: 'Y',
          newMsgNotesDetail: 'Y',
          voice: 'Y',
          noDistrubModel: 'Y',
          sendByEnterKey: 'Y',
          addMeNeedValid: 'Y',
          newMsgVoiceType: '1',
          searchMeByMobile: 'Y',
          searchMeBySceo: 'Y',
          searchMeByEmail: 'Y',
          addMeFromGroup: 'Y',
          addMeFromEwm: 'Y',
          addMeFromMp: 'Y'
        }
      }
    },
    created: function () {
      var _this = this
      this.listData.userId = this.userInfo.id
      setupApi.querySetup(this.userInfo.id).then(data => {
        if (data) {
          _this.listData = data
        }
      }).catch((error) => {
        _this.$message({
          type: 'error',
          showClose: true,
          message: '聊天查询失败:' + error
        })
      })
    },
    methods: {
      saveForm: function () {
        var _this = this
        setupApi.saveSetup(this.listData).catch((error) => {
          _this.$message({
            type: 'error',
            showClose: true,
            message: '聊天保存失败:' + error
          })
        })
      }
    },
    components: {
      Backphoto
    },
    computed: {
      ...mapGetters({
        userInfo: userTypes.GET_CURRENT_USER
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #chatSetup {
    padding: 30px;
  }
  hr {
    border:1px #cccccc dotted;
    margin: 20px 40% 20px 0;
  }
  .msglable4{
    display: inline-block;
  }
  .msglable5{
    display: inline-block;
    position: absolute;
    right: 45%;
  }
</style>
