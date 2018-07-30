<template>
  <div>
    <v-layout row wrap justify-center>
      <!-- Main View -->
      <v-flex xs12 lg5 mb-3>
        <v-card>
          <v-list two-line subheader>
            <v-subheader>Verfügbare Spiele</v-subheader>
            <div v-if="games != null">
              <v-list-tile v-for="game in games">
                <v-list-tile-content>
                  <v-list-tile-title>{{game.name}}</v-list-tile-title>
                </v-list-tile-content>
                <v-btn outline small fab color="error" @click="deleteGame(game)">
                  <v-icon>delete</v-icon>
                </v-btn>
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

      <!-- Edit Game -->
      <v-dialog v-if="game != null" v-model="editGameDialog" persistent max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Spiel bearbeiten</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field text label="Name" v-model="game.name" required></v-text-field>
                  <v-text-field text label="Beschreibung" v-model="game.description" required></v-text-field>

                  <v-checkbox
                    v-model="game.challenged"
                    label="Spiel nur zu bestimmter Zeit spielbar?"
                    required
                  ></v-checkbox>

                  <div v-if="game.challenged">
                    <v-datetime-picker
                      label="Startzeit wählen"
                      v-model="start_time_picker"
                      format="DD.MM.YYYY HH:mm"
                      clearText="Zurück"
                      okText="Übernehmen">
                    </v-datetime-picker>

                    <v-datetime-picker
                      label="Endzeit wählen"
                      v-model="end_time_picker"
                      format="DD.MM.YYYY HH:mm"
                      clearText="Zurück"
                      okText="Übernehmen">
                    </v-datetime-picker>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click.native="editGameDialog = false">Abbrechen</v-btn>
            <v-btn color="primary" flat @click="saveEditedGame()">Speichern</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
        // Dialogs
        editGameDialog: false,
        newQuestionDialog: false,
        // Variables
        loading: false,
        user_id: -1,
        games: null,
        // Edit game
        game: null,
        start_time_picker: null,
        end_time_picker: null,
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
        this.game = game;
        this.editGameDialog = true;

        if(this.game.challenged){
          this.start_time_picker = new Date(this.game.time_frame.from);
          this.end_time_picker = new Date(this.game.time_frame.to);
        } else {
          this.start_time_picker = null;
          this.end_time_picker = null;
        }
        gameService.editGame(this.game).then((response) => {
          if(response.success){
            console.log(response);
          }
        })
      },
      saveEditedGame(){
        this.editGameDialog = false;
        // TODO: Servie call + api
      },
      deleteGame(game){
        console.log(game);
        // TODO: Servie call + api
      },
      addQuestion(game){
        console.log(game);
        // TODO: show new view with all questions and an add button for a new question
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
