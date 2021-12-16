<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
// import { match } from 'minimatch'

export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // const matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      //  && item.meta.breadcrumb !== false

      this.levelList = this.$route.matched.filter(item => item.meta && item.meta.title)
      console.log(this.levelList)
    },

    pathCompile(path) {
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      const { redirect, path } = item
      console.log(item)
      if (redirect) {
        this.$router.push(redirect)
        return
      }

      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: flex;
  font-size: 14px;
  line-height: 50px;
  float:none;
  padding-left:10px;
  width:100%;
  background-color: #FAFBFF;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
