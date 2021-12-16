<!--
 * @Author: your name
 * @Date: 2020-05-27 16:35:17
 * @LastEditTime: 2020-05-27 18:38:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \smart_space_admin\src\layout\components\NavBar.vue
-->

<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :class="['el-menu-vertical-demo', isCollapse ? 'iconW' : '']"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
        @open="opens"
        @select="selectS"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.name + route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  name: 'SideBar',
  components: { SidebarItem, Logo },
  props: {
    pathName: {
      type: String,
      default: 'home'
    }
  },

  computed: {
    ...mapGetters(['sidebar', 'permission_routers']),
    routes() {
      return this.permission_routers
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }

      return path
    },
    showLogo() {
      return true
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    opens(a, b) {
      // this.$nextTick(() => {
      //   var dom = document.querySelector('.is-opened .el-submenu__title')
      //   if (dom) {
      //     dom.classList.add('is-activeTip')
      //   }

      //   // border-radius: 8px;
      //   this.$router.push({
      //     path: `${a}/home`
      //   })
      //   // background-image: linear-gradient(to right, #07C4FF , #0366FB) !important;
      //   console.log(a, b, dom)
      // })
    },
    selectS(a, b) {
      // console.log(a, b)
      // var dom = document.querySelector('.is-opened .el-submenu__title')
      // if (dom) {
      //   dom.classList.remove('is-activeTip')
      // }
    }
  }
}
</script>
<style lang="scss">
.el-menu-item {
  // padding-left: 45px !important;
}
.iconW i {
  width: 100% !important;
}
</style>
