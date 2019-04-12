import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import ResourceCenter from '../components/ResourceCenter.vue'
import Mine from '../components/Mine.vue'
import Search from '../components/Search.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      component: Home,
      name: 'Home'
    },
    {
      path: '/resourcecenter',
      component: ResourceCenter,
      name: 'ResourceCenter'
    },
    {
      path: '/mine',
      component: Mine,
      name: 'Mine'
    },
    {
      path: '/search',
      component: Search,
      name: 'Search'
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})
