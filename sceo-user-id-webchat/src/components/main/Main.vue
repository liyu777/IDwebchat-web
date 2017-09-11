<template>
    <div v-if="loaded">
      <div class="nav">
        <div class="logo">
          <span class="logo-text">{{$t('home.logo')}}</span>
        </div>
        <div class="head">
          <img v-if="!!userInfo.path" :src="userInfo.path" class="head-image"/>
          <img v-else src="../../assets/images/main/default-avatar.jpg" class="head-image" />
          <div><i class="el-icon-arrow-down arrow"></i></div>
        </div>
        <div class="nav-top">
          <ul>
            <li :title="$t('home.nav.home')">
              <div id="home"></div>
            </li>
            <li :title="$t('home.nav.personal')">
              <div id="center"></div>
            </li>
            <li :title="$t('home.nav.message')">
              <div id="message"></div>
            </li>
            <li :title="$t('home.nav.help')">
              <div id="help"></div>
            </li>
            <li :title="$t('home.nav.lang')">
              <el-popover
                ref="lang"
                placement="bottom"
                trigger="click"
                v-model="showLang">
                <div class="lang-item" @click="changeLang('zh-CN')">简体中文</div>
                <div class="lang-item" @click="changeLang('zh-TW')">繁體中文（台灣）</div>
                <div class="lang-item" @click="changeLang('en')">English</div>
              </el-popover>
              <div id="lan" v-popover:lang></div>
            </li>
            <li :title="$t('home.nav.themes')">
              <div id="theme"></div>
            </li>
            <li :title="$t('home.nav.exit')">
              <div id="exit" @click="logout"></div>
            </li>
          </ul>
        </div>
      </div>
      <div class="main-area">
        <div class="nav-left">
          <ul>
            <li v-for="item in allMenus" :class="[{'current': isCurrent(item.name)}]" @click="dispatch(item.name)">
              <div :class="[iconMap[item.name]]">{{$t('home.menu.' + item.name)}}</div>
            </li>
          </ul>
        </div>
        <div class="main-content">
          <router-view></router-view>
        </div>
      </div>
    </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import * as userTypes from '../../types/user-info-types'
  import * as menuTypes from '../../types/menu-types'
  import * as config from '../../api/config'
  import ElementLocale from 'element-ui/lib/locale'

  export default {
    name: 'main',
    mounted () {
      const dispatch = this.$store.dispatch
      // 首先获取用户信息
      dispatch(userTypes.GET_CURRENT_USER).then(() => {
        // 再获取菜单信息
        dispatch(menuTypes.RECIVE_MENUS).then(() => {
          this.loaded = true
        })
      })
    },
    computed: {
      ...mapGetters({
        allMenus: menuTypes.GET_ALL_MENUS,
        matchedMenus: menuTypes.GET_CURRENT_MENUS,
        userInfo: userTypes.GET_CURRENT_USER
      })
    },
    data () {
      return {
        loaded: false,
        showLang: false,
        iconMap: {
          home: 'icon-home-mini',
          mySubject: 'icon-my-subject',
          myAccount: 'icon-my-account',
          myJob: 'icon-my-job',
          mySCEO: 'icon-my-SCEO',
          setup: 'icon-setup',
          chatMain: 'icon-my-account'
        }
      }
    },
    methods: {
      dispatch (path) {
        this.$router.push({name: path})
      },
      isCurrent (name) {
        if (this.matchedMenus) {
          let result = false
          this.matchedMenus.forEach((item, i) => {
            if (item.name === name) {
              result = true
              return true
            }
          })
          return result
        }
        return false
      },
      logout () {
        this.$confirm(this.$t('home.confirm.message'), this.$t('home.confirm.title'), {
          confirmButtonText: this.$t('home.confirm.exit'),
          cancelButtonText: this.$t('home.confirm.cancel'),
          type: 'warning'
        }).then(() => {
          window.location.href = config.LOGOUT_HOST
        })
      },
      changeLang (lan) {
        // 切换国际化语言
        this.$i18n.locale = lan
        // 切换ElementUI国际化语言
        ElementLocale.i18n(key => this.$i18n.t(key))
        // 设置Title
        document.getElementsByTagName('title')[0].innerText = this.$i18n.t('title')
        // 隐藏选择框
        this.showLang = false
      }
    }
  }
