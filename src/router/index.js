import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import Login from 'components/Login'
import Register from 'components/Register'
import Admin from 'components/Admin'
import Auction from 'components/Auction'
import config from '../config'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/auction',
      name: 'Auction',
      component: Auction
    }
  ],
  mode: 'history',
  base: config.base
})
