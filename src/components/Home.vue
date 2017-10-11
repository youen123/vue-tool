<template>
  <div>
    <span>{{ msg }}</span>
    <ul>
      <li><router-link :to="{ name: 'Upload'}">文件中转站</router-link></li>
      <li><router-link :to="{ name: 'Movie'}">电影清单</router-link></li>
      <li><router-link :to="{ name: 'MD5'}">md5加解密</router-link></li>
    </ul>    
  </div>
</template>
<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'hi~ 来使用一些小工具吧!'
    }
  }
}
</script>
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 10px;
}
</style>
