import Vue from 'vue'
import axios from 'axios'
import './plugins/element.js'
import App from './App.vue'

Vue.config.productionTip = false
Vue.prototype.$axios = axios;

new Vue({
  render: h => h(App)
}).$mount('#app')
