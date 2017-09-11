<template>
  <div id="mainArea" v-if="loaded">
    <p class="title">密保问题验证</p>
    <span class="disc">请确认是您本人操作，并完成以下验证</span>
    <el-form v-for="(item, index) in questions" 
            :key="item.id" 
            :model="item" 
            :ref="'questions' + index"
            :rules="rules" label-width="90px">
      <p class="ques" :label="'问题' + (index + 1)">
        {{item.question}}
      </p>
      <el-form-item label="答案" prop="answer">
        <el-input class="input" placeholder="请输入答案" v-model="item.answer" :maxlength="50"></el-input>
      </el-form-item>
    </el-form>
    <div class="form-item">
      <el-button class="prev" @click="prev" v-if="isPrev">上一步</el-button>
      <el-button :class="isPrev? 'next' : 'input'" type="info" @click="next">下一步</el-button>
    </div>
    <div class="form-item">
      <span class="other" @click="other">其他验证方式</span>
    </div>
  </div>
</template>
<script>
  import authApi from '@/api/auth'

  export default {
    props: ['isPrev', 'userId'],
    mounted () {
      // 获取密保问题
      authApi.getQuestions({
        id: this.userId
      }).then(data => {
        this.questions = data
        this.loaded = true
      })
    },
    data () {
      return {
        loaded: false,
        questions: null,
        rules: {
          answer: {
            required: true,
            message: '答案不能为空'
          }
        }
      }
    },
    methods: {
      // 上一步
      prev () {
        // 触发父组件事件
        this.$emit('prev')
      },
      // 下一步
      next () {
        // 验证表单
        const that = this
        let PromiseArray = []
        for (let i = 0; i < this.questions.length; i++) {
          const promise = new Promise((index => {
            return (reslove, reject) => {
              that.$refs['questions' + index][0].validate(result => {
                if (result) {
                  reslove()
                }
              })
            }
          })(i))
          PromiseArray.push(promise)
        }
        Promise.all(PromiseArray).then(() => {
          // 验证问题答案
          authApi.validateQuestions({
            id: this.userId,
            list: this.questions
          }).then(() => {
            // 验证成功,跳转到下一步
            that.$emit('next')
          }).catch((error) => {
            this.$message({
              message: error.message,
              type: 'error'
            })
          })
        })
      },
      // 其他验证方式
      other () {
        this.$emit('other')
      }
    }
  }
</script>
<style scoped>
  #mainArea{
    width: 480px;
    margin: 80px auto;
  }
  #mainArea .title {
    font-size: 16px;
    font-weight: bold;
    margin-left: 90px;
    margin-bottom: 5px;
  }
  #mainArea .disc{
    margin-left: 90px
  }
  .ques {
    margin-left: 90px;
    font-weight: bold;
    margin-top: 30px;
  }
  .form-item{
    margin-left: 90px;
    margin-top: 30px;
  }
  .form{
    margin-top: 20px
  }
  .input{
    width: 280px
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
</style>
