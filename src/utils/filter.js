/**
 * @param {string} tel 手机号
 * @returns 中间四位为****
 */
const phoneFilter = (tel) => {
  var reg = /(\d{3})\d{4}(\d{4})/
  var result = tel.replace(reg, '$1****$2')
  return result
}
// 带眼睛切换的使用这个过滤器
const phoneFilterW = (tel, flag) => {
  if (flag) {
    var reg = /(\d{3})\d{4}(\d{4})/
    var result = tel.replace(reg, '$1****$2')
    return result
  } else {
    return tel
  }
}
const emailFilterW = (email, flag) => {
  if (flag) {
    if (String(email).indexOf('@') > 0) {
      const str = email.split('@')
      let _s = ''
      if (str[0].length > 3) {
        for (let i = 0; i < str[0].length - 3; i++) {
          _s += '*'
        }
      }
      var new_email = str[0].substr(0, 3) + _s + '@' + str[1]
    }
    return new_email
  } else {
    return email
  }
}
// 替换邮箱字符
const regEmail = (email) => {
  if (String(email).indexOf('@') > 0) {
    const str = email.split('@')
    let _s = ''
    if (str[0].length > 3) {
      for (let i = 0; i < str[0].length - 3; i++) {
        _s += '*'
      }
    }
    var new_email = str[0].substr(0, 3) + _s + '@' + str[1]
  }
  return new_email
}

// 微信
const wechatFilter = (wxNo) => {
  const newStr = wxNo.substr(0, 2) + '****' + wxNo.substr(wxNo.length - 2)
  return newStr
}
module.exports = {
  phoneFilter,
  regEmail,
  emailFilterW,
  phoneFilterW,
  wechatFilter
}
