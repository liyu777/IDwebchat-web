<template>
  <div id="privateShow">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统设置</el-breadcrumb-item>
      <el-breadcrumb-item>隐私</el-breadcrumb-item>
    </el-breadcrumb>
    <hr/>
    <div class="msglable">
      <strong>加我为朋友时需要验证</strong>
      <div class="msglable5">
        <el-switch v-model="listData.addMeNeedValid" on-value="Y" off-value="N" on-color="#13ce66" off-color="#ff4949" v-on:change="saveForm()"></el-switch>
      </div>
    </div>
    <hr/>
    <div class="msglable" style="width:60%">
      <el-collapse>
        <el-collapse-item title="添加我的方式" name="1">
          <span class="msglable2">可通过以下方式搜索到我</span>
          <div class="msglable3">
            <strong class="msglable4">手机号</strong>
            <div class="msglable5">
              <el-switch v-model="listData.searchMeByMobile" on-value="Y" off-value="N" on-color="#13ce66" off-color="#ff4949" v-on:change="saveForm()"></el-switch>
            </div>
          </div>
          <hr/>
          <div class="msglable3">
            <strong class="msglable4">电子邮箱</strong>
            <div class="msglable5">
              <el-switch v-model="listData.searchMeByEmail" on-value="Y" off-value="N" on-color="#13ce66" off-color="#ff4949" v-on:change="saveForm()"></el-switch>
            </div>
          </div>
          <hr/>
          <div class="msglable3">
            <strong class="msglable4">锐信号</strong>
            <div class="msglable5">
              <el-switch v-model="listData.searchMeBySceo" on-value="Y" off-value="N" on-color="#13ce66" off-color="#ff4949" v-on:change="saveForm()"></el-switch>
            </div>
          </div>
          <span class="msglable2">可通过以下方式添加我为好友</span>
          <div class="msglable3">
            <strong class="msglable4">群聊</strong>
            <div class="msglable5">
              <el-switch v-model="listData.addMeFromGroup" on-value="Y" off-value="N" on-color="#13ce66" off-color="#ff4949" v-on:change="saveForm()"></el-switch>
            </div>
          </div>
          <hr/>
          <div class="msglable3">
            <strong class="msglable4">二维码</strong>
            <div class="msglable5">
              <el-switch v-model="listData.addMeFromEwm" on-value="Y" off-value="N" on-color="#13ce66" off-color="#ff4949" v-on:change="saveForm()"></el-switch>
            </div>
          </div>
          <hr/>
          <div class="msglable3">
            <strong class="msglable4">名片</strong>
            <div class="msglable5">
              <el-switch v-model="listData.addMeFromMp" on-value="Y" off-value="N" on-color="#13ce66" off-color="#ff4949" v-on:change="saveForm()"></el-switch>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <hr/>
    <div class="msglable">
      <strong>通讯录黑名单</strong>
      <div class="msglable5">
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import * as userTypes from '../../../types/user-info-types'
  import setupApi from '../../../api/my-setup'
  export default {
    name: 'privateShow',
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
          message: '隐私查询失败:' + error
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
            message: '隐私保存失败:' + error
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
  #privateShow {
    padding: 30px;
  }
  hr {
    border:1px #cccccc dotted;
    margin: 20px 40% 20px 0;
  }
  .msglable hr{
    border:1px #cccccc dotted;
    margin: 15px 0 15px 0;
  }
  .msglable2{
    color: #929AAC;
    margin: 20px 0 20px 0;
    line-height: 4;
  }
  .msglable4{
    display: inline-block;
  }
  .msglable5{
    display: inline-block;
    position: absolute;
    right: 45%;
  }
  /*#privateShow .el-collapse-item__wrap .el-collapse-item__content{
    padding: 10px 0 10px 60px;
  }*/
</style>
