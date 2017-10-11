<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="">
        <el-input v-model="formInline.text" placeholder="" style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button-group>
          <el-button type="primary" @click="encode()">加密</el-button>
          <el-button @click="decode()">解密</el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    results: {{result}}
  </div>
</template>
<script>
  export default {
    name: 'md5',
    data () {
      return {
        formInline: {
          text: ''
        },
        result: ''
      }
    },
    methods: {
      encode () {
        this.$http.get('md5/encode', {params: { text: this.formInline.text }}).then((res) => {
          this.result = res.data.data
        })
        .catch((er) => {
          console.log(er)
        })
      },
      decode () {
        this.$http.get('md5/decode', {params: { text: this.formInline.text }}).then((res) => {
          this.result = res.data.data
        })
        .catch((er) => {
          console.log(er)
        })
      }
    }
  }
</script>
