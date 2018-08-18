<template>
  <div>
    <NavigationBar />
    <v-layout row wrap justify-center>
      <v-flex xs12 lg5 mb-3>
        <div v-if="!loading && site_data != null">
          <!-- Beste Spieler global -->
          <v-list two-line subheader>
            <v-subheader inset>Gesamtrangliste</v-subheader>
            <div v-for="(bu, index) in site_data.bestUsers">
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>{{index + 1}}. {{ bu.first_name }} {{ bu.last_name }}</v-list-tile-title>
                  <v-list-tile-sub-title>
                    Abgeschlossene Spiele: {{ bu.completed_games }} <br />
                    Erzielte Punkte: {{ bu.reached_points }}
                  </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider inset></v-divider>
            </div>
          </v-list>

          <!-- Auswahl für verschiedene Optionen -->
          <div v-if="site_data.games.ownGames != null && site_data.games.ownGames.length > 0">
            <v-list subheader>
              <v-subheader inset>Eigene Spiele</v-subheader>
              <div v-for="(og, index) in site_data.games.ownGames">
                <v-list-tile ripple @click="showHighscoreForSpecificGame(og)">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ og.description }}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-icon>arrow_forward</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider inset></v-divider>
              </div>
            </v-list>
          </div>

          <div v-if="site_data.games.contributingGames != null && site_data.games.contributingGames.length > 0">
            <v-list subheader>
              <v-subheader inset>Spiele für dich</v-subheader>
              <div v-for="(cg, index) in site_data.games.contributingGames">
                <v-list-tile ripple @click="showHighscoreForSpecificGame(cg)">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ cg.description }}</v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-icon>arrow_forward</v-icon>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider inset></v-divider>
              </div>
            </v-list>
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
    name: "Highscore",
    components: {
      NavigationBar
    },
    data(){
      return {
        loading: false,
        user: null,
        site_data: null,
        list_elements: []
      }
    },
    methods: {
      getUser(){
        this.user = JSON.parse(localStorage.getItem('user'));
      },
      getSiteData(){
        highscoreService.getAllDataForHighscorePage(this.user.user_id).then((response) => {
          if(response.success){
            this.site_data = response.data;
          }
        })
      },
      showHighscoreForSpecificGame(game){
        this.$router.push({name: 'highscoreForGame', params: {game_id: game.game_id, game: game, user: this.user}});
      }
    },
    beforeMount(){
      this.getUser();
      this.getSiteData();
    }
  }
</script>

<style scoped>

</style>
