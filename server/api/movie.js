let config = require('../dbConfig')
let express = require('express')
let router = express.Router()
let mysql = require('mysql')
let sql = require('../sql')

let pool = mysql.createPool(config.mysql)
// 获取所有电影
router.use('/getMovies', (req, res) => {
  let sqlCmd = sql.movie.getAll
  let sqlArr = []
  if (req.query.searchContent) {
    sqlCmd = sql.movie.getMovies
    sqlArr = ['%' + req.query.searchContent + '%', '%' + req.query.searchContent + '%']
  }
  pool.query(sqlCmd, sqlArr, function (error, results, fields) {
    if (error) throw error
    if (results) {
      res.json({
        flag: true,
        data: results,
        msg: '查询成功'})
    }
  })
})

// 添加记录
router.use('/addMovie', function (req, res) {
  let {name, cover, type, country, subtitles, remark, doubanlink, score, id} = req.body
  let sqlCmd = sql.movie.add
  let sqlArr = [name, cover, type, country, subtitles, remark, doubanlink, score]
  if (typeof id !== 'undefined') {
    sqlCmd = sql.movie.edit
    sqlArr = [...sqlArr, id]
  }
  pool.query(sqlCmd, sqlArr, function (error, results, fields) {
    if (error) throw error
    if (results) {
      res.json({
        flag: true,
        msg: '操作成功'})
    }
  })
})

// 删除记录
router.use('/delMovie', function (req, res) {
  let id = req.body.id
  pool.query(sql.movie.del, [id], function (error, results, fileds) {
    if (error) throw error
    if (results) {
      res.json({
        flag: true,
        msg: '删除成功'
      })
    }
  })
})

module.exports = router

