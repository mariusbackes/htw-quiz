<template>
  <div>
    <NavigationBar />
    <v-layout row wrap justify-center>
      <v-flex xs12 lg5 mb-3>
        <div class="text-xs-center" v-if="loading">
          <v-progress-circular
            :size="100"
            :width="10"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
        <div v-if="!loading">
          <div v-if="highscores != null && highscores.length > 0">
            <!-- Beste Spieler für spezielles Spiel -->
            <v-list two-line subheader>
              <v-subheader inset>Gesamtrangliste</v-subheader>
              <div v-for="(h, index) in highscores">
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ h.user.first_name }} {{ h.user.last_name }} ({{h.user.username}})</v-list-tile-title>
                    <v-list-tile-sub-title class="text--primary">
                      Punkte: {{h.reached_score}} von maximal {{h.maximum_score}}
                    </v-list-tile-sub-title>
                    <v-list-tile-sub-title>
                      Fragen: {{h.answers_correct}} von {{h.answers_correct + h.answers_wrong}} richtig beantwortet
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider inset></v-divider>
              </div>
            </v-list>
          </div>
          <div v-if="highscores == null || highscores.length === 0">
            <v-alert :value="true" type="info">
              Zu diesem Spiel gibt es noch keine Highscore
            </v-alert>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import NavigationBar from '../../components/NavigationBar';
  import highscoreService from '../../services/highscore.service';

  export default {
    name: "HighscoreForGame",
    components: {NavigationBar},
    data(){
      return {
        loading: false,
        user: null,
        game: null,
        highscores: null
      }
    },
    methods: {
      getRouterData(){
        this.game = this.$route.params.game;
        this.user = this.$route.params.user;
        this.getAllHighscoresForSpecificGame();
      },
      getAllHighscoresForSpecificGame(){
        highscoreService.getAllHighscoresForSpecificGame(this.game.game_id).then((response) => {
          if(response.success){
            this.highscores = response.highscores;
          }
          this.loading = false;
        })
      }
    },
    beforeMount(){
      this.loading = true;
      this.getRouterData();
    }
  }
</script>

<style scoped>

</style>
