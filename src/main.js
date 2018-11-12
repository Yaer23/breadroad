// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store.js'

Vue.config.productionTip = false

//  配置axios
import Axios from 'axios'
Vue.prototype.$axios = Axios
// Axios.defaults.baseURL = "https://www.easy-mock.com/mock/5bd6772de6c8e77249e2fb73/breadRoad/"

//  工具引入 -- 移动端适配
import '@/utils/rem.js'

//全局引入vant
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';

Vue.use(Vant);
//  后期按需引入
import {
  Lazyload
} from 'vant';

// options 为可选参数，无则不传
Vue.use(Lazyload);

//  设置全局过滤器
Vue.filter('priceFilter', function (data) {
  data = data.toFixed(2)
  return "￥ " + data;
})

//  前端路由结合sessionStorage权限控制
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (sessionStorage.getItem("access_token")) {
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
