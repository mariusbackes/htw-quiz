<template>
  <div>
    <v-navigation-drawer :clipped="clipped" v-model="drawer" enable-resize-watcher app>
      <v-list>
        <v-list-tile
          v-for="item in items"
          :key="item.title"
          :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed app :clipped-left="clipped">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>htw saar Quiz</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </div>
</template>

<script>
  export default {
    name: "NavigationBar",
    data() {
      return {
        drawer: false,
        clipped: false,
        items: [
          { title: 'Home', icon: 'dashboard', path: '/home'  },
          { title: 'Spiel', icon: 'games', path: '/game' },
          { title: 'Highscore', icon: 'score', path: '/highscore' },
          { title: 'Account', icon: 'account_box', path: '/user' },
        ]
      }
    },
    methods: {
      openPage(path) {
        this.$router.push(path);
      }
    }
  }
</script>

<style scoped>

</style>
