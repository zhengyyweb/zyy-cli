// 汉字
export const regCN = /^[\u4e00-\u9fa5\·]+$/

// 手机号
export const regMobile = /^((?!1{11})1\d{10})$/

// 邮箱
export const regEmail = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/
export const validateEmail = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('邮箱不能为空'))
    } else {
        if (regEmail.test(value)) {
            callback()
        } else {
            callback(
                new Error('邮箱格式错误')
            )
        }
    }
}
export const regENNum = /^[A-Za-z0-9]+$/

// 数字内容
export const regNumber = /(^[1-9]([0-9]+)?(\.[0-9]([1-9])*)?$)|(^(0){1}$)|(^[0-9]\.[0-9]([1-9])*$)/
export const validatePass = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('密码不能为空'))
    } else {
        if (
            /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]{6,20}$/.test(
                value
            )
        ) {
            callback()
        } else {
            callback(
                new Error(
                    '长度6-20，必须包含大写字母、小写字母、数字和字符中的三种类型'
                )
            )
        }
    }
}
export const validatePhone = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('手机号不能为空'))
    } else {
        if (/^((?!1{11})1\d{10})$/.test(value)) {
            callback()
        } else {
            callback(
                new Error('手机号格式错误')
            )
        }
    }
}
export const validateloginField = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('账号不能为空'))
    } else {
        if (/^[a-zA-Z0-9@_]{6,20}$/.test(value)) {
            callback()
        } else {
            callback(
                new Error('长度6-20，由字母、数字、下划线组成')
            )
        }
    }
}