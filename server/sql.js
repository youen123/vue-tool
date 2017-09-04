module.exports = {
  movie: {
    getAll: 'select * from movie order by id desc',
    getMovies: "select * from movie where name like ? or type like ?",
    add: 'insert into movie(name, cover, type, country, subtitles, remark, doubanlink, score) values(?,?,?,?,?,?,?,?)',
    del: 'delete from movie where id = ?',
    edit: 'update movie set name = ?,cover = ?, type = ?, country = ?, subtitles = ?, remark = ?, doubanlink = ?, score = ? where id = ?'
  }
}

