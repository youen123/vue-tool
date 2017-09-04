const express = require('express')
const app = express()
app.use('/static', express.static('uploads'))
var os = require('os')
// 请求参数解析
const bodyParser = require('body-parser')
const multer = require('multer')
const movieApi = require('./api/movie')

// 文件上传
function fileFilter (req, file, cb) {
  if (file.mimetype === 'application/octet-stream') {
    cb(null, false)
  } else {
    cb(null, true)
  }
}
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    let re = /\.[a-zA-Z]+$/gi
    let afterfix = re.exec(file.originalname)
    afterfix = afterfix ? afterfix[0] : '.txt'
    cb(null, file.fieldname + '-' + Date.now() + afterfix)
  }
})
let upload = multer({storage})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/api/upload', upload.fields([{name: 'file', maxCount: 1}]), function (req, res) {
  if (typeof req.files.file === 'undefined') {
    res.json({
      flag: false,
      msg: '上传失败'})   
  }
  let IPv4
  for (var i = 0; i < os.networkInterfaces().en0.length; i++) {
    if (os.networkInterfaces().en0[i].family === 'IPv4') {
      IPv4 = os.networkInterfaces().en0[i].address
    }
  }
  res.json({
    flag: true,
    data: {
      fileName: req.files.file[0].filename,
      address: IPv4
    },
    msg: '上传成功'})
})

app.use('/movie', movieApi)
app.listen(8088, function () {
  console.log('Example app listening on port 8088!')
})
