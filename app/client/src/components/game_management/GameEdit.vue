<template>
  <div>
    <v-layout row wrap justify-center>
      <v-flex xs12 lg5 mb-3>
        <v-card>
          <v-list two-line subheader>
            <v-subheader>Verfügbare Spiele</v-subheader>
            <div v-if="games != null">
              <v-list-tile v-for="game in games">
                <v-list-tile-content>
                  <v-list-tile-title>{{game.name}}</v-list-tile-title>
                </v-list-tile-content>
                <v-btn outline small fab color="primary" @click="editGame(game)">
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-btn outline small fab color="primary" @click="addQuestion(game)">
                  <v-icon>add</v-icon>
                </v-btn>
              </v-list-tile>
            </div>
            <div v-if="games == null">
              <v-alert :value="true" type="info">
                Keine Spiele vorhanden
              </v-alert>
            </div>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import globalService from '../../services/global.service'
  import gameService from '../../services/game.service'

  export default {
    name: "GameEdit",
    components: {

    },
    data() {
      return {
        loading: false,
        user_id: -1,
        games: null
      }
    },
    methods: {
      getUserId(){
        this.user_id = globalService.getUserId();
      },
      getGames(){
        // Check if games are loaded
        this.games = globalService.getGames();
        if(this.games == null){
          this.loading = true;
          gameService.getGames(this.user_id).then((response) => {
            if(response.success){
              this.games = response.games;
            } else {
              // TODO: Show error message
            }
            this.loading = false;
          })
        }
      },
      editGame(game){
        console.log(game);
        // TODO: Show view to edit the choosen game
      },
      addQuestion(game){
        console.log(game);
      }
    },
    mounted() {
      this.getUserId();
      this.getGames();
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
