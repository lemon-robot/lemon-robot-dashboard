import Vue from 'vue'
import App from './App.vue'
import router from './router'
import service from './service'
import axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import i18n from './i18n'
import define from './define'
import Vuex from 'vuex'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(Vuex)

Vue.prototype.$define = define
Vue.prototype.$service = service

axios.defaults.baseURL = window.$HOST

new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
