import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import GoodList from '@/views/GoodsList'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'GoodList',
      component: GoodList
    }
  ]
})
