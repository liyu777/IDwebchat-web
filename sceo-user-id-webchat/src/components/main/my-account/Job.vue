<template>
  <div>
    <div class="tran-top"><p>工作经历</p>
    <div class="job-mainTop"></div>
     </div>
     <div class="job-main">
     <el-form ref="jobForms" :data="jobForms" label-width="120px">
     <div v-for="(jobForm, index) in jobForms" :model="jobForm" style="margin-top:30px" class="job-item">
     <el-row>
     <el-col :span="18">
     <el-form-item label="时间">
    <el-col :span="6">
      <el-date-picker type="date" :editable="false" placeholder="" v-model="jobForm.beginTime" 
      :clearable="false" style="width:95%;"></el-date-picker>
    </el-col>
    <el-col :span="6">
      <el-date-picker type="date" :editable="false" placeholder="" v-model="jobForm.endTime" 
      style="width:95%;"></el-date-picker>
    </el-col>
    <el-col :span="12">
      <label>至今请留空</label>
    </el-col>
  </el-form-item>
  <el-form-item label="公司名称">
    <el-input v-model="jobForm.companyName" style="width:300px;"></el-input>
  </el-form-item>
  <el-form-item label="所属行业">
    <el-select v-model="jobForm.industryType" placeholder="" style="width:300px;">
    <el-option v-for="item in optionsIndustryType" :key="item.value" :value="item.value" :label="item.label"></el-option>
    </el-select>
    </el-form-item>
  <el-form-item label="职位">
    <el-input v-model="jobForm.workPosition" style="width:300px;" :maxlength="128"></el-input>
  </el-form-item>
  <el-form-item label="工作描述">
    <el-input type="textarea" v-model="jobForm.remark" style="width:700px;" :maxlength="512"></el-input>
  </el-form-item>
  </el-col>
     <el-col :span="6">
     <i class="el-icon-delete"  @click="deleteJob(jobForm, index)" style="cursor:pointer"></i>
     </el-col>
     </el-row>
     <div class="job-bo"></div>
  </div>
  <div class="job-bottom">
  <el-form-item>
    <el-button type="botton" @click="addJob(jobForms)" >添加工作经历</el-button>
    <a>最多添加5条，建议由远至近添加</a>
  </el-form-item>
  <el-form-item>
     <el-button type="primary" @click="saveJob(jobForms)" >保存</el-button>
  </el-form-item>
  </div>
     </el-form>
  </div>
  </div>
</template>
<script>
 import eduQueryApi from '../../../api/my-account'
 import {mapGetters} from 'vuex'
 import * as userTypes from '../../../types/user-info-types'
 export default{
   name: 'basic',
   data () {
     return {
       jobForms: [],
       optionsIndustryType: []
     }
   },
   methods: {
     addJob (lists) {
       var vm = this
       if (lists.length === 5) {
         vm.$message({
           type: 'info',
           message: '最多只能添加五条经历!'
         })
       } else {
         vm.jobForms.push({
           beginTime: '',
           endTime: '',
           id: '',
           companyName: '',
           industryType: '',
           workPosition: '',
           remark: ''
         })
       }
     },
     saveJob (lists) {
       for (var i = 0; i < lists.length; i++) {
         lists[i].userId = this.userInfo.id
         if (lists[i].beginTime !== '' && lists[i].beginTime !== null) {
           if (lists[i].beginTime > new Date()) {
             this.$message({
               type: 'info',
               message: '开始时间不能大于当前时间!'
             })
             return
           }
         }
         if (lists[i].companyName === '' || lists[i].companyName === null) {
           this.$message({
             type: 'info',
             message: '请填写公司名称!'
           })
           return
         }
         if (lists[i].workPosition === '' || lists[i].workPosition === null) {
           this.$message({
             type: 'info',
             message: '请填写职位!'
           })
           return
         }
         if (lists[i].beginTime === '' || lists[i].beginTime === null) {
           this.$message({
             type: 'info',
             message: '请填写开始时间!'
           })
           return
         }
         if (lists[i].endTime !== '' && lists[i].endTime !== null) {
           if (Date.parse(lists[i].beginTime) > Date.parse(lists[i].endTime) || lists[i].beginTime > lists[i].endTime ||
           Date.parse(lists[i].beginTime) >= lists[i].endTime || lists[i].beginTime >= Date.parse(lists[i].endTime)) {
             this.$message({
               type: 'info',
               message: '开始时间不能大于或者等于结束时间!'
             })
             return
           }
         }
       }
       var vm = this
       eduQueryApi.updateJob({lists: lists}).then(data => {
         vm.$message({
           showClose: true,
           type: 'success',
           message: '保存成功'
         })
         vm.queryJob()
       })
     },
     deleteJob (list, index) {
       var vm = this
       if (list.id !== '') {
         vm.$confirm('是否确认继续?', '', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
         }).then(() => {
           eduQueryApi.deleteJob({id: list.id}).then(data => {
             vm.$message({
               type: 'success',
               message: '删除成功!'
             })
             vm.queryJob()
           })
         }).catch(() => {
           vm.$message({
             type: 'info',
             message: '已取消删除'
           })
         })
       } else {
         this.jobForms.splice(index, 1)
       }
     },
     queryJob () {
       eduQueryApi.queryJob({userId: this.userInfo.id}).then(data => {
         this.jobForms = data
         console.log(data)
       })
       eduQueryApi.queryCountry({code: 'industryType'}).then(data => {
         this.optionsIndustryType = data
       })
     }
   },
   computed: {
     ...mapGetters({
       userInfo: userTypes.GET_CURRENT_USER
     })
   },
   mounted: function () {
     this.queryJob()
   }
 }
</script>
<style type="text/css">
  .job-top p {
    margin-top:32px;
    margin-left:29px;
    border-left: 2
    px solid #1F2D3D;
    padding-left: 5px;
  }
  .job-main {
    margin-top: 40px;
    margin-left: 85px;
  }
  .job-bottom {
    margin-top: 30px;
  }
  .job-item:hover .el-icon-delete{
    display:block;
  }
  .job-item .el-icon-delete {
    display:none;
  }
  .job-mainTop {
    width:80%;
    height:1px;
    margin:0px 25px auto;
    padding:0px;
    background-color:#D5D5D5;
    overflow:hidden;
  }
  .job-bo {
    width:80%;
    height:1px;
    margin:0px 25px auto;
    background-color:#D5D5D5;
    overflow:hidden;
  }
</style>
