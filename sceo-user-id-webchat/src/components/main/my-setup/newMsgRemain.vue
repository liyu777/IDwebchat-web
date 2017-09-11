<template>
  <div id="newMsgRemain">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>新消息提醒</el-breadcrumb-item>
    </el-breadcrumb>
    <hr/>
    <div class="msglable">
      <strong class="msglable4">接收新消息通知</strong>
      <div class="msglable5">
        <el-switch v-model="listData.newMsgNotes" on-value="Y" off-value="N" on-color="#13ce66" off-color="#ff4949" v-on:change="saveForm()"></el-switch>
      </div>
    </div>
    <hr/>
    <div class="msglable">
      <strong class="msglable4">通知显示消息详情</strong>
      <div class="msglable5">
        <el-switch v-model="listData.newMsgNotesDetail" on-value="Y" off-value="N" on-color="#13ce66" off-color="#ff4949" v-on:change="saveForm()"></el-switch>
      </div>
    </div>
    <span class="msglable2">若关闭,当收到消息时,通知提示将不显示发信人和内容摘要</span>
    <hr/>
    <div class="msglable">
      <strong class="msglable4">声音</strong>
      <div class="msglable5">
        <el-switch v-model="listData.voice" on-value="Y" off-value="N" on-color="#13ce66" off-color="#ff4949" v-on:change="saveForm()"></el-switch>
      </div>
    </div>
    <hr/>
    <div class="msglable">
      <strong class="msglable4">新消息提示音</strong>
      <div class="msglable6">
        <el-select v-model="listData.newMsgVoiceType" slot="prepend" placeholder="请选择" style="width:100px" v-on:change="saveForm()">
          <el-option label="提示音1" value="1"></el-option>
          <el-option label="提示音2" value="2"></el-option>
          <el-option label="提示音3" value="3"></el-option>
          <el-option label="提示音4" value="4"></el-option>
        </el-select>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import * as userTypes from '../../../types/user-info-types'
  import setupApi from '../../../api/my-setup'
  export default {
    name: 'newMsgRemain',
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
          message: '新消息提示查询失败:' + error
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
            message: '新消息提示保存失败:' + error
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
  #newMsgRemain {
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
  .msglable2{
    color: #929AAC;
    line-height: 2
  }
  .msglable6{
    display: inline-block;
    position: absolute;
    right: 42%;
  }
</style>
