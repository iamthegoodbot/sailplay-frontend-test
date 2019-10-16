import Vue from 'vue';
import App from './App.vue';
import router from './router';
import VueDragScroll from 'vue-dragscroll';

Vue.use(VueDragScroll);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');