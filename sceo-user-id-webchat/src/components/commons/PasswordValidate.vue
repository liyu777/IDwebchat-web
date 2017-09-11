<template>
  <div class="password-validate">
    <el-row class="intensity">
      <el-col class="intensity-lable" :span="4">强度</el-col>
      <el-col :span="16">
        <div :class="complexity === 2 ? 'intensity-item bg-red' : complexity === 3 ? 'intensity-item bg-orange' : complexity === 4 ? 'intensity-item bg-green' : 'intensity-item bg'"></div>
        <div :class="complexity === 3 ? 'intensity-item bg-orange' : complexity === 4 ? 'intensity-item bg-green' : 'intensity-item bg'"></div>
        <div :class="complexity === 4 ? 'intensity-item bg-green' : 'intensity-item bg'"></div>
        <span :class="complexity === 2 ? 'intensity-result red' : complexity === 3 ? 'intensity-result orange' : complexity === 4 ? 'intensity-result green' : 'intensity-result'"
              v-text="complexity === 2 ? '弱' : complexity === 3 ? '中' : complexity === 4 ? '强' : ''">
        </span>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="prompt">
        <i :class="lengthValidate === 2 ? 'el-icon-circle-check icon green' : lengthValidate === 1 ? 'el-icon-circle-close icon red' : 'el-icon-warning icon orange'"></i>
        <span :class="lengthValidate === 2 ? 'green' : lengthValidate === 1 ? 'red' : ''">6~20个字符</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="prompt">
        <i :class="formatValidate === 2 ? 'el-icon-circle-check icon green' : formatValidate === 1 ? 'el-icon-circle-close icon red' : 'el-icon-warning icon orange'"></i>
        <span :class="formatValidate === 2 ? 'green' : formatValidate === 1 ? 'red' : ''">只能包含数字，字母和标点符号（除空格）</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col class="prompt">
        <i :class="complexityValidate === 2 ? 'el-icon-circle-check icon green' : complexityValidate === 1 ? 'el-icon-circle-close icon red' : 'el-icon-warning icon orange'"></i>
        <span :class="complexityValidate === 2 ? 'green' : complexityValidate === 1 ? 'red' : ''">字母，数字，标点符号至少包含两种</span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {validatePassword} from '../../utils/validate'

  export default {
    name: 'password-validate',
    props: ['password'],
    computed: {
    },
    data () {
      return {
        // 强度，默认无，可选项：weak(弱)，medium(中等)，storng(强)
        intensity: null,
        // 长度验证结果, 默认0(未验证)，可选项1(验证不通过)，2(验证通过)
        lengthValidate: 0,
        // 格式验证结果，默认0(未验证)，可选项1(验证不通过)，2(验证通过)
        formatValidate: 0,
        // 密码复杂度验证结果,默认0(未验证)，可选项1(验证不通过)，2(验证通过)
        complexityValidate: 0,
        // 密码复杂度分数，字母，数字，标点符号，每项记1分, 默认0分
        complexity: 0
      }
    },
    watch: {
      password: {
        handler (val, oldVal) {
          if (val) {
            // 验证密码
            let result = validatePassword(this.password)
            if (result.length.result) {
              // 长度验证通过
              this.lengthValidate = 2
            } else {
              // 长度验证不通过
              this.lengthValidate = 1
            }
            // 格式验证
            if (result.format.result) {
              // 格式验证通过
              this.formatValidate = 2
            } else {
              // 格式验证不通过
              this.formatValidate = 1
            }
            // 复杂度验证
            if (result.complexity.result) {
              // 验证通过
              this.complexityValidate = 2
              // 记录负责度
              this.complexity = result.complexity.count
            } else {
              // 验证不通过
              this.complexityValidate = 1
            }
          } else {
            // 密码未输入，不做验证，恢复初始状态
            this.intensity = null
            this.lengthValidate = 0
            this.formatValidate = 0
            this.complexityValidate = 0
            this.complexity = 0
          }
        },
        deep: true
      }
    }
  }
</script>
<style scoped>
  .red{
    color: red;
  }
  .bg{
    background: #ddd;
  }
  .bg-red{
    background: red;
  }
  .orange{
    color: orange;
  }
  .bg-orange{
    background: orange;
  }
  .green{
    color: #80C801;
  }
  .bg-green{
    background: #80C801;
  }
  .password-validate{
    width: 250px;
    height: 100px;
  }
  .intensity{
    height:30px;
    line-height: 30px;
  }
  .intensity-lable{
    text-align: center; 
  }
  .intensity-item{
    float: left;
    width: 40px;
    height: 16px;
    margin-left: 5px;
    margin-top: 7px;
  }
  .intensity-result{
    padding-left: 10px;
  }
  .icon{
    font-size: 12px;
  }
  .prompt{
    height:25px;
    line-height: 25px;
    margin-left: 10px
  }
</style>
