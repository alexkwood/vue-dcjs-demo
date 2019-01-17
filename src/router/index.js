import Vue from 'vue'
import Router from 'vue-router'
import D3Component from '@/components/D3Component'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'd3-component',
      component: D3Component
    }
  ]
})
