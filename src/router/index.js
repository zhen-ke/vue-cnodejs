import Vue from 'vue'
import Router from 'vue-router'

import main from '@/components/main';
import detail from '@/components/detail';
import user from '@/components/user';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: main,
      children: [
        {
          path: '/tag/:id',
        }
      ]
    },
    {
      path: '/topic/:id',
      name: 'detail',
      component: detail
    },
    {
      path: '/user/:id',
      name: 'user',
      component: user
    },
  ]
})