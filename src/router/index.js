import Vue from 'vue'
import Router from 'vue-router'
import D3Component from '@/components/D3Component'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'D3Component',
      component: D3Component
    },
    {
      path: '/d3',
      name: 'D3Component',
      component: D3Component
    }
  ]
})
