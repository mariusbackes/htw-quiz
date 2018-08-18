<template>
  <div>
    <v-layout row wrap justify-center>
      <!-- Main View -->
      <v-flex xs12 lg5 mb-3>
        <v-card>
          <v-list two-line subheader>
            <v-subheader>Verfügbare Spiele</v-subheader>
            <div v-if="games != null">
              <v-list-tile v-for="(game, index) in games">
                <v-list-tile-content>
                  <v-list-tile-title>{{game.name}}</v-list-tile-title>
                </v-list-tile-content>
                <v-btn outline small fab color="error" @click="showDeleteGameDialog(game, index)">
                  <v-icon>delete</v-icon>
                </v-btn>
                <v-btn outline small fab color="primary" @click="editGame(game)">
                  <v-icon>edit</v-icon>
                </v-btn>
                <v-btn outline small fab color="primary" @click="addQuestion(game)">
                  <v-icon>help</v-icon>
                </v-btn>
                <v-btn outline small fab color="primary" @click="addContributor(game)">
                  <v-icon>person_add</v-icon>
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

                  <v-switch
                    v-model="game.challenged"
                    label="Spiel nur zu bestimmter Zeit spielbar?"
                    required
                  ></v-switch>

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

      <!-- Löschen des Spiels bestätigen -->
      <v-dialog
        v-model="confirmDeleteGameDialog"
        max-width="290">
        <v-card>
          <v-card-title class="headline">Spiel löschen</v-card-title>
          <v-card-text>
            Soll das Spiel wirklich gelöscht werden? Alle darin enthaltenen Fragen werden ebenfalls unwiederruflich gelöscht
            und sind nicht mehr abrufbar!
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat="flat"
              @click="confirmDeleteGameDialog = false">
              Abbrechen
            </v-btn>

            <v-btn
              color="error"
              flat="flat"
              @click="deleteGame()">
              Löschen
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>

<script>
  import gameService from '../../services/game.service';
  import { CONSTANTS } from "../../services/constants";
  import swal from 'sweetalert';

  export default {
    name: "GameEdit",
    components: {
    },
    data() {
      return {
        // Dialogs
        editGameDialog: false,
        newQuestionDialog: false,
        confirmDeleteGameDialog: false,
        // Variables
        loading: false,
        user_id: -1,
        games: null,
        // Edit game
        game: null,
        games_index: -1,
        start_time_picker: null,
        end_time_picker: null,
      }
    },
    methods: {
      getUserId(){
        let user = JSON.parse(localStorage.getItem('user'));
        this.user_id = user.user_id;
      },
      getGames(){
        // Check if games are loaded
        this.games = JSON.parse(localStorage.getItem('games'));
        if(this.games == null){
          this.loading = true;
          gameService.getOwnGames(this.user_id).then((response) => {
            if(response.success){
              this.games = response.games;
              localStorage.setItem('games', JSON.stringify(this.games));
            } else {
              swal(CONSTANTS.ERROR_TITLE, CONSTANTS.ERROR_NO_GAMES, CONSTANTS.ERROR);
            }
            this.loading = false;
          })
        }
      },
      editGame(game){
        this.game = game;
        this.editGameDialog = true;

        if(this.game.challenged){
          this.start_time_picker = new Date(this.game.time_frame.from);
          this.end_time_picker = new Date(this.game.time_frame.to);
        } else {
          this.start_time_picker = null;
          this.end_time_picker = null;
        }
      },
      saveEditedGame(){
        if(this.game.challenged){
          this.game.time_frame = {
            from: this.start_time_picker,
            to: this.end_time_picker
          };
        }

        this.editGameDialog = false;
        gameService.editGame(this.game).then((response) => {
          if(response.success){
            console.log(response);
          }
        })
      },
      showDeleteGameDialog(game, index){
        this.game = game;
        this.games_index = index;
        this.confirmDeleteGameDialog = true;
      },
      deleteGame(){
        this.confirmDeleteGameDialog = false;
        gameService.deleteGame(this.game).then((response) => {
          if(response.success){
            this.games.splice(this.games_index, 1);
          } else {
            swal(CONSTANTS.ERROR_TITLE, CONSTANTS.ERROR_DELETE_GAME, CONSTANTS.ERROR);
          }
        })
      },
      addQuestion(game){
        // Redirect to new view for adding a question to a game
        this.$router.push({name: 'addQuestion', params: {game_id: game.game_id, game: game}});
      },
      addContributor(game){
        this.$router.push({name: 'addContributor', params: {game_id: game.game_id, game: game}});
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
