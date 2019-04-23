import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueI18n from 'vue-i18n'
import lang from './lang'
import define from './define'
import Vuex from 'vuex'

Vue.prototype.$define = define
Vue.config.productionTip = false

Vue.use(VueI18n)
Vue.use(Vuetify)
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
Vue.use(Vuex)

const i18n = new VueI18n({
  locale: 'zh',
  messages: lang
})

Vue.prototype.$store = new Vuex.Store({
  modules: store
})

new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')
