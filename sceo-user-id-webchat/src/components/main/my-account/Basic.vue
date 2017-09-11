<template>
  <div class="basic">
    <div class="basic-top">
      <p>{{$t('myAccount.menu.basic')}}</p>
      <div class="basic-menuTop">{{$t('myAccount.tips.title')}}</div>
    </div>
    <div class="basic-main" v-show="loaded">
      <el-form ref="basicForm" :model="basicForm" :rules="rules" label-width="140px">
        <el-form-item :label="$t('myAccount.label.sceoNumber')" >
          <el-input v-model="userInfo.sceoNumber"  class="basic-input" disabled></el-input>
        </el-form-item>
        <el-form-item :label="$t('myAccount.label.nickName')" prop="nickName">
          <el-input v-model="basicForm.nickName" class="basic-input" :placeholder="$t('myAccount.placeholder.nickName')" :maxlength="16"></el-input>
        </el-form-item>
        <el-form-item :label="$t('myAccount.label.name')">
          <el-input v-model="basicForm.name" class="basic-input" disabled></el-input>
          <a href="" class="basic-up">{{$t('myAccount.link.certification')}}</a>
        </el-form-item>
        <el-form-item :label="$t('myAccount.label.certificateType')">
          <el-select v-model="basicForm.certificateType" placeholder="" disabled class="basic-select">
            <el-option v-for="(item, index) in dicts['ZJLX']" :key="item.id" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('myAccount.label.certificateNumber')">
          <el-input v-model="basicForm.certificateNumber" class="basic-input" disabled></el-input>
        </el-form-item>
        <el-form-item :label="$t('myAccount.label.mobileNumber')">
          <el-input v-model="userInfo.mobileNumber" class="basic-input" disabled></el-input>
          <router-link :to="{name: 'changePhoneNumber'}" class="basic-up">{{$t('myAccount.link.changeMobileNumber')}}</router-link>
        </el-form-item>
        <el-form-item :label="$t('myAccount.label.email')">
          <el-input v-model="userInfo.email" class="basic-input" disabled></el-input>
          <router-link :to="{name: 'changeEmail'}" class="basic-up">{{$t('myAccount.link.changeEmail')}}</router-link>
        </el-form-item>
        <el-form-item :label="$t('myAccount.label.sex')">
          <el-radio-group v-model="basicForm.sex">
            <el-radio :label="item.value" v-for="(item, index) in dicts['SEX']" :key="item.id">{{item.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('myAccount.label.country')">
          <el-select v-model="basicForm.country"  class="basic-select" disabled >
            <el-option v-for="item in dicts['GJDQ']" :key="item.id" :label="item.label" :value="item.value" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('myAccount.label.livePlace')">
          <el-select v-model="basicForm.livePlace" placeholder="省"  @change="onSelected()"  class="basic-select">
            <el-option v-for="item in district" :key="item.id" :label="item.label" :value="item.value" ></el-option> 
          </el-select>
          <el-select v-model="basicForm.area" placeholder="市" class="basic-select">
            <el-option v-for="item in optionsArea" :key="item.id" :label="item.label" :value="item.value"></el-option> 
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('myAccount.label.msg')">
          <el-input type="textarea" v-model="basicForm.msg" class="basic-textarea" :maxlength="200"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(basicForm)" class="button">{{$t('myAccount.label.save')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import eduQueryApi from '../../../api/my-account'
  import {mapGetters} from 'vuex'
  import * as userTypes from '../../../types/user-info-types'
  import * as dictTypes from '../../../types/dict-types'
  export default{
    name: 'basic',
    data () {
      return {
        basicForm: {
          nickName: null,
          name: null,
          certificateType: null,
          certificateNumber: null,
          country: 'CN',
          livePlace: null,
          area: null,
          sex: null,
          msg: null
        },
        noClear: false,
        loaded: false,
        optionsArea: [],
        rules: {
          nickName: [{
            validator (rules, value, callback) {
              if (!!value && value.indexOf(' ') > 0) {
                callback('不能包含空格')
              } else {
                callback()
              }
            }
          }]
        }
      }
    },
    methods: {
      onSubmit () {
        // 验证
        this.$refs.basicForm.validate(result => {
          if (result) {
            var fromList = {}
            fromList.id = this.userInfo.id
            fromList.area = this.basicForm.area
            fromList.nickName = this.basicForm.nickName
            fromList.country = this.basicForm.country
            fromList.sex = this.basicForm.sex
            fromList.msg = this.basicForm.msg
            console.log(fromList)
            eduQueryApi.updateBasic({lists: fromList}).then(data => {
              this.$message.success('保存成功')
              eduQueryApi.queryBasic({userId: this.userInfo.id}).then(data => {
                this.setFormData(data)
              })
            })
          }
        })
      },
      onSelected () {
        if (!this.noClear) {
          this.basicForm.area = null
        } else {
          this.noClear = false
        }
        this.$store.dispatch(dictTypes.GET_CITYIS_BY_PROVINCE, {provinceId: this.basicForm.livePlace}).then(data => {
          this.optionsArea = data
        })
      },
      setFormData (basicInfo) {
        this.basicForm.nickName = basicInfo.nickName
        this.basicForm.name = basicInfo.sysUser.name
        this.basicForm.certificateType = basicInfo.sysUser.certificateType
        this.basicForm.certificateNumber = basicInfo.sysUser.certificateNumber
        this.basicForm.country = basicInfo.country
        this.basicForm.area = basicInfo.area
        this.basicForm.sex = basicInfo.sex
        this.basicForm.msg = basicInfo.personalizedSignature ? basicInfo.personalizedSignature.msg : null
        if (this.basicForm.area !== null) {
          this.$store.dispatch(dictTypes.GET_PROVINCE_BY_CITY, {cityId: this.basicForm.area}).then(data => {
            this.noClear = true // 更新字段，并不触发情况arae操作
            this.basicForm.livePlace = data.province.value
          })
        }
      }
    },
    computed: {
      ...mapGetters({
        userInfo: userTypes.GET_CURRENT_USER,
        dicts: dictTypes.GET_ALL_DICTS,
        district: dictTypes.GET_DISTRICT
      })
    },
    mounted () {
      const promiseDict = this.$store.dispatch(dictTypes.GET_DICT_BY_CODES, ['SEX', 'ZJLX', 'GJDQ'])
      const promiseDistrict = this.$store.dispatch(dictTypes.GET_PROVINCES)
      const promiseBasicInfo = eduQueryApi.queryBasic({userId: this.userInfo.id})
      Promise.all([promiseDict, promiseBasicInfo, promiseDistrict]).then((data) => {
        // 回显用户信息
        this.setFormData(data[1])
        this.loaded = true
      })
    }
  }
</script>
<style scoped>
  .basic{
    margin-left: 30px;
  }
  .basic-top p {
    font-weight: bold;
    border-left: solid 2px #666;
    padding-left: 10px;
    font-size: 16px;
    height: 16px;
    line-height: 18px;
  }
  .basic-menuTop {
    width: 95%;
    height: 33px;
    line-height: 33px;
    color: #9B9C9E;
    background-color: #F1F2F6;
    border: solid 1px #DCDCDE;
    padding-left: 10px;
  }
  .basic-main {
    margin-top: 40px;
  }
  .basic-up {
    margin-left:26px;
    color: #0066FF;
    text-decoration:underline;
  }
  .basic-input {
    width: 300px;
  }
  .basic-select{
    width: 150px;
  }
  .basic-textarea {
    width: 600px;
  }
  .button{
    width: 100px;
  }
</style>
