<template>
  <div>

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
        loading: false,
        user_id: -1,
        games: null
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
              console.log(response);
              this.games = response.data;
            } else {
              // TODO: Show error message
            }
            this.loading = false;
          })
        }
      },
      editGame(game){
        // TODO: Show view to edit the choosen game
      },
      addQuestion(){

      }
    },
    mounted() {
      this.getUserId();
      this.getGames();
    }
  }
</script>

<style scoped>

</style>
