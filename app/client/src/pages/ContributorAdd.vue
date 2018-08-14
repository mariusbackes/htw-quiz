<template>
  <div>
    <v-layout row wrap justify-center>
      <!-- Main View -->
      <v-flex xs12 lg5 mb-3>
        <!-- Fill view -->
      </v-flex>

      <!-- Show Snackbar Message -->
      <div v-if="showSnackbar">
        <SnackBarAlert :text="snackbarTitle" :color="snackbarColor"></SnackBarAlert>
      </div>
    </v-layout>
  </div>
</template>

<script>
  import globalService from '../../services/global.service';
  import userService from '../../services/user.service';
  import contributorService from '../../services/contributor.service';
  import SnackBarAlert from "../../components/SnackBarAlert";
  import { CONSTANTS } from "../../services/constants";

  export default {
    name: "ContributorAdd",
    components: {
      SnackBarAlert
    },
    data() {
      return {
        // Variables
        loading: false,
        game: null,
        user_email: "",

        // Snackbar Data
        showSnackbar: false,
        snackbarTitle: "",
        snackbarColor: "",
        contributorOptions: {
          game_id: -1,
          user_id: -1,
          play: false,
          create: false,
          edit: false,
          delete: false
        }
      }
    },
    methods: {
      getGameInfo(){
        this.game = this.$route.params.game;
        this.user_id = globalService.getUserId();
      },
      loadContributors(){
        // TODO: load contributors for the game
      },
      searchForUser(){
        userService.searchForUser(user_email).then((response) => {
          if(response.success){

          } else {
            // TODO: Show snackbar alert (user not found)
          }
        })
        // TODO: Enter E-Mail input value to view and get info about user, to add him
        // as a contributor
      },
      addOrUpdateUserAsContributor(contributorOptions){
        contributorService.addOrUpdateUserAsContributor(contributorOptions).then((response) =>{
          if(response.success){
            // TODO: show success message
          } else {
            // TODO: show error message
          }
        })
      },
      deleteUserAsContributor(){
        contributorService.deleteUserAsContributor(user_id_to_delete, this.game.game_id).then((response) => {
          if(response.success){
            // TODO: show success message
          } else {
            // TODO: show error message
          }
        })
      }
    },
    mounted() {
      this.getGameInfos();
    }
  }
</script>

<style scoped>

</style>
