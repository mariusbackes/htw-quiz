import Vue from 'vue'
import Router from 'vue-router'
import Login from './pages/Login'
import Home from './pages/Home'
import Game from './pages/Game'
import Highscore from './pages/Highscore'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/game',
      name: 'Game',
      component: Game
    },
    {
      path: '/highscore',
      name: 'Highscore',
      component: Highscore
    }
  ]
})
