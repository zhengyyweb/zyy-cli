import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 处理相同路由控制台报错 NavigationDuplicated
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) {
        return originalPush.call(this, location, onResolve, onReject)
    }
    return originalPush.call(this, location).catch(err => err)
}

// import Layout from '@/layout'

export const constantRouterMap = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },
    {
        path: '/',
        // component: Layout,
        name: '首页',
        redirect: '/project_home'
    }
]

const createRouter = () =>
    new VueRouter({
        // mode: 'history',
        scrollBehavior: () => ({ y: 0 }),
        routes: [...constantRouterMap]
    })
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router