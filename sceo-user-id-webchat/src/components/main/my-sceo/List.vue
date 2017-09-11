<template>
  <div id="secoList">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的SCEO</el-breadcrumb-item>
      <el-breadcrumb-item>SCEO列表</el-breadcrumb-item>
    </el-breadcrumb>
    <hr/>
    <h4>您已注册 {{listData.length}} 个企业SCEO系统</h4>
    <el-card class="sceo-list-item" v-for="item in listData" :key="item.id">
      <el-form label-width="100px">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="tmp"><strong slot="label">企业全称：</strong>{{item.companyNameFull}}</el-form-item>
            <el-form-item label="tmp"><strong slot="label">所在地：</strong>{{item.companyNameShort}}</el-form-item>
            <el-form-item label="tmp"><strong slot="label">行业类型：</strong>{{item.industryType}}</el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="tmp"><strong slot="label">企业简称：</strong>{{item.companyNameFull}}</el-form-item>
            <el-form-item label="tmp"><strong slot="label">联系人：</strong>{{item.createBy}}</el-form-item>
            <el-form-item label="tmp"><strong slot="label">网址：</strong>{{item.companyWebsite}}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import axios from 'axios'
  import * as config from '../../../api/config'
  export default {
    name: 'sceoList',
    created () {
      axios.get(config.ID_SYS_HOST + 'company').then(data => {
        this.listData = data
      })
    },
    data () {
      return {
        listData: [{
          companyNameFull: '深圳驰源电器股份有限公司',
          companyNameShort: '深圳股份',
          companyLocation: '广东省深圳市',
          industryType: '电子制造',
          createBy: '罗文华',
          companyWebsite: '456456456456'
        }]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #secoList {
    padding: 30px;
  }

  hr {
    border: none;
    border-bottom: 1px solid #ccc;
  }

  .el-form-item {
    margin-bottom: 0;
  }
  .sceo-list-item{
    margin-bottom: 15px;
  }
</style>
