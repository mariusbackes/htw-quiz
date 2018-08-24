<template>
  <div>
    <NavigationBar />
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
                  <v-icon right>videogame_asset</v-icon>
                </v-btn>
              </v-list-tile>
            </div>
            <div v-if="ownGames == null || ownGames.length === 0">
              <v-alert :value="true" type="info">
                Keine eigenen Spiele vorhanden
              </v-alert>
            </div>

            <!-- Contributing Games -->
            <v-subheader>Zu Spielen eingeladen</v-subheader>
            <div v-if="contributingGames != null">
              <v-list-tile v-for="contributingGame in contributingGames">
                <v-list-tile-content>
                  <v-list-tile-title>{{contributingGame.name}}</v-list-tile-title>
                </v-list-tile-content>
                <v-btn outline small color="primary" @click="playGame(contributingGame)">
                  Spiel starten
                  <v-icon right>videogame_asset</v-icon>
                </v-btn>
              </v-list-tile>
            </div>
            <div v-if="contributingGames == null || contributingGames.length === 0">
              <v-alert :value="true" type="info">
                Du bist zu keinen Spielen eingeladen
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
                  <v-icon right>videogame_asset</v-icon>
                </v-btn>
              </v-list-tile>
            </div>
            <div v-if="challengedGames == null || challengedGames.length === 0">
              <v-alert :value="true" type="info">
                Momentan finden keine offenen Spiele statt, denen du beitreteten könntest
              </v-alert>
            </div>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import NavigationBar from '../components/NavigationBar';
  import gameService from '../services/game.service';
  import { CONSTANTS } from "../services/constants";
  import swal from 'sweetalert';

  export default {
    name: 'Home',
    components: {
      NavigationBar
    },
    data() {
      return {
        loading: false,
        user_id: -1,
        ownGames: null,
        ownGame: null,
        contributingGames: null,
        contributingGame: null,
        challengedGames: null,
        challengedGame: null,
      }
    },
    methods: {
      getUserId(){
        let user = JSON.parse(localStorage.getItem('user'));
        this.user_id = user.user_id;
      },
      getGames(){
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
            } else {
              swal(CONSTANTS.ERROR_TITLE, CONSTANTS.ERROR_NO_GAMES, CONSTANTS.ERROR);
            }
            this.loading = false;
          })
        }
      },
      playGame(game){
        if(game.challenged){
          this.$router.push({name: 'prepareChallengedGame', params: {game_id: game.game_id, game: game}});
        } else {
          this.$router.push({name: 'play', params: {game_id: game.game_id, game: game}});
        }
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
