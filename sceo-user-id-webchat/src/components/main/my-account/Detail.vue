<template>
<div>
    <div class="basic-top"><p>详细资料</p>
    <div class="detail-mainTop"></div>
     </div>
    <div class="basic-main">
    <el-form ref="form" :model="form" label-width="120px" :rules="rules2">
    <el-form-item label="出生日期" prop="birthday">  
      <el-date-picker type="date" placeholder="" v-model="form.birthday" class="detail-input" :editable="false"></el-date-picker>
      <label><input type="checkbox" class="detail-up" v-model="form.birthdaySecrecyFlag" />保密</label> 
  </el-form-item>
  <el-form-item label="民族">
    <el-select v-model="form.nation" placeholder="" >
    <el-option v-for="item in optionsNation" :key="item.value" :value="item.value" :label="item.label"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="身高(cm)" prop="hight">
    <el-input v-model="form.hight" class="detail-input" type="number" 
    onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))"></el-input>
    <label><input type="checkbox" class="detail-up" v-model="form.hightSecrecyFlag" />保密</label>
  </el-form-item>
  <el-form-item label="体重(kg)" prop="weight">
    <el-input v-model="form.weight" class="detail-input" type="number"
    onKeypress="return (/[\d\.]/.test(String.fromCharCode(event.keyCode)))"></el-input>
    <label><input type="checkbox" class="detail-up"  v-model="form.weightSecrecyFalg" />保密</label>
  </el-form-item>
  <el-form-item label="政治面貌" prop="politicalOutlook">
    <el-input v-model="form.politicalOutlook" class="detail-input" :maxlength="16"></el-input>
  </el-form-item>
  <el-form-item label="紧急电话" prop="emergencyTelephone">
    <el-input v-model="form.emergencyTelephone" class="detail-input"></el-input>
  </el-form-item>
  <el-form-item label="籍贯">
    <el-col :span="4">
    <el-select v-model="oldPro" placeholder="" @change="areaChange($event)">
    <el-option v-for="item in optionsOldPro" :key="item.id" :value="item.value" :label="item.label"></el-option>
    </el-select>
    </el-col>
    <el-col :span="4">
      <el-select v-model="form.placeOfOrigin" placeholder="">
     <el-option v-for="item in optionsPlaceOfOrigin" :key="item.id" :label="item.label" :value="item.value"></el-option> 
    </el-select>
    </el-col>
  </el-form-item>
   <el-form-item label="现住址">
    <el-col :span="4" >
     <el-select v-model="nowPro" @change="shiChange($event)">
       <el-option v-for="item in optionsNowPro" :key="item.id" :label="item.label" :value="item.value"></el-option> 
    </el-select>
    </el-col>
    <el-col :span="4">
     <el-select v-model="nowshi" @change="liveChange($event)">
       <el-option v-for="item in optionsNowshi" :key="item.id" :label="item.label" :value="item.value"></el-option> 
    </el-select>
    </el-col>
    <el-col :span="4">
     <el-select v-model="form.liveAddressUnit" placeholder="">
       <el-option v-for="item in optionsliveAddressUnit" :key="item.id" :label="item.label" :value="item.value"></el-option> 
    </el-select>
    </el-col>
  </el-form-item>
  <el-form-item label="街道地址" prop="liveAddressDetail">
    <el-input v-model="form.liveAddressDetail" style="width:500px;" :maxlength="128"></el-input>
    <label><input type="checkbox" class="detail-up"  v-model="form.liveAddressDetalSecrecyFlag"/>保密</label>
  </el-form-item>
  <el-form-item label="QQ" prop="qq">
    <el-input v-model="form.qq" class="detail-input"></el-input>
  </el-form-item>
  <el-form-item label="个人博客" prop="blogAddress">
    <el-input v-model="form.blogAddress" class="detail-input" :maxlength="64"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit(form)" >保存</el-button>
  </el-form-item>
</el-form>
  </div>
