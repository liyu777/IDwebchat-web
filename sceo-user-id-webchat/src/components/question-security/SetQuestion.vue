<template>
  <div id="mainArea">
    <p class="title">设置密保问题</p>
    <span class="disc">安全保护问题将作为重要的身份验证方式，请谨慎填写</span>
    <el-form :model="quesItem" :ref="'formData' + index" 
            :rules="rules" label-width="95px" class="form" 
            v-for="(quesItem, index) in formData" :key="quesItem.id">
      <el-form-item prop="ques" label="问题">
        <el-select class="input" v-model="quesItem.ques" @change="disableCurrent">
          <el-option
            v-for="item in dicts['SECURITY_QUESTION']"
            :key="item.value" 
            :label="item.label" 
            :value="item.value"
            :disabled="!!disableList[item.value]">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="ques_custom" v-if="quesItem.ques === '9999'">
        <el-input class="input" v-model="quesItem.ques_custom"  placeholder="请输入自定义问题"></el-input>
      </el-form-item>
      <el-form-item prop="answ"  label="答案">
        <el-input class="input" v-model="quesItem.answ" placeholder="请输入问题答案"></el-input>
      </el-form-item>
    </el-form>
    <div class="button-area">
      <el-button class="input-button" type="info" @click="next">完成</el-button>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import * as dictTypes from '../../types/dict-types'
  import * as userTypes from '../../types/user-info-types'
  import authApi from '../../api/auth'

  export default {
    mounted () {
      if (!this.userInfo) {
        this.$router.push({name: 'changeQuestion'})
      }
      // 获取数据字典
      this.$store.dispatch(dictTypes.GET_DICT_BY_CODES, ['SECURITY_QUESTION', 'SJHLX'])
      // 设置当前步骤
      this.$emit('setStep', 2)
    },
    computed: {
      ...mapGetters({
        dicts: dictTypes.GET_ALL_DICTS,
        userInfo: userTypes.GET_CURRENT_USER
      })
    },
    data () {
      return {
        formData: [{
          ques: null,
          ques_desc: null,
          ques_custom: null,
          answ: null
        }, {
          ques: null,
          ques_desc: null,
          ques_custom: null,
          answ: null
        }, {
          ques: null,
          ques_desc: null,
          ques_custom: null,
          answ: null
        }],
        rules: {
          ques: [{
            required: true,
            message: '请选择一个问题',
            trigger: 'change'
          }],
          ques_custom: [{
            required: true,
            message: '自定义问题不能为空'
          }],
          answ: [{
            required: true,
            message: '问题答案不能为空'
          }]
        },
        disableList: {}
      }
    },
    methods: {
      disableCurrent (value) {
        const that = this
        this.disableList = {}
        this.formData.forEach((item, index) => {
          if (item.ques && item.ques !== '9999') {
            this.disableList[item.ques] = true
            item.ques_desc = getQuesName(item.ques)
          } else {
            item.ques_desc = ''
          }
        })

        /**
         * 获取数据字典的值
         * @param  {[type]} key [description]
         * @return {[type]}     [description]
         */
        function getQuesName (key) {
          for (let index = 0; index < that.dicts['SECURITY_QUESTION'].length; index++) {
            const item = that.dicts['SECURITY_QUESTION'][index]
            if (item.value === key) {
              return item.label
            }
          }
          return ''
        }
      },
      // 下一步
      next () {
        const that = this
        let PromiseArray = []
        for (let i = 0; i < this.formData.length; i++) {
          const promise = new Promise((index => {
            return (reslove, reject) => {
              that.$refs['formData' + index][0].validate(result => {
                if (result) {
                  reslove()
                }
              })
            }
          })(i))
          PromiseArray.push(promise)
        }
        Promise.all(PromiseArray).then(() => {
          let list = []
          for (let index = 0; index < this.formData.length; index++) {
            const question = {
              id: this.formData[index].ques,
              question: this.formData[index].ques === '9999' ? this.formData[index].ques_custom : this.formData[index].ques_desc,
              answer: this.formData[index].answ
            }
            list.push(question)
          }
          // 提交保存
          authApi.saveQuestions({
            id: this.userInfo.id,
            list
          }).then(() => {
            this.$router.push({name: 'changeQuestionDone'})
          }).catch(error => {
            this.$message({
              message: error.message,
              type: 'error'
            })
          })
        })
      }
    }
  }
</script>
<style scoped>
  #mainArea{
    width: 700px;
    margin: 80px auto;
  }
  #mainArea .title {
    font-size: 16px;
    font-weight: bold;
    margin-left: 95px;
    margin-bottom: 5px;
  }
  #mainArea .disc{
    margin-left: 95px
  }
  .form{
    margin-top: 20px
  }
  .input{
    width: 500px
  }
  .input-pre{
    width: 80px;
  }
  .prev{
    width: 90px;
  }
  .next{
    width: 177px;
  }
  .other{
    float: right;
    margin-right: 105px;
    color: #5485FE;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
    cursor: pointer;
  }
  .button-area{
    text-align: center;
    width: 650px;
  }
  .input-button{
    width: 280px;
  }
</style>
