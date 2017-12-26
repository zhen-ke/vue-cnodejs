// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';

// 重置浏览器样式
import reset from './assets/css/reset.css'
import github from './assets/css/github.css'

Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // 注册路由
  template: '<App/>',
  components: { App }
})
