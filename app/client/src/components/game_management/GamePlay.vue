<template>
  <div>
    <v-layout row wrap justify-center>
      <!-- Main View -->
      <v-flex xs12 lg5 mb-3>
        <v-card>
          <v-list two-line subheader>
            <v-subheader>Eigene Spiele</v-subheader>
            <div v-if="games != null">
              <v-list-tile v-for="game in games">
                <v-list-tile-content>
                  <v-list-tile-title>{{game.name}}</v-list-tile-title>
                </v-list-tile-content>
                <v-btn outline small color="primary" @click="playGame(game)">
                  Spiel starten
                  <v-spacer></v-spacer>
                  <v-icon>videogame_asset</v-icon>
                </v-btn>
              </v-list-tile>
            </div>
            <div v-if="games == null || games.length == 0">
              <v-alert :value="true" type="info">
                Keine Spiele vorhanden
              </v-alert>
            </div>
          </v-list>
        </v-card>

        <!-- Show Snackbar Message -->
        <div v-if="showSnackbar">
          <SnackBarAlert :text="snackbarTitle" :color="snackbarColor"></SnackBarAlert>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import globalService from '../../services/global.service';
  import gameService from '../../services/game.service';
  import SnackBarAlert from "../../components/SnackBarAlert";
  import { CONSTANTS } from "../../services/constants";

  export default {
    name: "GamePlay",
    components: {
      SnackBarAlert
    },
    data() {
      return {
        loading: false,
        user_id: -1,
        games: null,

        // Snackbar Data
        showSnackbar: false,
        snackbarTitle: "",
        snackbarColor: "",
      }
    },
    methods: {
      getUserId(){
        this.user_id = globalService.getUserId();
      },
      getGames(){
        this.games = globalService.getGames();
        if(this.games == null){
          this.loading = true;
          gameService.getGames(this.user_id).then((response) => {
            if(response.success){
              this.games = response.games;
              globalService.setGames(this.games);
            } else {
              this.snackbarTitle = CONSTANTS.ERROR_NO_GAMES;
              this.snackbarColor = "error";
              this.showSnackbar =  true;
            }
            this.loading = false;
          })
        }
      },
      playGame(game){
        this.$router.push({name: 'play', params: {game_id: game.game_id, game: game}});
      }
    },
    mounted() {
      this.getUserId();
      this.getGames();
    }
  }
</script>

<style scoped>

</style>
