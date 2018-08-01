<template>
  <div>
    <NavigationBar />
    <v-layout row wrap justify-center>
      <!-- Main View -->
      <v-flex xs12 lg5 mb-3>
        <v-card>
          <v-card-title>
            <span class="headline">Neue Frage zum Spiel "{{game.name}}" hinzufügen</span>
          </v-card-title>
          <v-form ref="addQuestionForm">
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field text label="Text der Frage"
                                  v-model="question.text"
                                  :rules="[() => !!question.text && question.text.length >= 1 || 'Fragetext ist ein Pflichtfeld']"
                                  required></v-text-field>
                    <v-text-field text label="Korrekte Antwort"
                                  v-model="question.correct_answer"
                                  :rules="[() => !!question.correct_answer && question.correct_answer.length >= 1 || 'Die korrekte Antwort ist ein Pflichtfeld']"
                                  required></v-text-field>
                    <v-text-field number label="Zeitlimit in Sekunden"
                                  v-model="question.time_limit"
                                  :rules="[
                                    () => !!question.time_limit || 'Das Zeitlimit ist ein Pflichtfeld',
                                    () => !isNaN(question.time_limit) || 'Das Zeitlimit muss als Zahl angeben werden']"
                                  required></v-text-field>
                    <v-flex xs9>
                      <v-switch
                        v-model="question.is_multiple_choice"
                        label="Hat die Frage mehrere Antwortmöglichkeiten?"
                        required
                      ></v-switch>
                    </v-flex>
                    <v-flex xs3>
                      <v-btn color="primary" flat @click="showMulitpleChoiceDialog = true">
                        Information
                        <v-icon right dark>info</v-icon>
                      </v-btn>
                    </v-flex>

                    <div v-if="question.is_multiple_choice">
                      <v-text-field text label="Erste falsche Antwort"
                                    v-model="question.multiple_choice.wrong_answer_1"
                                    :rules="[() => !!question.multiple_choice.wrong_answer_1 && question.multiple_choice.wrong_answer_1.length >= 1 || 'Die erste falsche Antwort ist ein Pflichtfeld']"
                                    required></v-text-field>
                      <v-text-field text label="Zweite falsche Antwort"
                                    v-model="question.multiple_choice.wrong_answer_2"
                                    :rules="[() => !!question.multiple_choice.wrong_answer_2 && question.multiple_choice.wrong_answer_2.length >= 1 || 'Die zweite falsche Antwort ist ein Pflichtfeld']"
                                    required></v-text-field>
                      <v-text-field text label="Dritte falsche Antwort"
                                    v-model="question.multiple_choice.wrong_answer_3"
                                    :rules="[() => !!question.multiple_choice.wrong_answer_3 && question.multiple_choice.wrong_answer_3.length >= 1 || 'Die dritte falsche Antwort ist ein Pflichtfeld']"
                                    required></v-text-field>
                    </div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="saveQuestion()">Speichern</v-btn>
          </v-card-actions>
        </v-card>

        <!-- List all questions available for the game -->
        <v-expansion-panel popout>
          <v-expansion-panel-content>
            <div slot="header">Alle Fragen anzeigen</div>
            <!-- TODO: show all available questions for this game -->
          </v-expansion-panel-content>
        </v-expansion-panel>

        <!-- Description dialog for multiple choice questions -->
        <v-dialog
          v-model="showMulitpleChoiceDialog"
          width="500">
          <v-card>
            <v-card-title
              class="headline grey lighten-2"
              primary-title>
              Antwortmöglichkeiten
            </v-card-title>
            <v-card-text>
              Sind für eine Frage mehrere Antwortmöglichkeiten ausgewählt, so muss der Nutzer sich während des Spiels für die richtige Antwort entscheiden.
              <br />
              Ist diese Funkion nicht aktiviert, erscheint bei der Beantwortung der Frage ein Textfeld, in welches der Nutzer die richtige Antwort eingeben muss.
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                flat
                @click="showMulitpleChoiceDialog = false">
                Verstanden
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import NavigationBar from '../components/NavigationBar';
  import questionService from '../services/question.service';

  export default {
    name: 'AddQuestion',
    components: {
      NavigationBar
    },
    data () {
      return {
        question: {
          text: "",
          game_id: -1,
          correct_answer: "",
          // Time limit is 20 seconds default
          time_limit: 20,
          is_multiple_choice: true,
          multiple_choice: {
            wrong_answer_1: "",
            wrong_answer_2: "",
            wrong_answer_3: ""
          }
        },
        questions: [],
        game_id: -1,
        game: {},
        showMulitpleChoiceDialog: false
      }
    },
    methods: {
      getGameInfo(){
        this.game_id = this.$route.params.game_id;
        this.game = this.$route.params.game;
        this.getQuestionsForGame();
      },
      getQuestionsForGame(){
        // TODO: service call + api
      },
      saveQuestion(){
        if(this.$refs.addQuestionForm.validate()){
          this.question.game_id = this.game_id;
          questionService.saveQuestion(this.question).then((response) => {
            if(response.success){
              // TODO: Push question to questions array
            } else {
              // TODO: Show error message
            }
          })
        }
      }
    },
    mounted() {
      this.getGameInfo();
    }
  }
</script>

<style scoped>

</style>
