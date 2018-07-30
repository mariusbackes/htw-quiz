/**
 *  All global functions
 */

export default {
  user: {},
  games: null,

  setUser(user) {
    this.user = user;
  },

  getUser() {
    return this.user;
  },

  getUserId() {
    return this.user.user_id;
  },

  setGames(games){
    this.games = games;
  },

  getGames(){
    return this.games;
  }
}
