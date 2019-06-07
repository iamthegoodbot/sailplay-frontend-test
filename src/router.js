import Vue from 'vue'
import Router from 'vue-router'
import Clients from './pages/Clients.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'clients',
      component: Clients
    }
  ]
})