</div>
</template>
<script>
import eduQueryApi from '../../../api/my-account'
import {mapGetters} from 'vuex'
import * as userTypes from '../../../types/user-info-types'
export default{
  name: 'detail',
  data () {
    var vrht = '^[0-9]*[1-9][0-9]*$'
    var ht = new RegExp(vrht)
    var vrwt = '^[1-9].d*([.][1-9])?$'
    var wt = new RegExp(vrwt)
    var vrqq = '[1-9][0-9]{4,9}'
    var QQ = new RegExp(vrqq)
    var checkHight = (rule, value, callback) => {
      if (value !== '' && value !== null) {
        if (!ht.test(value)) {
          callback(new Error('身高格式不正确'))
        } else {
          if (value.length > 3) {
            callback(new Error('身高格式不正确'))
          } else {
            callback()
          }
        }
      } else {
        callback()
      }
    }
    var checkWeight = (rule, value, callback) => {
      if (value !== '' && value !== null) {
        if (!wt.test(value) && (!ht.test(value) || value.length > 3)) {
          callback(new Error('体重格式不正确'))
        } else {
          callback()
        }
        callback()
      } else {
        callback()
      }
    }
    var checkQQ = (rule, value, callback) => {
      if (value !== '' && value !== null) {
        if (!QQ.test(value)) {
          callback(new Error('QQ号格式不正确'))
        } else {
          if (value.length > 11) {
            callback(new Error('QQ号格式不正确'))
          } else {
            callback()
          }
        }
      } else {
        callback()
      }
    }
    var checkEmergencyTelephone = (rule, value, callback) => {
      if (value !== '' && value !== null) {
        if (!(/^1[34578]\d{9}$/.test(value))) {
          callback(new Error('紧急号码格式有误'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    var checkBirthday = (rule, value, callback) => {
      if (value !== '') {
        if (value > new Date()) {
          callback(new Error('出生日期不能大于当前日期'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      form: {
        birthday: '',
        nation: '',
        placeOfOrigin: '',
        area: '',
        hight: '',
        liveAddressUnit: '',
        liveAddressDetail: '',
        qq: '',
        emergencyTelephone: '',
        politicalOutlook: '',
        blogAddress: ''
      },
      nowshi: '',
      nowPro: '',
      oldPro: '',
      optionsOldPro: [],
      optionsliveAddressUnit: [],
      optionsPlaceOfOrigin: [],
      optionsNowshi: [],
      optionsNowPro: [],
      optionsNation: [],
      rules2: {
        hight: [
          {validator: checkHight, trigger: 'blur'}
        ],
        weight: [
          {validator: checkWeight, trigger: 'blur'}
        ],
        qq: [
          {validator: checkQQ, trigger: 'blur'}
        ],
        emergencyTelephone: [
          {validator: checkEmergencyTelephone, trigger: 'blur'}
        ],
        birthday: [
          {validator: checkBirthday, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    onSubmit (form) {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          var vm = this
          if (form.birthdaySecrecyFlag === true) {
            form.birthdaySecrecyFlag = 'Y'
          } else {
            form.birthdaySecrecyFlag = 'N'
          }
          if (form.hightSecrecyFlag === false) {
            form.hightSecrecyFlag = 'N'
          } else {
            form.hightSecrecyFlag = 'Y'
          }
          if (form.weightSecrecyFalg === false) {
            form.weightSecrecyFalg = 'N'
          } else {
            form.weightSecrecyFalg = 'Y'
          }
          if (form.liveAddressDetalSecrecyFlag === false) {
            form.liveAddressDetalSecrecyFlag = 'N'
          } else {
            form.liveAddressDetalSecrecyFlag = 'Y'
          }
          console.log(form)
          eduQueryApi.updateDetail({lists: form}).then(data => {
            vm.$message({
              showClose: true,
              type: 'success',
              message: '保存成功'
            })
            vm.queryDetail()
          })
        } else {
          return false
        }
      })
    },
    queryDetail: function () {
      eduQueryApi.queryBasic({userId: this.userInfo.id}).then(data1 => {
        this.form = data1
        console.log(data1)
        if (data1.hight === 0) {
          this.form.hight = ''
        }
        if (data1.weight === 0) {
          this.form.weight = ''
        }
        if (data1.birthdaySecrecyFlag === 'N') {
          this.form.birthdaySecrecyFlag = false
        } else {
          this.form.birthdaySecrecyFlag = true
        } if (data1.hightSecrecyFlag === 'N') {
          this.form.hightSecrecyFlag = false
        } else {
          this.form.hightSecrecyFlag = true
        } if (data1.weightSecrecyFalg === 'N') {
          this.form.weightSecrecyFalg = false
        } else {
          this.form.weightSecrecyFalg = true
        } if (data1.liveAddressDetalSecrecyFlag === 'N') {
          this.form.liveAddressDetalSecrecyFlag = false
        } else {
          this.form.liveAddressDetalSecrecyFlag = true
        }
        console.log(this.form)
        if (data1.liveAddressUnit !== null) {
          eduQueryApi.queryFath({id: data1.liveAddressUnit}).then(data3 => {
            console.log(data3)
            if (data3 !== null) {
              this.nowshi = data3.city.value
              this.nowPro = data3.province.value
            }
          })
        }
        if (data1.placeOfOrigin !== null) {
          eduQueryApi.queryFath({id: data1.placeOfOrigin}).then(data5 => {
            if (data5 !== null) {
              this.oldPro = data5.province.value
            }
          })
        }
        eduQueryApi.queryCountry({code: 'MZ'}).then(data => {
          this.optionsNation = data
        })
      })
    },
    queryPlaceOfOrigin: function () {
      eduQueryApi.queryCountry({code: 'XZQH_sheng'}).then(data => {
        this.optionsOldPro = data
        this.optionsNowPro = data
      })
    },
    areaChange: function (value) {
      eduQueryApi.queryPro({id: value}).then(data => {
        this.optionsPlaceOfOrigin = data
      })
    },
    liveAddressChange: function (value) {
      eduQueryApi.queryPro({id: value}).then(data => {
        this.optionsliveAddressUnit = data
      })
    },
    shiChange: function (value) {
      eduQueryApi.queryPro({id: value}).then(data => {
        this.optionsNowshi = data
      })
    },
    liveChange: function (value) {
      eduQueryApi.queryPro({id: value}).then(data => {
        this.optionsliveAddressUnit = data
      })
    }
  },
  computed: {
    ...mapGetters({
      userInfo: userTypes.GET_CURRENT_USER
    })
  },
  mounted: function () {
    this.queryDetail()
    this.queryPlaceOfOrigin()
  }
}
</script>
<style scoped>
  .basic-top p {
    margin-top:32px;
    margin-left:29px;
    border-left: 2
    px solid #1F2D3D;
    padding-left: 5px;
  }
  .basic-main {
    margin-top: 40px;
    margin-left: 85px;
  }
  input::-webkit-outer-spin-button,  
  input::-webkit-inner-spin-button {  
    -webkit-appearance: none;  
  }   
  input[type="number"] {  
    -moz-appearance: textfield;  
  }
  .detail-mainTop {
    width:95%;
    height:1px;
    margin:0px 25px auto;
    padding:0px;
    background-color:#D5D5D5;
    overflow:hidden;
  }
  .detail-up {
    vertical-align: -2px;
    _vertical-align: -1px;
    margin-right: 5px;
  }
  .detail-input {
    width: 300px;
  }
</style>
