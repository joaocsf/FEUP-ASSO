import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import 'vuetify/dist/vuetify.min.css'
import VueMarkdown from 'vue-markdown'
import VuePrism from 'vue-prism'
import VueClipboard from 'vue-clipboard2'


Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VuePrism)
Vue.use(VueClipboard)
Vue.component('vue-markdown', VueMarkdown)

new Vue(
  {
    router,
    render: h => h(App)
  }).$mount('#app')
