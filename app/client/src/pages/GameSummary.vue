<template>
  <div>

  </div>
</template>

<script>
  import highscoreService from '../services/highscore.service'

  export default {
    name: "GameSummary",
    data() {
      return {
        game: null,
        game_id: -1,
        game_summary: null,
        user: null
      }
    },
    methods: {
      getRouterData(){
        this.game = this.$route.params.game;
        this.game_id = this.$route.params.game_id;
        this.game_summary = this.$route.params.game_summary;
        this.user = this.$route.params.user;

        console.log(this.game, this.game_id, this.game_summary, this.user);
        this.saveHighscore();
      },
      saveHighscore(){
        highscoreService.saveHighscore(this.game_id, this.user.user_id, this.game_summary).then((response) => {
          if(response.success){
            console.log(response);
          }
        })
      }
    },
    mounted() {
      this.getRouterData();
    }
  }
</script>

<style scoped>

</style>
