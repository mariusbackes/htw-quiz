<template>
  <div>
    <NavigationBar />
    <v-layout row wrap justify-center>
      <!-- Main View -->
      <v-flex xs12 lg5 mb-3>
        <v-expansion-panel popout>
          <v-expansion-panel-content>
            <div slot="header">Frage hinzufügen</div>
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
          </v-expansion-panel-content>
          <!-- Alle Fragen anzeigen -->
          <v-expansion-panel-content>
            <div slot="header">Alle Fragen anzeigen</div>
            <v-card v-if="questions.length > 0">
              <v-list two-line>
                <template v-for="q in questions">
                  <v-list-tile
                    @click="editQuestion(q)"
                    :key="q.text"
                    ripple>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ q.text }}</v-list-tile-title>
                      <v-list-tile-sub-title class="text--primary">{{ q.correct_answer }}</v-list-tile-sub-title>
                      <!-- <v-list-tile-sub-title>{{ q.? }}</v-list-tile-sub-title> -->
                    </v-list-tile-content>

                    <v-list-tile-action>
                      <v-list-tile-action-text>Zeitlimit: {{ q.time_limit }} Sekunden</v-list-tile-action-text>
                      <v-icon
                        color="primary">
                        edit
                      </v-icon>
                    </v-list-tile-action>
                  </v-list-tile>
                </template>
              </v-list>
            </v-card>
            <div v-if="questions.length == 0">
              <v-alert :value="true" type="info">
                Keine Fragen vorhanden
              </v-alert>
            </div>
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

        <!-- Edit question dialog -->
        <v-dialog v-if="question_to_edit != null" v-model="editQuestionDialog" persistent max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Frage bearbeiten</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-form ref="editQuestionForm">
                  <v-layout wrap>
                    <v-flex xs12>
                      <v-text-field text label="Text der Frage"
                                    v-model="question_to_edit.text"
                                    :rules="[() => !!question_to_edit.text && question_to_edit.text.length >= 1 || 'Fragetext ist ein Pflichtfeld']"
                                    required></v-text-field>
                      <v-text-field text label="Korrekte Antwort"
                                    v-model="question_to_edit.correct_answer"
                                    :rules="[() => !!question_to_edit.correct_answer && question_to_edit.correct_answer.length >= 1 || 'Die korrekte Antwort ist ein Pflichtfeld']"
                                    required></v-text-field>
                      <v-text-field number label="Zeitlimit in Sekunden"
                                    v-model="question_to_edit.time_limit"
                                    :rules="[
                                    () => !!question_to_edit.time_limit || 'Das Zeitlimit ist ein Pflichtfeld',
                                    () => !isNaN(question_to_edit.time_limit) || 'Das Zeitlimit muss als Zahl angeben werden']"
                                    required></v-text-field>

                      <v-switch
                        v-model="question_to_edit.is_multiple_choice"
                        label="Hat die Frage mehrere Antwortmöglichkeiten?"
                        required
                      ></v-switch>

                      <div v-if="question_to_edit.is_multiple_choice">
                        <v-text-field text label="Erste falsche Antwort"
                                      v-model="question_to_edit.multiple_choice.wrong_answer_1"
                                      :rules="[() => !!question_to_edit.multiple_choice.wrong_answer_1 && question_to_edit.multiple_choice.wrong_answer_1.length >= 1 || 'Die erste falsche Antwort ist ein Pflichtfeld']"
                                      required></v-text-field>
                        <v-text-field text label="Zweite falsche Antwort"
                                      v-model="question_to_edit.multiple_choice.wrong_answer_2"
                                      :rules="[() => !!question_to_edit.multiple_choice.wrong_answer_2 && question_to_edit.multiple_choice.wrong_answer_2.length >= 1 || 'Die zweite falsche Antwort ist ein Pflichtfeld']"
                                      required></v-text-field>
                        <v-text-field text label="Dritte falsche Antwort"
                                      v-model="question_to_edit.multiple_choice.wrong_answer_3"
                                      :rules="[() => !!question_to_edit.multiple_choice.wrong_answer_3 && question_to_edit.multiple_choice.wrong_answer_3.length >= 1 || 'Die dritte falsche Antwort ist ein Pflichtfeld']"
                                      required></v-text-field>
                      </div>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click.native="editQuestionDialog = false">Zurück</v-btn>
              <v-btn color="primary" flat @click="saveEditedQuestion()">Speichern</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Show Snackbar Message -->
        <div v-if="showSnackbar">
          <SnackBarAlert :text="snackbarTitle" :color="snackbarColor"></SnackBarAlert>
        </div>

      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import NavigationBar from '../components/NavigationBar';
  import questionService from '../services/question.service';
  import SnackBarAlert from "../components/SnackBarAlert";
  import { CONSTANTS } from "../services/constants";

  export default {
    name: 'AddQuestion',
    components: {
      NavigationBar,
      SnackBarAlert
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
        question_to_edit: null,
        questions: [],
        game_id: -1,
        game: {},
        showMulitpleChoiceDialog: false,
        editQuestionDialog: false,

        // Snackbar Data
        showSnackbar: false,
        snackbarTitle: "",
        snackbarColor: "",
      }
    },
    methods: {
      getGameInfo(){
        this.game_id = this.$route.params.game_id;
        this.game = this.$route.params.game;
        this.getQuestionsForGame();
      },
      getQuestionsForGame(){
        questionService.getQuestionsForGame(this.game_id).then((response) => {
          if(response.success){
            this.questions = response.questions;
          } else {
            this.snackbarTitle = CONSTANTS.WARNING_NO_QUESTIONS;
            this.snackbarColor = "warning";
            this.showSnackbar =  true;
          }
        })
      },
      saveQuestion(){
        if(this.$refs.addQuestionForm.validate()){
          this.question.game_id = this.game_id;
          questionService.saveQuestion(this.question).then((response) => {
            if(response.success){
              this.questions.push(this.question);
            } else {
              this.snackbarTitle = CONSTANTS.ERRROR_SAVE_QUESTION;
              this.snackbarColor = "error";
              this.showSnackbar =  true;
            }
          })
        }
      },
      editQuestion(question){
        this.question_to_edit = question;
        if(!this.question_to_edit.is_multiple_choice){
          this.question_to_edit.multiple_choice =  {
            wrong_answer_1: "",
            wrong_answer_2: "",
            wrong_answer_3: ""
          }
        }
        this.editQuestionDialog = true;
      },
      saveEditedQuestion(){
        if(this.$refs.editQuestionForm.validate()){
          questionService.editQuestion(this.question_to_edit).then((response) => {
            if(response.success){
              // TODO: Replace edited question with the question in the array
            } else {
              this.snackbarTitle = CONSTANTS.ERRROR_SAVE_QUESTION;
              this.snackbarColor = "error";
              this.showSnackbar =  true;
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
