import Vue from 'vue'
import Router from 'vue-router'

const _import_ = file => () => import('@/components/' + file + '.vue')

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: _import_('Home')
    },
    {
      path: '/brandStory',
      name: 'BrandStory',
      component: _import_('page/brandStory')
    },
    {
      path: '/hotSale',
      name: 'HotSale',
      component: _import_('page/hotSale')
    },
    {
      path: '/classify',
      name: 'Classify',
      component: _import_('classify')
    },
    {
      path: '/shopcart',
      name: 'Shopcart',
      component: _import_('shopcart'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/member',
      name: 'Member',
      component: _import_('member'),
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/news/list',
      name: 'NewsList',
      component: _import_('news/newsList'),
    },
    {
      path: '/news/detail/:id',
      name: 'NewsDetail',
      component: _import_('news/newsDetail'),
    },
    {
      path: '/goods/detail/:id',
      name: 'GoodsDetail',
      component: _import_('goods/newsDetail'),
    },
    {
      path: '/storeAddress',
      name: 'StoreAddress',
      component: _import_('page/storeAddress'),
    },
    {
      path: '/register',
      name: 'Register',
      component: _import_('user/register'),
    },
    {
      path: '/login',
      name: 'Login',
      component: _import_('user/login'),
    }
  ]
})
