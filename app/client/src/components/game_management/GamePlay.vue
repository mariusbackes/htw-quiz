<template>
  <div>
    <v-layout row wrap justify-center>
      <!-- Main View -->
      <v-flex xs12 lg5 mb-3>
        <v-card>
          <v-list two-line subheader>
            <!-- Eigene Spiele -->
            <v-subheader>Eigene Spiele</v-subheader>
            <div v-if="ownGames != null">
              <v-list-tile v-for="ownGame in ownGames">
                <v-list-tile-content>
                  <v-list-tile-title>{{ownGame.name}}</v-list-tile-title>
                </v-list-tile-content>
                <v-btn outline small color="primary" @click="playGame(ownGame)">
                  Spiel starten
                  <v-spacer></v-spacer>
                  <v-icon>videogame_asset</v-icon>
                </v-btn>
              </v-list-tile>
            </div>
            <div v-if="ownGames == null || ownGames.length == 0">
              <v-alert :value="true" type="info">
                Keine eigenen Spiele vorhanden
              </v-alert>
            </div>

            <!-- Contributing Games -->
            <v-subheader>Eigene Spiele</v-subheader>
            <div v-if="contributingGames != null">
              <v-list-tile v-for="contributingGame in contributingGames">
                <v-list-tile-content>
                  <v-list-tile-title>{{contributingGame.name}}</v-list-tile-title>
                </v-list-tile-content>
                <v-btn outline small color="primary" @click="playGame(contributingGame)">
                  Spiel starten
                  <v-spacer></v-spacer>
                  <v-icon>videogame_asset</v-icon>
                </v-btn>
              </v-list-tile>
            </div>
            <div v-if="contributingGame == null || contributingGame.length == 0">
              <v-alert :value="true" type="info">
                Du bist zu keinen Spielne eingeladen
              </v-alert>
            </div>

            <!-- Challenged Games -->
            <v-subheader>Momentane Spiele</v-subheader>
            <div v-if="challengedGames != null">
              <v-list-tile v-for="challengedGame in challengedGames">
                <v-list-tile-content>
                  <v-list-tile-title>{{challengedGame.name}}</v-list-tile-title>
                </v-list-tile-content>
                <v-btn outline small color="primary" @click="playGame(challengedGame)">
                  Spiel starten
                  <v-spacer></v-spacer>
                  <v-icon>videogame_asset</v-icon>
                </v-btn>
              </v-list-tile>
            </div>
            <div v-if="challengedGame == null || challengedGame.length == 0">
              <v-alert :value="true" type="info">
                Momentan finden keine offenen Spiele statt, denen du beitreteten könntest
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
        ownGames: null,
        contributingGames: null,
        challengedGames: null

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
          gameService.getAllGamesForStartpage(this.user_id).then((response) => {
            if(response.success){
              // Zeigt die selbst erstellten Spiele an
              this.ownGames = response.ownGames;
              // Zeigt alle Spiele an, zu denen man eingeladen wurde
              this.contributingGames = response.contributingGames;
              // Zeigt alle momentanen Spiele an, welchen man beitreteten kann
              this.challengedGames = response.challengedGames;
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
