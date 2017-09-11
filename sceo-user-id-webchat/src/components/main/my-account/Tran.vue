<template>
  <div>
    <div class="tran-top"><p>培训经历</p>
    <div class="tran-mainTop"></div>
     </div>
     <div class="tran-main">
     <el-form ref="tranForms" :data="tranForms" label-width="120px">
     <div v-for="(tranForm, index) in tranForms" :model="tranForm" style="margin-top:30px" class="tran-item">
     <el-row>
     <el-col :span="18">
     <el-form-item label="时间">
    <el-col :span="6">
      <el-date-picker type="date" placeholder="" v-model="tranForm.beginTime" 
      :clearable="false" style="width:95%;"></el-date-picker>
    </el-col>
    <el-col :span="6">
      <el-date-picker type="date" placeholder="" v-model="tranForm.endTime" style="width:95%;"></el-date-picker>
    </el-col>
    <el-col :span="12">
      <label>至今请留空</label>
    </el-col>
  </el-form-item>
  <el-form-item label="培训机构">
    <el-input v-model="tranForm.schoolName" style="width:300px;" :maxlength="128"></el-input>
  </el-form-item>
  <el-form-item label="培训课程">
    <el-input v-model="tranForm.trainDirection" style="width:300px;" :maxlength="32"></el-input>
  </el-form-item>
  <el-form-item label="所获证书">
    <el-input v-model="tranForm.certificateType" style="width:300px;" :maxlength="16"></el-input>
  </el-form-item>
  <el-form-item label="详细说明">
    <el-input type="textarea" v-model="tranForm.remark" style="width:700px;" :maxlength="512"></el-input>
  </el-form-item>
  </el-col>
     <el-col :span="6">
     <i class="el-icon-delete"  @click="deleteTran(tranForm,index)" style="cursor:pointer"></i>
     </el-col>
     </el-row>
  <div class="tran-bo"></div>
    </div>
    <div class="tran-bottom">
  <el-form-item>
    <el-button type="botton" @click="addTran(tranForms)" >添加培训经历</el-button>
    <a>最多添加5条，建议由远至近添加</a>
  </el-form-item>
  <el-form-item>
     <el-button type="primary" @click="saveTran(tranForms)" >保存</el-button>
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
       tranForms: []
     }
   },
   methods: {
     addTran (lists) {
       var vm = this
       if (lists.length === 5) {
         vm.$message({
           type: 'info',
           message: '最多只能添加五条经历!'
         })
       } else {
         vm.tranForms.push({
           beginTime: '',
           endTime: '',
           id: '',
           schoolName: '',
           trainDirection: '',
           certificateType: '',
           remark: ''
         })
       }
     },
     saveTran (lists) {
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
             message: '请填写培训机构!'
           })
           return
         }
         if (lists[i].trainDirection === '' || lists[i].trainDirection === null) {
           this.$message({
             type: 'info',
             message: '请填写培训课程!'
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
       eduQueryApi.updateTrain({lists: lists}).then(data => {
         vm.$message({
           showClose: true,
           type: 'success',
           message: '保存成功'
         })
         vm.queryTran()
       })
     },
     deleteTran (list, index) {
       var vm = this
       if (list.id !== '') {
         vm.$confirm('是否确认继续?', '', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
         }).then(() => {
           eduQueryApi.deleteTrain({id: list.id}).then(data => {
             vm.$message({
               type: 'success',
               message: '删除成功!'
             })
             vm.queryTran()
           })
         }).catch(() => {
           vm.$message({
             type: 'info',
             message: '已取消删除'
           })
         })
       } else {
         this.tranForms.splice(index, 1)
       }
     },
     queryTran () {
       eduQueryApi.queryTrain({userId: this.userInfo.id}).then(data => {
         this.tranForms = data
         console.log(data)
       })
     }
   },
   mounted: function () {
     this.queryTran()
   },
   computed: {
     ...mapGetters({
       userInfo: userTypes.GET_CURRENT_USER
     })
   }
}
</script>
<style type="text/css">
  .tran-top p {
    margin-top:32px;
    margin-left:29px;
    border-left: 2
    px solid #1F2D3D;
    padding-left: 5px;
  }
  .tran-main {
    margin-top: 40px;
    margin-left: 85px;
  }
  .tran-bottom {
    margin-top: 30px;
  }
  .tran-item:hover .el-icon-delete{
    display:block;
  }
  .tran-item .el-icon-delete {
    display:none;
  }
  .tran-bo {
    width:80%;
    height:1px;
    margin:0px 25px auto;
    background-color:#D5D5D5;
    overflow:hidden;
  }
  .tran-mainTop {
    width:80%;
    height:1px;
    margin:0px 25px auto;
    padding:0px;
    background-color:#D5D5D5;
    overflow:hidden;
  }
</style>
