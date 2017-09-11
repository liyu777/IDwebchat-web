<template>
  <div>
    <div class="educate-top"><p>教育经历</p>
    <div class="deucate-mainTop" ></div>
     </div>
     <div class="educate-main">
     <el-form ref="educateForms" :data="educateForms" label-width="120px">
     <div v-for="(educateForm, index) in educateForms" :model="educateForm" class="educate-item">
     <el-row >
     <el-col :span="18">
     <el-form-item label="时间">
    <el-col :span="6">
      <el-date-picker type="date" :editable="false" placeholder="" v-model="educateForm.beginTime" 
      :clearable="false" style="width:95%;" 
      ></el-date-picker>
    </el-col>
    <el-col :span="6">
      <el-date-picker type="date" :editable="false" placeholder="" v-model="educateForm.endTime" 
      style="width:95%" 
      ></el-date-picker>
    </el-col>
    <el-col :span="12">
      <label>至今请留空</label>
    </el-col>
  </el-form-item>
  <el-form-item label="学校名称" prop="schoolName">
    <el-input v-model="educateForm.schoolName" style="width:300px;" :maxlength="128"></el-input>
  </el-form-item>
  <el-form-item label="专业">
    <el-input v-model="educateForm.major" style="width:300px;" :maxlength="128"></el-input>
  </el-form-item>
  <el-form-item label="学历">
    <el-select v-model="educateForm.education" placeholder="" style="width:300px;">
    <el-option v-for="item in optionsEducation" :key="item.value" :value="item.value" :label="item.label"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="详细说明">
    <el-input type="textarea" v-model="educateForm.remark" style="width:700px;" :maxlength="512"></el-input>
  </el-form-item>
   </el-col>
     <el-col :span="6">
     <i class="el-icon-delete"  @click="deleteEducate(educateForm,index)" style="cursor:pointer"></i>
     </el-col>
     </el-row>
     <div class="educate-bo"></div>
  </div>
  <div class="educate-bottom">
  <el-form-item>
    <el-button type="botton" @click="addEducate(educateForms)" >添加教育经历</el-button>
    <a>最多添加5条，建议由远至近添加</a>
  </el-form-item>
  <el-form-item>
     <el-button type="primary" @click="saveEducate(educateForms)" >保存</el-button>
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
   name: 'edu',
   data () {
     return {
       educateForms: [],
       optionsEducation: []
     }
   },
   methods: {
     addEducate (lists) {
       var vm = this
       if (lists.length === 5) {
         vm.$message({
           type: 'info',
           message: '最多只能添加五条经历!'
         })
       } else {
         vm.educateForms.push({
           beginTime: '',
           endTime: '',
           id: '',
           schoolName: '',
           education: '',
           remark: '',
           major: ''
         })
       }
     },
     saveEducate (lists) {
       console.log(lists)
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
         if (lists[i].schoolName === '' || lists[i].schoolName === null) {
           this.$message({
             type: 'info',
             message: '请填写学校名称!'
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
       console.log(lists)
       eduQueryApi.updateEducate({lists: lists}).then(data => {
         vm.$message({
           showClose: true,
           type: 'success',
           message: '保存成功'
         })
         vm.queryEducate()
       })
     },
     deleteEducate (list, index) {
       var vm = this
       if (list.id !== '') {
         vm.$confirm('是否确认继续?', '', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
         }).then(() => {
           eduQueryApi.deleteEducate({id: list.id}).then(data => {
             vm.$message({
               type: 'success',
               message: '删除成功!'
             })
             vm.queryEducate()
           })
         }).catch(() => {
           vm.$message({
             type: 'info',
             message: '已取消删除'
           })
         })
       } else {
         this.educateForms.splice(index, 1)
       }
     },
     queryEducate () {
       eduQueryApi.queryEducate({userId: this.userInfo.id}).then(data => {
         this.educateForms = data
         console.log(data)
       })
       eduQueryApi.queryCountry({code: 'education'}).then(data => {
         this.optionsEducation = data
       })
     }
   },
   computed: {
     ...mapGetters({
       userInfo: userTypes.GET_CURRENT_USER
     })
   },
   mounted: function () {
     this.queryEducate()
   }
}
</script>
<style type="text/css">
  .educate-top p {
    margin-top:32px;
    margin-left:29px;
    border-left: 2
    px solid #1F2D3D;
    padding-left: 5px;
  }
  .educate-main {
    margin-top: 40px;
    margin-left: 85px;
  }
  .educate-bottom {
    margin-top: 30px;
  }
  .educate-item:hover .el-icon-delete{
    display:block;
  }
  .educate-item {
    margin-top:30px;
  }
  .educate-item .el-icon-delete {
    display:none;
  }
  .deucate-mainTop {
    width:80%;
    height:1px;
    margin:0px 25px auto;
    padding:0px;
    background-color:#D5D5D5;
    overflow:hidden;
  }
  .educate-bo {
    width:80%;
    height:1px;
    margin:0px 25px auto;
    background-color:#D5D5D5;
    overflow:hidden;
  }
</style>
