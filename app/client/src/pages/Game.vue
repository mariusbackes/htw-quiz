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

      <v-tab href="#tab-3">
        Spielen
        <v-icon>play_arrow</v-icon>
      </v-tab>

      <!-- Allgemeine Informationen zum Benutzer -->
      <v-tab-item id="tab-1">
        <GameCreate />
      </v-tab-item>

      <!-- Änderung von Namen oder E-Mail Adresse -->
      <v-tab-item id="tab-2">
        <GameEdit />
      </v-tab-item>

      <!-- Passwort ändern -->
      <v-tab-item id="tab-3">
        <v-card flat>
          <v-card-text>

          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
    </div>
</template>

<script>
  import NavigationBar from '../components/NavigationBar';
  import GameCreate from '../components/game_management/GameCreate'
  import GameEdit from "../components/game_management/GameEdit";

  export default {
    name: "Game",
    components: {
      GameEdit,
      NavigationBar,
      GameCreate
    },
    data() {
      return {
        e1: 0
      }
    }
  }
</script>

<style scoped>

</style>
