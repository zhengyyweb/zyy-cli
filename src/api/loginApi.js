import request from '@/utils/request'

class LoginAdmin {
    // 登录接口
    loginAuthApi(data) {
        return request({
            url: '/login/auth/token',
            method: 'post',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data
        })
    }
}
export default new LoginAdmin()