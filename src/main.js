import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './permission.js'
import checkTimeout from '@/utils/checkTimeout'
Vue.use(checkTimeout)

import { Message } from 'element-ui'
Vue.prototype.$message = Message

import '@/styles/index.scss'
import filter from '@/utils/filter'

Object.keys(filter).forEach((key) => Vue.filter(key, filter[key]))
// element.ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import animated from 'animate.css'
Vue.use(animated)

import md5 from 'js-md5'
import { encryption } from '@/utils/AES'

// md5算法
Vue.prototype.$md5 = md5

// AES算法
Vue.prototype.$encryption = encryption

Vue.config.productionTip = false

// svg
import '@/icons'

new Vue({
    el: '#app',
    router,
    store,
    print,
    render: h => h(App)
}).$mount('#app')