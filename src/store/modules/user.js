import { getToken, setToken, removeToken } from '@/utils/cookie'
const getDefaultState = () => {
    return {
        token: getToken(),
        role: localStorage.getItem('SET_ROLE') || '',
        name: localStorage.getItem('SET_NAME') || '',
        userId: localStorage.getItem('SET_USERID') || '',
        avatar: ''
    }
}

const state = getDefaultState()

const mutations = {
    RESET_STATE: state => {
        Object.assign(state, getDefaultState())
    },
    SET_TOKEN: (state, token) => {
        state.token = token
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_ROLE: (state, role) => {
        state.role = role
    },
    SET_USERID: (state, userId) => {
        state.userId = userId
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    }
}

const actions = {
    // user login
    login({ commit }, userInfo) {
        const { role, token, userId } = userInfo
        return new Promise((resolve, reject) => {
            commit('SET_TOKEN', token)
            localStorage.setItem('SET_ROLE', role)
            localStorage.setItem('SET_USERID', userId)
            commit('SET_ROLE', role)
            commit('SET_USERID', userId)
            setToken(token)
            resolve()
        })
    },
    // user logout
    logout({ commit, state }) {
        return new Promise((resolve, reject) => {

        })
    },
    // remove token
    resetToken({ commit }) {
        return new Promise(resolve => {
            removeToken() // must remove  token  first
            commit('RESET_STATE')
            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}