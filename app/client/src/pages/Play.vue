<template>
  <div>
    <NavigationBar />
    <div class="text-xs-center" v-if="loading">
      <v-progress-circular
        :size="100"
        :width="10"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>

    <v-layout row wrap justify-center v-if="!loading && questions.length > 0">
      <v-flex xs12 lg5 mb-3>
        <v-container fill-height>
          <v-layout align-center>
            <v-flex>
              <v-progress-linear v-model="secondsLeftProgress"></v-progress-linear>

              <v-text-field p-2 outline label="Frage:" :placeholder="current_question.text" disabled></v-text-field>
              <v-divider class="my-3"></v-divider>

              <div v-if="current_question.is_multiple_choice">
                <v-radio-group v-model="answer_radio_group">
                  <v-radio
                    v-for="(answer, index) in answer_radio_array"
                    :key="index"
                    :label="answer.text"
                    :value="answer"
                  ></v-radio>
                </v-radio-group>
              </div>

              <!-- Question is not multiple choice -->
              <div v-if="!current_question.is_multiple_choice">
                <v-text-field text label="Text der Frage"
                              v-model="text_answer"
                              :rules="[() => !!text_answer && text_answer.length >= 1 || 'Die Antwort muss eingegeben werden']"
                              required>
                </v-text-field>
              </div>
              <v-btn
                class="mx-0"
                block
                color="primary"
                :disabled="(answer_radio_group == null) && (text_answer === '')"
                @click="checkAnswer()">
                Antwort absenden
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import NavigationBar from '../components/NavigationBar';
  import questionService from '../services/question.service';
  import { CONSTANTS } from "../services/constants";
  import swal from 'sweetalert';

  export default {
    name: "Play",
    components: {
      NavigationBar
    },
    data() {
      return {
        loading: false,
        current_question_index: 0,
        current_question: null,
        questions: [],
        answer_radio_group: null,
        answer_radio_array: [],
        // Answers
        text_answer: "",
        secondsLeftProgress: 100,
        countdown: null,
        seconds_left: -1,

        // Game Summary Object
        game_summary: {
          answers_correct: 0,
          answers_wrong: 0,
          reached_score: 0,
          maximum_score: 0
        },
        user: null
      }
    },
    methods: {
      getInfos(){
        this.game_id = this.$route.params.game_id;
        this.game = this.$route.params.game;
        this.user = JSON.parse(localStorage.getItem('user'));
        this.getQuestions();
      },
      getQuestions() {
        this.loading = true;
        setTimeout(() => {
          questionService.getQuestionsForGame(this.game_id).then((response) => {
            if(response.success){
              this.questions = response.questions;
              this.current_question = this.questions[this.current_question_index];
              if(this.current_question.is_multiple_choice){
                this.setAnswerInputOptions();
                this.resetTimer();
              }
            } else {
              if(Array.isArray(response.questions) && response.questions.length === 0){
                swal(CONSTANTS.ERROR_NO_QUESTIONS_TITLE, CONSTANTS.ERROR_NO_QUESTIONS_BODY, CONSTANTS.WARNING).then((data) => {
                  this.$router.push('/home');
                });
              }
            }
            this.loading = false;
          })
        }, 2000);
      },
      checkAnswer(){
        // Prüfen ob die Frage richtig oder falsch beantwortet wurde
        if(this.current_question.is_multiple_choice){
          this.checkMulitpleChoiceAnswer();
        } else {
          this.checkInputAnswer();
        }

        // Zur nächsten Frage wechseln, wenn es nicht die letzte Frage ist
        if(this.current_question_index === this.questions.length -1) {
          this.finishGame();
        } else {
          this.moveToNextQuestion();
        }
      },
      finishGame() {
        // Maximale erreibare Punkte für ein Spiel ermitteln
        this.game_summary.maximum_score = this.getMaximumPoints();
        // Spiel abschließen
        console.log(this.game_summary);
        this.$router.push({name: 'gameSummary',
          params: {
            game_id: this.game.game_id,
            game: this.game,
            game_summary: this.game_summary,
            user: this.user
          }
        });
      },
      checkMulitpleChoiceAnswer(){
        if(this.answer_radio_group != null){
          if(this.answer_radio_group.correct){
            this.setPointsForAnswer();
          } else {
            this.game_summary.answers_wrong++;
          }
          // clear RadioGroup for next question
          this.answer_radio_group = null;
        }
      },
      checkInputAnswer(){
        let correct_answer = this.current_question.correct_answer.toLowerCase();
        let input_answer = this.text_answer.toLowerCase();
        if(correct_answer === input_answer){
          this.setPointsForAnswer();
        } else {
          this.game_summary.answers_wrong++;
        }
      },
      setAnswerInputOptions() {
        let array = [];
        let answer = {
          text: this.current_question.correct_answer,
          correct: true
        };
        array.push(answer);

        for (let key in this.current_question.multiple_choice) {
          let wrong_answer = {
            correct: false
          };
          // skip loop if the property is from prototype
          if (!this.current_question.multiple_choice.hasOwnProperty(key)) continue;

          wrong_answer.text = this.current_question.multiple_choice[key];
          array.push(wrong_answer);
        }

        this.answer_radio_array = this.shuffle(array);
      },
      shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      },
      resetTimer(){
        let time_limit = this.current_question.time_limit;
        this.seconds_left = time_limit;
        this.countdown = setInterval(() => {
          this.seconds_left--;
          this.secondsLeftProgress = (this.seconds_left * 100 / time_limit);
          if(this.seconds_left === 0){
            clearInterval(this.countdown);
            // Zeit abgelaufen --> Zur nächsten Frage wechseln
            if(this.current_question_index === this.questions.length -1){
              this.finishGame();
            } else{
              this.moveToNextQuestion();
            }
          }
        }, 1000)
      },
      moveToNextQuestion(){
        clearInterval(this.countdown);
        // Nächste Frage wählen
        this.current_question_index++;
        this.current_question = this.questions[this.current_question_index];
        // Antworten zurücksetzen
        this.answer_radio_group = null;
        this.text_answer = "";
        this.resetTimer();
      },
      setPointsForAnswer(){
        // Points will be calculated by the remaining time * 5
        this.game_summary.answers_correct++;
        this.game_summary.reached_score = this.game_summary.reached_score + this.seconds_left * CONSTANTS.HIGHSCORE_MULTIPLIER;
      },
      getMaximumPoints(){
        let points = 0;
        this.questions.forEach((question) => {
          points += question.time_limit * CONSTANTS.HIGHSCORE_MULTIPLIER;
        });

        return points;
      }
    },
    mounted() {
      this.getInfos();
    }
  }
</script>

<style scoped>
  .my-3 {
    margin-top: 0px !important;
  }

  .text-xs-center {
    padding-top: 50px;
  }
</style>
