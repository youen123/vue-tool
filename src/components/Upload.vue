<template>
  <div>    
    <h2>文件中转站</h2>
    <input type="file" id="uploadFile" />
    <el-button size="small" type="primary" @click="test()">上传</el-button>
    <br/>
    <div v-if="address">
      <pre id="pre">wget {{ address }}</pre>
      <el-button size="small" type="primary" class="copy-btn" data-clipboard-target="#pre">复制</el-button>
    </div>

  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'upload',
    data () {
      return {
        fileList: [],
        address: ''
      }
    },
    methods: {
      test () {
        let formData = new FormData()
        formData.append('file', document.querySelector('#uploadFile').files[0])
        this.$http.post('/api/upload', formData)
        .then((res) => {
          let data = res.data.data
          if (data.address) {
            this.address = `http://${data.address}:${location.port}/static/${data.fileName}`
          }
        })
      }
    }
  }
</script>
<style>
  
</style>
<style>
</style>
