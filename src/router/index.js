import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Hello from '@/components/Hello'
import Upload from '@/components/Upload'
import Movie from '@/components/Movie'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/about',
      name: 'Hello',
      component: Hello
    }, {
      path: '/upload',
      name: 'Upload',
      component: Upload
    }, {
      path: '/movie',
      name: 'Movie',
      component: Movie
    }
  ]
})
