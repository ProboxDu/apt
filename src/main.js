import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import router from './router'
import store from './store'
import Vuex from 'vuex'
import "./assets/css/index.css";
import VueCodemirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'

// 不显示生产提示信息
Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(router)
Vue.use(ElementUI)
Vue.use(VueCodemirror)

Vue.prototype.$http = axios
//axios.defaults.baseURL = 'http://127.0.0.1:8000'
//axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'//'application/x-www-fromurlencodeed'

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
