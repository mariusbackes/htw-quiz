/**
 *  All global functions
 */

export default {
  user: {},

  setUser(user) {
    this.user = user;
  },

  getUser() {
    return this.user;
  },

  getUserId() {
    return this.user.user_id;
  }
}
