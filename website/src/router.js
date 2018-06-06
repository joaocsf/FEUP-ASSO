import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Observer from './views/Observer.vue'
import Command from './views/Command.vue'
import Step1 from './views/Step1.vue'
import Step2 from './views/Step2.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/observer',
      name: 'observer',
      component: Observer
    },
    {
      path: '/command',
      name: 'command',
      component: Command
    },
    {
      path: '/step1',
      name: 'step1',
      component: Step1
    },
    {
      path: '/step2',
      name: 'step2',
      component: Step2
    }
  ]
})
