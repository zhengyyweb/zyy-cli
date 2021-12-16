/* 加密算法
 *  采用aes-128-ecp算法
 *  key必须为16字节utf8字符（如英文字母、数字等等）
 *  iv设置为空‘’
 *  输出为hex打斜字符串（大小写不影响解密）
 */

const crypto = require('crypto')

export function encryption(data, key) {
    var iv = ''
    var cipherChunks = []
    var cipher = crypto.createCipheriv('aes-128-ecb', key, iv)
    cipher.setAutoPadding(true)
    cipherChunks.push(cipher.update(data, 'utf8', 'hex'))
    cipherChunks.push(cipher.final('hex'))
    return cipherChunks.join('').toUpperCase()
}
// 解密算法
export function decryption(data, key) {
    var iv = ''
    var cipherChunks = []

    var decipher = crypto.createDecipheriv('aes-128-ecb', key, iv)
    decipher.setAutoPadding(true)
    cipherChunks.push(decipher.update(data, 'hex', 'utf8'))
    cipherChunks.push(decipher.final('utf8'))
    return cipherChunks.join('').toUpperCase()
}