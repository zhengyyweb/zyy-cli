import Vue from 'vue'

// 按钮权限
const hasRoot = Vue.directive('hasRoot', {
  inserted: function (el, binding) {
    const permissions = JSON.parse(localStorage.getItem('permissions')) // 指令列表
    if (hasd(binding.value, permissions)) {
      el.parentNode.removeChild(el) // 调用元素父级删除
    }
  }
})

function hasd(value, permissions) {
  let isExist = true
  if (
    permissions === undefined ||
    permissions === null ||
    permissions.length === 0
  ) {
    return true
  }
  for (let i = 0; i < permissions.length; i++) {
    if (permissions[i] === value) {
      isExist = false
      break
    }
  }
  return isExist
}

// 路由权限
// const Layout = () => import('@/layout') // 全局组件
const _import = require('@/router/_import_' + process.env.NODE_ENV)

/**
 * 初始化路由
 * @param router 路由文件，是一个数组
 */

export function initRouter(router) {
  for (let i = 0; i < router.length; i++) {
    const route = router[i]
    // 设置一级路由的控件为全局定义的默认控件
    // delete route['component']
    // route.component = Layout
    route.component = _import(route.component)
    // 设置子路由
    route.children && initChildrenRouter(route.children)
  }
  return router
}

/**
 * 初始化子路由
 * @param router 子路由数组
 */

export function initChildrenRouter(router) {
  for (let i = 0; i < router.length; i++) {
    const route = router[i]
    // 初始化子路由的控件
    route.component && (route.component = _import(route.component))
    route.children &&
      route.children.length &&
      initChildrenRouter(route.children)
  }
}
export { hasRoot }
