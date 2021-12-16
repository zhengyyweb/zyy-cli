<template>
  <div id="app" class="app-main">
    <div v-if="isIndex" :class="classObj">
      <!-- 顶部导航 -->
      <div class="navbar-container">
        <NavBar @select="selectMenu" />
      </div>
      <!-- 左侧导航 -->
      <div class="sidebar-container">
        <SideBar :path-name="menuActiveName" />
      </div>
      <!-- 内容区域 -->
      <div class="main-container">
        <div class="parent-template">
          <keep-alive>
            <router-view />
          </keep-alive>
        </div>
      </div>
    </div>
    <router-view v-else>
      <router-view />
    </router-view>
  </div>
</template>

<script>
import NavBar from '@/components/topbar'
import SideBar from '@/components/sidebar'
export default {
  name: 'App',
  components: {
    NavBar,
    SideBar
  },
  data() {
    return {
      menuActiveName: 'home',
      isIndex: false
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mainWrap: true
      }
    }
  },
  watch: {
    $route(to, from) {
      console.log(to, from)
      if (to.path === '/login') {
        this.isIndex = false
      } else {
         this.isIndex = true
      }
      this.menuActiveName = to.path.split('/')[1]
    }
  },
  beforeMount() {
    this.menuActiveName = this.$route.path.split('/')[1]
  },
  methods: {
    selectMenu(name) {
      this.menuActiveName = name
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/resetBase.scss';

.main-container > .parent-template {
  height: calc(100% - 0px);
  padding: 15px 15px;
  background-color: #fafbff;

  > div {
    height: 100%;
    background-color: #ffffff;
    border: 1px solid rgba(198, 207, 220, 0.3);
    border-radius: 16px;
    box-shadow: 0px 2px 8px 0px rgba(186, 186, 186, 0.5);
  }
}
.sidebar-container {
  -webkit-transition: width 0.28s;
  transition: width 0.28s;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
.hideSidebar .navbar-container {
  width: calc(100% - 143px);
  margin-left: 143px;
}
.hideSidebar
  .sidebar-container
  ul[role='menubar']
  > div
  > li[role='menuitem']
  > div.el-submenu__title {
  display: block !important;
}
</style>
