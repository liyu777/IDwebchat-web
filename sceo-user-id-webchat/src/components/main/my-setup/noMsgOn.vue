<template>
  <div id="noMsgOn">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>勿扰模式</el-breadcrumb-item>
    </el-breadcrumb>
    <hr/>
    <div class="msglable">
      <strong class="msglable4">勿扰模式</strong>
      <div class="msglable5">
        <el-switch v-model="listData.noDistrubModel" on-value="Y" off-value="N" on-color="#13ce66" off-color="#ff4949" v-on:change="saveForm()"></el-switch>
      </div>
    </div>
    <span class="msglable2">开启后,在设定时间段内收到消息时不会响铃</span>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import * as userTypes from '../../../types/user-info-types'
  import setupApi from '../../../api/my-setup'
  export default {
    name: 'noMsgOn',
    data () {
      return {
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
          message: '勿扰模式查询失败:' + error
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
            message: '勿扰模式保存失败:' + error
          })
        })
      }
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
  #noMsgOn {
    padding: 30px;
  }
  hr {
    border:1px #cccccc dotted;
    margin: 20px 40% 20px 0;
  }
  .msglable2{
    color: #929AAC;
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
