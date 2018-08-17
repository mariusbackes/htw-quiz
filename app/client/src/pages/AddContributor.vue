<template>
  <div>
    <NavigationBar />
    <v-layout row wrap justify-center>
      <!-- Main View -->
      <v-flex xs12 lg5 mb-3>
        <!-- TODO: add button -->

        <!-- Eigene Spiele -->
        <v-subheader>Mitwirkende am Spiel</v-subheader>
        <div>
          <v-data-table :headers="headers"
                        :items="contributorsForGame"
                        hide-actions item-key="name"
                        no-data-text="Momentan gibt es keine Mitwirkenden an diesem Spiel">
            <template slot="items" slot-scope="props">
              <tr>
                <td>{{ props.item.user.first_name }} {{ props.item.user.last_name }}</td>
                <td class="text-xs-right">
                  <v-checkbox v-model="props.item.play_value" v-on:change="updateContributor(props.index)"></v-checkbox>
                </td>
                <td class="text-xs-right">
                  <v-checkbox v-model="props.item.edit_value" v-on:change="updateContributor(props.index)"></v-checkbox>
                </td>
                <td class="text-xs-right">
                  <v-checkbox v-model="props.item.delete_value" v-on:change="updateContributor(props.index)"></v-checkbox>
                </td>
                <td class="justify-center layout px-0">
                  <v-icon small color="red" @click="deleteUserAsContributor(props.item.user_id, props.index)">delete</v-icon>
                </td>
              </tr>
            </template>
          </v-data-table>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import NavigationBar from '../components/NavigationBar';
  import globalService from '../services/global.service';
  import userService from '../services/user.service';
  import contributorService from '../services/contributor.service';
  import { CONSTANTS } from "../services/constants";
  import swal from 'sweetalert';

  export default {
    name: "AddContributor",
    components: {
      NavigationBar
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
        },
        contributorsForGame: [],
        headers: [
          { text: 'Name', align: 'left', value: 'name' },
          { text: 'Spielen', sortable: false, value: 'calories' },
          { text: 'Bearbeiten', sortable: false, value: 'fat' },
          { text: 'Löschen', sortable: false, value: 'carbs' },
          { text: 'Aktionen', sortable: false, value: 'actions',  }
        ]
      }
    },
    methods: {
      getGameInfos(){
        this.game = this.$route.params.game;
        this.user_id = globalService.getUserId();
        this.loadContributors();
      },
      loadContributors(){
        // TODO: test case
        contributorService.loadContributors(this.game.game_id).then((response) => {
          if(response.success){
            this.contributorsForGame = response.contributors;
          }
        })
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
      addUserAsContributor(contributorOptions){
        contributorService.addOrUpdateUserAsContributor(contributorOptions).then((response) =>{
          if(response.success){
            // TODO: show success message
          } else {
            // TODO: show error message
          }
        })
      },
      updateContributor(index){
        console.log(JSON.stringify(this.contributorsForGame[index]));
        // TODO: Update on api
      },
      deleteUserAsContributor(user_id_to_delete, index){
        // TODO: test case
        contributorService.deleteUserAsContributor(user_id_to_delete, this.game.game_id).then((response) => {
          if(response.success){
            this.contributorsForGame.splice(index, 1);
          } else {
            swal(CONSTANTS.ERROR_DELETE_CONTRIBUTOR_TITLE, CONSTANTS.ERROR_DELETE_CONTRIBUTOR_BODY, CONSTANTS.ERROR);
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
  table.v-table tbody td, table.v-table tbody th {
    height: 30px;
  }
</style>
