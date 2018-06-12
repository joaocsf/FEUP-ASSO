import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'vuetify/dist/vuetify.min.css'
import VueMarkdown from 'vue-markdown'
import VuePrism from 'vue-prism'

Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VuePrism)
Vue.component('vue-markdown', VueMarkdown)

new Vue(
  {
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
