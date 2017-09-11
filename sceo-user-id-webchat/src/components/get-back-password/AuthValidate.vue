<template>
  <id-auth-validate v-if="validate.isDragValidate && validate.isAccountValidate"
    :userId="formData.userId"
    :captchaType="captchaType"
    :isPrev="true"
    @success="success"
    @prev="prev"
  ></id-auth-validate>
</template>
<script>
  import idAuthValidate from '../id-auth/IdAuthValidate'
  import {mapGetters} from 'vuex'
  import * as backPassTypes from '../../types/back-password-types'
  import * as commonTypes from '../../types/common-types'

  export default {
    beforeMount () {
      // 判断前置条件，不满足返回上一步
      if (!this.validate.isDragValidate || !this.validate.isAccountValidate) {
        this.$router.push({name: 'InputAccoutName'})
      }
    },
    components: {
      'id-auth-validate': idAuthValidate
    },
    computed: {
      ...mapGetters({
        formData: backPassTypes.GET_FORM_DATA,
        validate: backPassTypes.GET_VALIDATE
      }),
      captchaType () {
        return commonTypes.FUNCTION_TYPE_GET_BACK_PASSWORD
      }
    },
    mounted () {
      // 设置本页面步骤
      this.$store.commit(backPassTypes.SET_CURRENT_STEP, 2)
    },
    methods: {
      success () {
        // 验证成功，继续下一步
        this.$router.push({name: 'ResetPassword'})
      },
      prev () {
        // 跳至第一步
        this.$router.push({name: 'InputAccoutName'})
        // 重置数据
        this.$store.commit(backPassTypes.RESET_DATA)
      }
    }
  }
</script>
