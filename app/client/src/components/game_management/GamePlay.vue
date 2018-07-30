<template>

</template>

<script>
  export default {
    name: "GamePlay",
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
      playGame(game){
        // TODO: Show view for playing a game
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
