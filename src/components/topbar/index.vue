<template>
  <div class="clearfix">
    <div class="top-left">
      <i class="el-icon-s-fold colls" @click="openSider" />
      <!-- <i class="el-icon-refresh colls" /> -->
      <Breadcrumb />
    </div>

    <div class="right-menu">
      <div class="avatar-wrapper">
        <el-avatar :size="35" :src="circleUrl" />
      </div>
      <i class="el-icon-switch-button close" @click="logout" />
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import Breadcrumb from '@/components/Breadcrumb'
import { removeToken } from '@/utils/cookie'

export default {
  components: {
    Breadcrumb
  },
  data() {
    return {
      activeMenu: '',
      isOpen: true,
      circleUrl:
        'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar']),
    variables() {
      return variables
    },
    routes() {
      return this.$router.options.routes
    }
  },
  watch: {
    $route(to, from) {
      this.activeMenu = to.path.split('/')[1]
    }
  },
  beforeMount() {
    this.activeMenu = this.$route.path.split('/')[1]
  },
  methods: {
    openSider() {
      this.$store.commit('app/TOGGLE_SIDEBAR', { open: !this.isOpen })
    },
    handleSelect(key, keyPath) {
      this.$emit('select', keyPath[0])
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      removeToken()
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>
<style lang="scss">
.hamburger-container {
  * {
    box-sizing: border-box;
  }
  line-height: 50px;
  height: 100%;
  float: left;
  cursor: pointer;
  transition: background 0.3s;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}
.top-left {
  display: flex;
  width: 100%;
  align-items: center;
  .colls {
    font-size: 25px;
    margin-left: 15px;
    margin-right: 15px;
  }
}
.clearfix {
  display: flex;
  justify-content: space-between;
}
.breadcrumb-container {
  float: left;
}
.right-menu {
  float: right;
  line-height: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  .close {
    margin-right: 30px;
    font-size: 25px;
    color: #1f263e;
    cursor: pointer;
  }
  .avatar-wrapper {
    display: flex;
    align-items: center;
    margin-right: 30px;
    justify-content: center;
    .name {
      margin-left: 20px;
      font-size: 20px;
      color: #1f263e;
    }
  }
  &:focus {
    outline: none;
  }

  .right-menu-item {
    display: inline-block;
    padding: 0 8px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;

    &.hover-effect {
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: rgba(0, 0, 0, 0.025);
      }
    }
  }

  .avatar-container {
    margin-right: 30px;

    .avatar-wrapper {
      position: relative;
      .user-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }

      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 20px;
        font-size: 12px;
      }
    }
  }
}
</style>
