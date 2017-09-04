// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
import Axios from 'axios'
import Clipboard from 'clipboard'

var clipboard = new Clipboard('.copy-btn', {
  target: function (trigger) {
    return document.querySelector(trigger.dataset.clipboardTarget)
  }
})

clipboard.on('success', function (e) {
  console.info('Action:', e.action)
  console.info('Text:', e.text)
  console.info('Trigger:', e.trigger)
  e.clearSelection()
})

Vue.prototype.$http = Axios

Vue.config.productionTip = false

Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
