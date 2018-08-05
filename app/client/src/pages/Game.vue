<template>
  <div>
    <NavigationBar />
    <v-tabs centered icons-and-text>
      <v-tabs-slider color="blue"></v-tabs-slider>

      <v-tab href="#tab-1">
        Erstellen
        <v-icon>create</v-icon>
      </v-tab>

      <v-tab href="#tab-2">
        Bearbeiten
        <v-icon>edit_attributes</v-icon>
      </v-tab>

      <!--
      <v-tab href="#tab-3">
        Spielen
        <v-icon>play_arrow</v-icon>
      </v-tab>
      -->

      <!-- Spiel erstellen -->
      <v-tab-item id="tab-1">
        <GameCreate />
      </v-tab-item>

      <!-- Spiel bearbeiten -->
      <v-tab-item id="tab-2">
        <GameEdit />
      </v-tab-item>

      <!--
      <v-tab-item id="tab-3">
        <GamePlay />
      </v-tab-item>
      -->

    </v-tabs>
    </div>
</template>

<script>
  import NavigationBar from '../components/NavigationBar';
  import GameCreate from '../components/game_management/GameCreate'
  import GameEdit from "../components/game_management/GameEdit";
  import GamePlay from "../components/game_management/GamePlay";

  export default {
    name: "Game",
    components: {
      GamePlay,
      GameEdit,
      NavigationBar,
      GameCreate
    },
    data() {
      return {

      }
    }
  }
</script>

<style scoped>
  .v-list {
    padding: 0px 0;
  }

  .mb-3 {
    margin-bottom: 0px !important;
  }
</style>
