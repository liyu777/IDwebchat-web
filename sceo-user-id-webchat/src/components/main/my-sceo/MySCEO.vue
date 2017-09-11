<template>
  <div class="content">
    <div :span='3' class="left-nav">
      <el-menu :default-active="getActiveName" router="">
        <el-menu-item v-for="i in getSecondMenus" :key='i.name' :index="i.name">
          <span>{{i.text}}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div :span='21' class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import * as menuTypes from '../../../types/menu-types'

  export default {
    name: 'main',
    computed: {
      ...mapGetters({
        menus: menuTypes.GET_ALL_MENUS,
        matchedMenus: menuTypes.GET_CURRENT_MENUS
      }),
      getSecondMenus () {
        for (let i = 0; i < this.menus.length; i++) {
          if (this.menus[i].name === 'mySCEO') {
            return this.menus[i].children
          }
        }
      },
      getActiveName () {
        return this.matchedMenus[2].name
      }
    }
  }
</script>
<style scoped>
  .content{
    width: 100%;
    height: 100%;
  }
  .left-nav{
    height: 100%;
    width: 170px;
    background: #E4E8F1;
  }
  .main-content{
    position: absolute;
    left: 170px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    overflow: auto;
  }
</style>
