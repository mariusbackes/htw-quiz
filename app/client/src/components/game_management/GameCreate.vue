<template>
  <div>
    <v-layout row wrap justify-center>
      <v-flex xs12 lg5 mb-3>
        <v-form ref="gameCreateForm">
        <v-stepper v-model="stepper" vertical>
            <v-stepper-step :complete="stepper > 1" step="1">Spieltitel angeben</v-stepper-step>
            <v-stepper-content step="1">
              <v-text-field
                v-model="game.name"
                :rules="[() => !!game.name && game.name.length >= 1 || 'Name ist ein Pflichtfeld']"
                label="Name"
                required
              ></v-text-field>
              <v-btn color="primary" @click="stepper = 2">Weiter</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="stepper > 2" step="2">Beischreibung angeben</v-stepper-step>
            <v-stepper-content step="2">
              <v-text-field
                v-model="game.description"
                :rules="[() => !!game.description && game.description.length >= 1 || 'Beschreibung ist ein Pflichtfeld']"
                label="Beschreibung"
                required
              ></v-text-field>
              <v-btn color="primary" @click="stepper = 3">Weiter</v-btn>
              <v-btn color="light" @click="stepper = 1">Zurück</v-btn>
            </v-stepper-content>

            <v-stepper-step :complete="stepper > 3" step="3">Nur zu bestimmter Zeit spielbar?</v-stepper-step>
            <v-stepper-content step="3">
              <!-- Check if challenged -->
              <v-checkbox
                v-model="game.challenged"
                @change="generateInvitationCode()"
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

              <v-btn color="primary" @click="checkDateTimes()">Weiter</v-btn>
              <v-btn color="light" @click="stepper = 2">Zurück</v-btn>
            </v-stepper-content>

            <v-stepper-step step="4">Übersicht</v-stepper-step>
            <v-stepper-content step="4" class="full-card-sytle">
              <v-card flat>
                <v-card-text>
                  <v-list two-line>
                    <v-list-tile avatar>
                      <v-list-tile-avatar>
                        <v-icon>subtitles</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>Name</v-list-tile-title>
                        <v-list-tile-sub-title>{{game.name}}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile avatar>
                      <v-list-tile-avatar>
                        <v-icon>description</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>Beschreibung</v-list-tile-title>
                        <v-list-tile-sub-title>{{game.description}}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile avatar>
                      <v-list-tile-avatar>
                        <v-icon>add_alarm</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>Nur zu bestimmter Zeit spielbar?</v-list-tile-title>
                        <v-list-tile-sub-title>{{game.challenged ? 'Ja' : 'Nein'}}</v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile avatar v-if="game.challenged">
                      <v-list-tile-avatar>
                        <v-icon>access_time</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>Start- und Endzeit</v-list-tile-title>
                        <v-list-tile-sub-title>
                          Startzeit: {{locale_start_time}} Uhr
                          <br />
                          Endzeit: {{locale_end_time}} Uhr
                        </v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile avatar v-if="game.challenged">
                      <v-list-tile-avatar>
                        <v-icon>code</v-icon>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title>Einladungscode</v-list-tile-title>
                        <v-list-tile-sub-title>
                          {{game.time_frame.invitation_code}}
                        </v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-card-text>
              </v-card>
              <v-btn color="primary" @click="createGame()">Erstellen</v-btn>
              <v-btn color="light" @click="stepper = 3">Zurück</v-btn>
            </v-stepper-content>
          </v-stepper>
        </v-form>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import gameService from '../../services/game.service';
  import { CONSTANTS } from "../../services/constants";
  import swal from 'sweetalert';

  export default {
    name: "GameCreate",
    components: {},
    data() {
      return {
        user: {},
        //All Games variable
        games: null,
        // Game-Data
        stepper: 0,
        game: {
          name: "",
          description: "",
          creator: -1, // User-ID of creator
          challenged: false,
          time_frame: {
            from: null,
            to: null,
            invitation_code: 0
          } // Time-Frame object ist just initialized if game is challenged
        },
        picker_count: 0,
        start_time_picker: null,
        end_time_picker: null,
        locale_start_time: null,
        locale_end_time: null,
      }
    },
    methods: {
      getUserData() {
        this.user = JSON.parse(localStorage.getItem('user'));
      },
      checkDateTimes(){
        // Compare Dates if End-Date is bigger than Start-Date
        if(this.game.challenged){
          if(this.start_time_picker > this.end_time_picker){
            swal(CONSTANTS.WARNING_TITLE, CONSTANTS.WARNING_STARTTIMER_GREATER_ENDTIME, CONSTANTS.WARNING);
          } else {
            this.stepper = 4;
            // Locale Strings anlegen
            this.locale_start_time = this.start_time_picker.toLocaleString('de-DE');
            this.locale_end_time = this.end_time_picker.toLocaleString('de-DE');
          }
        } else {
          this.stepper = 4;
        }
      },
      createGame() {
        this.games = JSON.parse(localStorage.getItem('games'));
        console.log(this.games);
        if(this.$refs.gameCreateForm.validate()){
          this.game.creator = this.user.user_id;
          if(this.game.challenged){
            this.game.time_frame.from = this.start_time_picker;
            this.game.time_frame.to = this.end_time_picker;
          }
          gameService.createGame(this.game, this.user).then((response) => {
            if(response.success){
              //Store game
              this.game.game_id = response.game_id;
              this.games.push(this.game);
              localStorage.setItem('games', JSON.stringify(this.games)); 
              swal("Spiel erfolgreich angelegt");
              this.$router.push('/home');
            }
          });
        }
      },
      generateInvitationCode(){
        if(this.game.challenged){
          this.game.time_frame.invitation_code = Math.floor(Math.random() * 100000 + 100000);
        }
      }
    },
    mounted() {
      this.getUserData();
    }
  }
</script>

<style scoped>
  .full-card-sytle {
    margin: 0px 0px 0px 0px;
    padding-right: 0px;
  }

  .v-card__text {
    padding: 0px !important;
  }
</style>
