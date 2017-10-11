let express = require('express')
let router = express.Router()
const crypto = require('crypto')
const secret = 'ylj'

// 加密
router.use('/encode', function (req, res) {
  let text = req.query.text
  let cipher = crypto.createCipher('aes-256-cbc', secret)
  var crypted = cipher.update(text, 'utf8', 'hex')
  crypted += cipher.final('hex')
  res.json({
    flag: true,
    data: crypted,
    msg: '操作成功'})
})

// 解密
router.use('/decode', function (req, res) {
  let text = req.query.text.trim()
  const decipher = crypto.createDecipher('aes-256-cbc', secret)
  const encrypted = text
  let decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  res.json({
    flag: true,
    data: decrypted,
    msg: '操作成功'})
})

module.exports = router

