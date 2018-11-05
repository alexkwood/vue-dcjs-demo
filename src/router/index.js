import Vue from 'vue'
import Router from 'vue-router'
import D3Component from '@/components/D3Component'
import DcComponent from '@/components/DcComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dc-component',
      component: DcComponent
    },
    {
      path: '/d3',
      name: 'd3-component',
      component: D3Component
    }
  ]
})
