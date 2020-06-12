import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入mock
import '../mock/mock'
// 引入全局样式
import './assets/css/global.css'
// 引入axios
import axios from '../node_modules/axios'
import './plugins/element.js'
import vuescroll from '../node_modules/vuescroll'
Vue.use(vuescroll)
Vue.config.productionTip = false
// 将axios挂载到全局
Vue.prototype.axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
