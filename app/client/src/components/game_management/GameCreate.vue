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
                label="Name"
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
                label="Spiel nur zu bestimmter Zeit spielbar?"
                required
              ></v-checkbox>

              <div v-if="game.challenged">
                <!-- TODO: Date and Time Pickers with date objects -->
                <!--
                <h2>Startzeit wählen </h2>
                <v-time-picker v-if="picker_count == 0" v-model="start_time_picker" format="24hr"></v-time-picker>
                <v-btn color="primary" v-if="picker_count == 0" @click="picker_count = 1">Endzeit wählen</v-btn>
                <v-time-picker v-if="picker_count == 1" v-model="start_time_picker" format="24hr"></v-time-picker>
                -->
              </div>

              <v-btn color="primary" @click="stepper = 4">Weiter</v-btn>
              <v-btn color="light" @click="stepper = 2">Zurück</v-btn>
            </v-stepper-content>

            <v-stepper-step step="4">Übersicht</v-stepper-step>
            <v-stepper-content step="4">
              <!-- TODO: summary of all inputs -->
              <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
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
  import globalService from '../../services/global.service';

  export default {
    name: "GameCreate",
    data() {
      return {
        user: {},
        // Game-Data
        stepper: 0,
        game: {
          name: "",
          description: "",
          creator: -1, // User-ID of creator
          challenged: false,
          time_frame: {
            from: null,
            to: null
          } // Time-Frame object ist just initialized if game is challenged
        },
        picker_count: 0,
        start_time_picker: null,
        end_time_picker: null
      }
    },
    methods: {
      getUserData() {
        this.user = globalService.getUser();
      },
      createGame() {
        if(this.$refs.gameCreateForm.validate()){
          this.game.creator = this.user.user_id;
          if(this.game.challenged){
            this.game.time_frame.from = this.start_time_picker;
            this.game.time_frame.to = this.end_time_picker;
          }
          // TODO: service call and store game
          console.log(this.game);
        }
      }
    },
    mounted() {
      this.getUserData();
    }
  }
</script>

<style scoped>

</style>
