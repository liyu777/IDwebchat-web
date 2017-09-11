<template>
  <id-auth-validate v-if="loaded"
    :userId="userInfo.id"
    :isPrev="false"
    :captchaType="captchaType"
    @success="success"
  ></id-auth-validate>
</template>
<script>
  import idAuthValidate from '../id-auth/IdAuthValidate'
  import {mapGetters} from 'vuex'
  import * as userInfoTypes from '../../types/user-info-types'
  import * as commonTypes from '../../types/common-types'

  export default {
    mounted () {
      this.$emit('setStep', 1)
      // 判断当前是否获取到数据
      if (this.userInfo) {
        this.loaded = true
      } else {
        // 获取用户数据
        this.$store.dispatch(userInfoTypes.GET_CURRENT_USER).then(() => {
          this.loaded = true
        })
      }
    },
    components: {
      'id-auth-validate': idAuthValidate
    },
    computed: {
      ...mapGetters({
        userInfo: userInfoTypes.GET_CURRENT_USER
      })
    },
    data () {
      return {
        loaded: false,
        captchaType: commonTypes.FUNCTION_TYPE_CHANGE_PHONE_NUMBER
      }
    },
    methods: {
      success () {
        this.$emit('passAuthValidate')
        this.$router.push({name: 'setEmail'})
      }
    }
  }
</script>
<style scoped>
  
</style>
