<template>
  <div id="secoRegister">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>我的SCEO</el-breadcrumb-item>
      <el-breadcrumb-item>注册SCEO</el-breadcrumb-item>
    </el-breadcrumb>
    <hr/>
    <h3>注册企业/团队SCEO系统</h3>
    <el-row class="step">
      <el-col :span="8" class="step-item" :class="{'current':stepIndex===1}">
        <span class="step-index">1</span><span class="step-name">填写企业信息</span>
      </el-col>
      <el-col :span="8" class="step-item" :class="{'current':stepIndex===2}">
        <span class="step-index">2</span><span class="step-name">填写SCEO信息</span>
      </el-col>
      <el-col :span="8" class="step-item" :class="{'current':stepIndex===3}">
        <span class="step-index">3</span><span class="step-name">SCEO初始化</span>
      </el-col>
    </el-row>
    <div style="width: 600px; margin: 0 auto;">
      <el-form :model="formData" :rules="formRules" ref="formData" label-width="120px">
        <div v-show="stepIndex===1">
          <el-form-item label="企业全称：">
            <el-input v-model="formData.companyNameFull"></el-input>
          </el-form-item>
          <el-form-item label="企业简称：">
            <el-input v-model="formData.companyNameShort"></el-input>
          </el-form-item>
          <el-form-item label="组织机构代码：">
            <el-input v-model="formData.organizationCode"></el-input>
          </el-form-item>
          <el-form-item label="所在地：">
            <el-input v-model="formData.companyLocation"></el-input>
          </el-form-item>
          <el-form-item label="行业类型：">
            <el-select v-model="formData.industryType" value="">
              <el-option
                v-for="item in dicts['industryType']"
                :key="item.value"
                :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="网站：">
            <el-input v-model="formData.companyWebsite"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button @click="stepIndex=2" type="primary">下一步</el-button>
          </el-form-item>
        </div>
        <!--</el-form>-->
        <!--<el-form v-show="stepIndex===2" :model="formData" :rules="formRules" ref="formData" label-width="120px">-->
        <div v-show="stepIndex===2">
          <!--<el-form-item label="SCEO版本：">-->
          <!--<el-select v-model="formData.version" value="">-->
          <!--<el-option value="旗舰版">旗舰版</el-option>-->
          <!--<el-option value="企业版">企业版</el-option>-->
          <!--<el-option value="团队版">团队版</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <el-form-item label="财年起始日期：">
            <el-date-picker
              v-model="formData.financial"
              type="date"
              @change="financialChange"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="初始部门名称：">
            <el-input v-model="formData.initalDept"></el-input>
          </el-form-item>
          <el-form-item label="初始岗位名称：">
            <el-input v-model="formData.initalPost"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button @click="onSubmit" type="primary">下一步</el-button>
            <el-button @click="stepIndex=1">返回上一步</el-button>
          </el-form-item>
        </div>
      </el-form>
      <div v-show="stepIndex===3" style="text-align: center">
        <el-progress type="circle" :percentage="percentage"></el-progress>
        <h3>正在为您初始化SCEO系统，请稍后。。。</h3>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as dictTypes from '../../../types/dict-types'
  import axios from 'axios'
  import * as config from '../../../api/config'
  export default {
    name: 'secoRegister',
    computed: {
      ...mapGetters({
        dicts: dictTypes.GET_ALL_DICTS
      })
    },
    created () {
      this.$store.dispatch(dictTypes.GET_DICT_BY_CODES, ['industryType'])
    },
    data () {
      return {
        percentage: 10,
        stepIndex: 1,
        formData: {
          companyNameFull: '',
          companyNameShort: '',
          organizationCode: '',
          companyLocation: '',
          industryType: '',
          companyWebsite: '',
          financial: '',
          financialYearDate: '',
          initalDept: '',
          initalPost: ''
        },
        formRules: {}
      }
    },
    methods: {
      onSubmit () {
        this.$refs['formData'].validate(valid => {
          if (valid) {
            axios.post(config.ID_SYS_HOST + 'company', this.formData).then(rs => {
              this.stepIndex = 3
              this.percentageStep()
            }).catch(err => {
              this.$message.error(err.message)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      financialChange (val) {
        this.formData.financialYearDate = val
      },
      percentageStep () {
        if (this.percentage < 100) {
          setTimeout(() => {
            this.percentage += parseInt(Math.random() * 100)
            this.percentageStep()
          }, Math.random() * 10000)
        } else {
          this.$message.success('注册成功')
          this.stepIndex = 1
          this.$router.push({name: 'sceoList'})
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #secoRegister {
    padding: 30px;
  }

  hr {
    border: none;
    border-bottom: 1px solid #ccc;
  }

  .step {
    width: 700px;
    margin: 20px auto;
  }

  .step .step-item {
    height: 60px;
    line-height: 60px;
    white-space: nowrap;
    text-align: center;
    background: linear-gradient(135deg, transparent 20px, #F7F7F7 0) no-repeat bottom left, linear-gradient(45deg, transparent 20px, #F7F7F7 0) no-repeat top left, linear-gradient(-135deg, transparent 20px, #F7F7F7 0) no-repeat top right, linear-gradient(-45deg, transparent 20px, #F7F7F7 0) no-repeat bottom right;
    background-size: 51% 50%;
  }

  .step .step-item:first-child {
    background: linear-gradient(-135deg, transparent 20px, #F7F7F7 0) no-repeat top right, linear-gradient(-45deg, transparent 20px, #F7F7F7 0) no-repeat bottom right;
    background-size: 100% 50%;
  }

  .step .step-item:last-child {
    background: linear-gradient(135deg, transparent 20px, #F7F7F7 0) no-repeat bottom left, linear-gradient(45deg, transparent 20px, #F7F7F7 0) no-repeat top left;
    background-size: 100% 50%;
  }

  .step .step-item.current {
    color: #5485FE;
    background: linear-gradient(135deg, transparent 20px, #D5E6FD 0) no-repeat bottom left, linear-gradient(45deg, transparent 20px, #D5E6FD 0) no-repeat top left, linear-gradient(-135deg, transparent 20px, #D5E6FD 0) no-repeat top right, linear-gradient(-45deg, transparent 20px, #D5E6FD 0) no-repeat bottom right;
    background-size: 51% 50%;
  }

  .step .step-item.current:first-child {
    background: linear-gradient(-135deg, transparent 20px, #D5E6FD 0) no-repeat top right, linear-gradient(-45deg, transparent 20px, #D5E6FD 0) no-repeat bottom right;
    background-size: 100% 50%;
  }

  .step .step-item.current:last-child {
    background: linear-gradient(135deg, transparent 20px, #D5E6FD 0) no-repeat bottom left, linear-gradient(45deg, transparent 20px, #D5E6FD 0) no-repeat top left;
    background-size: 100% 50%;
  }

  .step .step-index {
    font-size: 20px;
    padding: 5px 11px;
    border-radius: 18px;
    background: #C1C7D2;
    color: #fff;
  }

  .step .step-item.current .step-index {
    background: #20A0FF;
  }

  .step .step-name {
    padding-left: 10px;
  }
</style>
