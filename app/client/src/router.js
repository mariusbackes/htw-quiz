import Vue from 'vue'
import Router from 'vue-router'
import Login from './pages/Login'
import Home from './pages/Home'
import Game from './pages/Game'
import Highscore from './pages/Highscore'
import User from './pages/User'
import AddQuestion from './pages/AddQuestion'
import Play from './pages/Play'
import GameSummary from './pages/GameSummary'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/game',
      name: 'game',
      component: Game
    },
    {
      path: '/game/:game_id/addQuestion',
      name: 'addQuestion',
      component: AddQuestion
    },
    {
      path: '/highscore',
      name: 'highscore',
      component: Highscore
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/game/:game_id/play',
      name: 'play',
      component: Play
    },
    {
      path: '/game/:game_id/gameSummary',
      name: 'gameSummary',
      component: GameSummary
    }
  ]
})
