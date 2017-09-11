<template>
  <div class="content">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的职场</el-breadcrumb-item>
    </el-breadcrumb>
    <hr/>
    <div class="card-list">
      <el-card class="card-box" v-for="item in listData" :key="item.companyId"
               @click.native="goCockpit(item.companyId)">
        <div slot="header" class="clearfix">{{item.companyName}}</div>
        <div class="card-body">
          <p>部门：{{item.department}}</p>
          <p>岗位：{{item.position}}</p>
          <p>工号：{{item.sceoNumber}}</p>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import * as config from '../../../api/config'
  export default {
    components: {axios},
    name: 'myJobs',
    // created () {
    //   console.log(config)
    //   axios.get(config['ID_SYS_HOST'] + 'company/career').then(rs => {
    //     this.listData = rs
    //   })
    // },
    data () {
      return {
        listData: [{
          companyName: '航嘉股份',
          department: '嘉源锐信',
          position: '经理',
          sceoNumber: '12010051'
        }, {
          companyName: '航嘉股份2',
          department: '嘉源锐信2',
          position: '经理2',
          sceoNumber: '12010051'
        }]
      }
    },
    methods: {
      goCockpit (companyId) {
        window.open(config.COCKPID_HOST + 'index.html#/?id=' + companyId, 'cockpit')
      }
    }
  }
</script>
<style scoped>
  .content {
    box-sizing: border-box;
    padding: 30px;
    width: 100%;
    height: 100%;
  }

  hr {
    border: none;
    border-bottom: 1px solid #ccc;
  }

  .card-box {
    float: left;
    transition: all .5s;
    width: 230px;
    margin: 15px 15px;
  }

  .card-body {
    margin: -20px 0;
  }

  .card-box:hover {
    color: #fff;
    background-color: #677afd;
    cursor: pointer;
  }
</style>
