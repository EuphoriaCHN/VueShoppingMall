// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false;

import VueLazyLoad from 'vue-lazyload'
import VueInfiniteScroll from 'vue-infinite-scroll'

Vue.use(VueLazyLoad, {
  loading: "/static/loading-svg/loading-spin.svg", // 图片在加载之前的效果（一般是个加载很快的 SVG 图）
});

Vue.use(VueInfiniteScroll);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
