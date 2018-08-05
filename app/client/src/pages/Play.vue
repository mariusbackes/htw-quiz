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
                              :rules="[() => !!text_answer && text_answer.length >= 1 || 'Fragetext ist ein Pflichtfeld']"
                              required></v-text-field>
              </div>
              <v-btn
                class="mx-0"
                block
                color="primary"
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
  import gameService from '../services/game.service';
  import questionService from '../services/question.service';

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
        countdown: null
      }
    },
    methods: {
      getGameInfo(){
        this.game_id = this.$route.params.game_id;
        this.game = this.$route.params.game;
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
        if(this.current_question_index === this.questions.length -1 ) {
          // Spiel abschließen
          console.log("spiel beenden");
          // TODO
        } else {
          this.moveToNextQuestion();
        }
      },
      checkMulitpleChoiceAnswer(){
        if(this.answer_radio_group != null){
          if(this.answer_radio_group.correct){
            // TODO: Set points
          } else {
            console.log("incorrect");
          }
          // clear RadioGroup for next question
          this.answer_radio_group = null;
        } else {
          // TODO: Show message to choose a answer
        }
      },
      checkInputAnswer(){
        let correct_answer = this.current_question.correct_answer.toLowerCase();
        let input_answer = this.text_answer.toLowerCase();
        if(correct_answer === input_answer){
          // TODO: Set points
        } else {
          console.log("incorrect");
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
        let countdown = null;
        let time_limit = this.current_question.time_limit;
        let seconds_left = time_limit;
        this.countdown = setInterval(() => {
          seconds_left--;
          this.secondsLeftProgress = (seconds_left * 100 / time_limit);
          if(seconds_left === 0){
            clearInterval(this.countdown);
            // Zeit abgelaufen --> Zur nächsten Frage wechseln
            this.moveToNextQuestion();
          }
        }, 1000)
      },
      moveToNextQuestion(){
        clearInterval(this.countdown);
        this.current_question_index++;
        this.current_question = this.questions[this.current_question_index];
        this.resetTimer();
      }
    },
    mounted() {
      this.getGameInfo();
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
