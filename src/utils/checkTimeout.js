// 引入路由和storage工具函数
import router from '@/router'
import { removeToken } from './cookie'
let lastTime = new Date().getTime()
let currentTime = new Date().getTime()
const timeOut = 100 * 60 * 1000 // 设置超时时间
window.onload = function() {
    window.document.onmousedown = function() {
        localStorage.setItem('lastTime', new Date().getTime())
    }
}

function checkTimeout() {
    currentTime = new Date().getTime() // 更新当前时间
    lastTime = localStorage.getItem('lastTime')

    if (currentTime - lastTime > timeOut) { // 判断是否超时
        // 清除登陆信息和token
        removeToken()

        // 跳到登陆页
        router.push({ name: 'login' })
    }
}

export default function() {
    /* 定时器 间隔30秒检测是否长时间未操作页面 */
    window.setInterval(checkTimeout, 30000)
}