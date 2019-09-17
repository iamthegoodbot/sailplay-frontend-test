import Vue from 'vue';
import Router from 'vue-router';
import MainLayout from "./pages/MainLayout.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "root",
      component: MainLayout
    }
  ]
});