import Cookies from 'js-cookie'

import router from '@/router'
import ansycRouter from '@/router/ansycRouter.js'
import { initRouter } from '@/utils/EDC_Root_Btn.js'

const state = {
    sidebar: {
        opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
        withoutAnimation: false
    },
    routers: sessionStorage.getItem('navRouters') ? sessionStorage.getItem('navRouters') : [],
    navRouters: sessionStorage.getItem('navRouters') ? sessionStorage.getItem('navRouters') : [],
    currentPathArr: [],
    isKeepAlive: false,
    refreshRouterName: '',
    tagNavList: [{
        label: '概览',
        path: '/',
        name: '概览',
        lastTime: 0
    }]
}
const mutations = {
    TOGGLE_SIDEBAR: state => {
        state.sidebar.opened = !state.sidebar.opened
        state.withoutAnimation = false
        if (state.sidebar.opened) {
            Cookies.set('sidebarStatus', 1)
        } else {
            Cookies.set('sidebarStatus', 0)
        }
    },

    // 左侧菜单
    SET_SIDE_PATH: (state, currentPathArr) => {
        state.currentPathArr = currentPathArr
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
        Cookies.set('sidebarStatus', 0)
        state.sidebar.opened = false
        state.sidebar.withoutAnimation = withoutAnimation
    },
    SET_REFREASH_ROUTER_NAME: (state, name) => {
        state.refreshRouterName = name
    },
    SET_IS_KEEP_LIVE(state, type) {
        state.isKeepAlive = type
    },

    // 菜单权限
    SET_ALL_MENU_LIST(state, menulist) {
        state.navRouters = menulist
        state.routers = menulist
    }
}

const actions = {
    // 左侧菜单获处理
    setAllMenuList({ commit }, userInfo) {
        return new Promise((resolve, reject) => {
            const accessedRouters = initRouter(ansycRouter)
            sessionStorage.setItem(
                'navRouters',
                JSON.stringify(accessedRouters)
            )
            sessionStorage.setItem(
                'allMenuList',
                JSON.stringify(accessedRouters)
            )

            accessedRouters.push({
                path: '*',
                redirect: '/404',
                hidden: true
            })
            router.addRoutes(accessedRouters)

            commit('SET_ALL_MENU_LIST', accessedRouters)
            resolve()
        })
    },
    toggleSideBar({ commit }) {
        commit('TOGGLE_SIDEBAR')
    },

    closeSideBar({ commit }, { withoutAnimation }) {
        commit('CLOSE_SIDEBAR', withoutAnimation)
    },

    setRefreshRouterName({ commit }, name) {
        commit('SET_REFREASH_ROUTER_NAME', name)
    },
    setIsKeepAlive({ commit }, type) {
        commit('SET_IS_KEEP_LIVE', type)
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}