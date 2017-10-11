<template>
  <div>
    <h2>电影清单</h2>
    <el-row class="board">
      <el-col :span="8">
        <el-input v-model="searchContent"></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="getMovies({searchContent})">搜索</el-button> 
        <el-button type="primary" @click="showAddDialog()">新增</el-button> 
      </el-col>
      <el-col :span="4">
        <el-select v-model="showType" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select> 
      </el-col>            
    </el-row>
    <el-row v-show="showType === 'type1'">
      <el-col :span="4" class="cover-wp" v-for="item in movieList">
        <img :src="item.cover" :alt="item.name"><br/>
        <span>{{item.name}}</span>
        <el-rate
          v-model="item.rate"
          disabled
          show-text
          text-color="#ff9900"
          text-template="">
        </el-rate>
      </el-col>
    </el-row>
    <div v-show="showType === 'type2'">
      <el-row class="review" v-for="item in movieList">
        <el-col :span="4" class="review-hd">
            <a :href="item.doubanlink">
                <img class="lazy" :src="item.cover" :alt="item.name" style="display: inline;">
            </a>
        </el-col>
        <el-col :span="4" class="review-bd">
            <h3><a :href="item.doubanlink" class="">{{item.name}}</a></h3>
            <span>类型：{{item.type}}</span><br/>
            <span>国家：{{item.country}}</span><br/>
            <span>分数：{{item.score}}</span>
            <div class="review-content">
                简介：
            </div>
            <el-button-group>
              <el-button type="primary" icon="edit" size="mini" @click="showEditDialog(item)"></el-button>
              <el-button type="primary" icon="delete" size="mini" @click="delMovie(item.id)"></el-button>
            </el-button-group>
        </el-col>
        <el-col :span="16">
          <el-col v-if="item.subtitles">台词：<br/>{{item.subtitles}}<hr/></el-col>
          <el-col>槽点:😂<br/>{{item.remark}}</el-col>         
        </el-col>

      </el-row>
    </div>
    <el-dialog :title="newMovieForm.title" :visible.sync="dialogFormVisible">
      <el-form :model="newMovieForm">
        <el-form-item label="电影名称" :label-width="formLabelWidth">
          <el-input v-model="newMovieForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电影海报" :label-width="formLabelWidth">
          <el-input v-model="newMovieForm.cover" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-input v-model="newMovieForm.type" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="国家" :label-width="formLabelWidth">
          <el-input v-model="newMovieForm.country" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="分数" :label-width="formLabelWidth">
          <el-input v-model="newMovieForm.score" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="豆瓣链接" :label-width="formLabelWidth">
          <el-input v-model="newMovieForm.doubanlink" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="台词：" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="newMovieForm.subtitles" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注：" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="newMovieForm.remark" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addMovie()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        options: [{
          value: 'type1',
          label: '缩略模式'
        }, {
          value: 'type2',
          label: '列表模式'
        }],
        showType: 'type1',
        value5: 3.7,
        dialogFormVisible: false,
        newMovieForm: {
          name: '',
          cover: '',
          type: '',
          country: '',
          subtitles: '',
          remark: '',
          doubanlink: '',
          score: ''
        },
        formLabelWidth: '100px',
        movieList: [],
        searchContent: ''
      }
    },
    methods: {
      getMovies (params) {
        this.$http.get('movie/getMovies', {params: params}).then((res) => {
          this.movieList = res.data.data.map((item) => {
            item.rate = parseInt(item.score) / 20
            return item
          })
        })
        .catch((er) => {
          console.log(er)
        })
      },
      addMovie () {
        this.$http.post('movie/addMovie', this.newMovieForm).then((res) => {
          console.log(res)
          this.dialogFormVisible = false
          this.getMovies()
        })
      },
      delMovie (id) {
        this.$http.post('movie/delMovie', {id}).then((res) => {
          this.getMovies()
        })
      },
      showAddDialog () {
        this.dialogFormVisible = true
        this.newMovieForm = {}
        this.newMovieForm.title = '新增电影'
      },
      showEditDialog (item) {
        this.dialogFormVisible = true
        this.newMovieForm = Object.assign({}, item)
        this.newMovieForm.title = '编辑电影'
      }
    },
    beforeCreate () {
      this.$http.get('movie/getMovies').then((res) => {
        this.movieList = res.data.data.map((item) => {
          item.rate = parseInt(item.score) / 20
          return item
        })
      })
      .catch((er) => {
        console.log(er)
      })
    }

  }
</script>
<style>
ul {
  margin: 0
}
.board {
  margin-bottom: 30px;
}
.cover-wp {
  text-align: center;
  min-width: 100px; 
}
.cover-wp img{
  width: 140px;
}
.review {
  padding: 10px 0;
  border-bottom: 1px solid #e5e5e5;
}
.review-hd img {
  width: 100%;
  max-width: 120px;
  box-shadow: 2px 2px 6px #757575;
}
.review-hd a {
  display: inline-block;
  max-height: 170px;
}
.review-bd h3 {
  margin: 10px 0;
}
</style>