</script>
<style scoped>
  .nav{
    height: 80px;
    line-height: 80px;
    background: #4C5366;
    width: 100%;
  }
  .logo{
    background: url(../../assets/images/main/logo.png) no-repeat 30px center;
    width: 180px;
    float: left;
  }
  .logo-text{
    height: 80px;
    line-height: 80px;
    font-size: 20px;
    user-select: none;
    cursor: default;
    color: #FFF;
    margin-left: 70px;
  }
  .head{
    width: 150px;
    float: left;
    background: #484F62;
    background: -webkit-gradient(linear, right 0, 0 0, from(#4C5366), to(#484F62));
    line-height: 60px;
    height: 80px;
  }
  .head-image{
    margin-left: 40px;
    height: 60px;
    width: 60px;
    border-radius: 30px;
    margin-top: 10px;
  }
  .head div{
    display: inline-block;
    float: right;
    line-height: 80px;
    margin-right: 20px;
  }
  .arrow{
    color: #FFF;
    margin-left: 10px;
    font-size: 10px;
    cursor: pointer;
  }
  .nav ul{
    text-align: right;
    height: 80px;
    width: 500px;
    margin: 0;
    padding: 0;
    float: right;
    user-select: none；
  }
  .nav li{
    list-style: none;
    float: left;
    cursor: pointer;
    height: 100%;
    width: 65px;
  }
  .nav li:hover{
    background-color: #383E4C;
  }
  .nav li div{
    height: 100%;
    width: 100%;
  }
  #home{
    background: url(../../assets/images/main/icon-home.png) no-repeat center;
  }
  #center{
    background: url(../../assets/images/main/icon-center.png) no-repeat center;
  }
  #message{
    background: url(../../assets/images/main/icon-message.png) no-repeat center;
  }
  #help{
    background: url(../../assets/images/main/icon-help.png) no-repeat center;
  }
  #lan{
    background: url(../../assets/images/main/icon-zh.png) no-repeat center;
  }
  #theme{
    background: url(../../assets/images/main/icon-theme.png) no-repeat center;
  }
  #exit{
    background: url(../../assets/images/main/icon-exit.png) no-repeat center;
  }
  .main-area{
    position: absolute;
    top: 80px;
    bottom: 0px;
    width: 100%;
    padding: 0px;
  }
  .nav-left{
    top: 0px;
    bottom: 0px;
    width: 180px;
    background: #484F62;
    position: absolute;
    z-index: 11;
  }
  .nav-left ul{
     user-select: none;
     width: 100%;
     padding: 0;
     margin: 0;
  }
  .nav-left li{
    list-style: none;
    cursor: pointer;
    width: 184px;
  }
  .nav-left li div{
    height: 45px;
    line-height: 45px;
    width: 115px;
    padding-left: 65px;
    color: #FFF;
  }
  .nav-left li:hover{
    background: url(../../assets/images/main/menu-hover.png) no-repeat;
  }
  .nav-left li.current{
    background: url(../../assets/images/main/menu-current-1.png) no-repeat left center,
                url(../../assets/images/main/menu-current-2.png) no-repeat right center;
  }
  .icon-home-mini{
    background: url(../../assets/images/main/icon-home-mini.png) no-repeat 35px center;
  }
  .icon-my-account{
    background: url(../../assets/images/main/icon-my-account.png) no-repeat 35px center;
  }
  .icon-my-subject{
    background: url(../../assets/images/main/icon-my-subject.png) no-repeat 35px center;
  }
  .icon-my-job{
    background: url(../../assets/images/main/icon-my-job.png) no-repeat 35px center;
  }
  .icon-my-SCEO{
    background: url(../../assets/images/main/icon-my-SCEO.png) no-repeat 35px center;
  }
  .icon-setup{
    background: url(../../assets/images/main/icon-setup.png) no-repeat 35px center;
  }
  .main-content{
    position: absolute;
    left: 180px;
    right: 0px;
    top: 0;
    bottom: 0;
  }
  .lang-item {
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    cursor: pointer;
    padding-left: 15px;
  }
  .lang-item:hover{
    background: #eee;
  }
</style>
