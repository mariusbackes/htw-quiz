<template>
  <div>
    <NavigationBar />
    <v-layout row wrap justify-center>
      <!-- Main View -->
      <v-flex xs12 lg5 mb-3>
        <div style="padding: 16px;">
          <v-btn block color="primary" @click="searchForNewContributorDialog = true">Mitwirkender hinzufügen</v-btn>
        </div>
        <!-- Mitwirkende am Spiel -->
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
                  <v-checkbox v-model="props.item.play_value" @change="updateContributor(props.index)"></v-checkbox>
                </td>
                <td class="text-xs-right">
                  <v-checkbox v-model="props.item.edit_value" @change="updateContributor(props.index)"></v-checkbox>
                </td>
                <td class="text-xs-right">
                  <v-checkbox v-model="props.item.delete_value" @change="updateContributor(props.index)"></v-checkbox>
                </td>
                <td class="justify-center layout px-0">
                  <v-icon small color="red" @click="openDeleteContributorDialog(props.item.user_id, props.index)">delete</v-icon>
                </td>
              </tr>
            </template>
          </v-data-table>
        </div>

        <!-- Mitwirkender hinzufügen -->
        <v-dialog v-model="searchForNewContributorDialog" persistent max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Mitwirkender hinzufügen</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs11>
                    <v-form ref="searchForUserForm">
                      <v-text-field label="E-Mail Adresse" required
                                    ref="user_email"
                                    v-model="user_email"
                                    :rules="emailRules">
                      </v-text-field>
                    </v-form>
                  </v-flex>
                  <v-flex xs1>
                    <v-btn icon @click="searchForUser()">
                      <v-icon>search</v-icon>
                    </v-btn>
                  </v-flex>

                  <!-- Contributing Options -->
                  <div v-if="showContributorOptions">
                    <v-list three-line subheader>
                      <v-subheader>Nutzerinformationen</v-subheader>
                      <v-list-tile avatar>
                        <v-list-tile-content>
                          <v-list-tile-title>Name / Username</v-list-tile-title>
                          <v-list-tile-sub-title>{{contributingUser.first_name}} {{contributingUser.last_name}} / {{contributingUser.username}}</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                    <v-divider></v-divider>
                    <v-list three-line subheader>
                      <v-subheader>Optionen</v-subheader>
                      <v-list-tile avatar>
                        <v-list-tile-action>
                          <v-checkbox v-model="contributorOptions.play_value"></v-checkbox>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title>Spielen</v-list-tile-title>
                          <v-list-tile-sub-title>Der Nutzer hat die Möglichkeit dein Spiel auch zu spielen</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile avatar>
                        <v-list-tile-action>
                          <v-checkbox v-model="contributorOptions.edit_value"></v-checkbox>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title>Bearbeiten</v-list-tile-title>
                          <v-list-tile-sub-title>Der Nutzer hat die Möglichkeit dein Spiel zu bearbeiten</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile avatar>
                        <v-list-tile-action>
                          <v-checkbox v-model="contributorOptions.delete_value"></v-checkbox>
                        </v-list-tile-action>
                        <v-list-tile-content>
                          <v-list-tile-title>Löschen</v-list-tile-title>
                          <v-list-tile-sub-title>Der Nutzer hat die Möglichkeit dein Spiel zu löschen</v-list-tile-sub-title>
                        </v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  </div>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="searchForNewContributorDialog = false">Zurück</v-btn>
              <v-btn color="blue darken-1" flat :disabled="!userFound" @click="addUserAsContributor()">Speichern</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Mitwirkender löschen -->
        <v-dialog
          v-model="showDeleteContributorDialog"
          max-width="290">
          <v-card>
            <v-card-title class="headline">Wirklich löschen?</v-card-title>
            <v-card-text>Bei Bestätigung wird der Mitwirkende für das Spiel vollständig entfernt!</v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                flat="flat"
                @click="showDeleteContributorDialog = false">
                Abbrechen
              </v-btn>

              <v-btn
                color="error"
                flat="flat"
                @click="deleteUserAsContributor()">
                Löschen
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
        user: null,
        test: true,

        searchForNewContributorDialog: false,
        showContributorOptions: false,
        contributingUser: {},
        userFound: false,
        user_email: "",
        emailRules: [
          email => !!email || 'E-Mail ist ein Pflichtfeld',
          email => /.+@.+/.test(email) || 'E-Mail muss gültig sein'
        ],

        showDeleteContributorDialog: false,
        delete_index: -1,
        user_id_to_delete: -1,

        // Snackbar Data
        showSnackbar: false,
        snackbarTitle: "",
        snackbarColor: "",
        contributorOptions: {},
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
        this.user = globalService.getUser();
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
        // TODO: test case
        if(this.user.email !== this.user_email){
          if(this.$refs.searchForUserForm.validate()){
            userService.searchForUser(this.user_email).then((response) => {
              if(response.success){
                this.initContributorOptions();
                this.showContributorOptions = true;
                this.userFound = true;
                this.contributingUser = response.user;
              } else {
                swal(CONSTANTS.WARNING_NO_USER_FOR_CONTRIBUTOR_TITLE, CONSTANTS.WARNING_NO_USER_FOR_CONTRIBUTOR_BODY, CONSTANTS.WARNING);
                this.searchForNewContributorDialog = false;
              }
            })
          }
        } else {
          swal(CONSTANTS.WARNING_CONTRIBUTOR_SAME_EMAIL_TITLE, CONSTANTS.WARNING_CONTRIBUTOR_SAME_EMAIL_BODY, CONSTANTS.WARNING);
        }
      },
      addUserAsContributor(){
        this.contributorOptions.game_id = this.game.game_id;
        this.contributorOptions.user_id = this.contributingUser.user_id;
        contributorService.addOrUpdateUserAsContributor(this.contributorOptions).then((response) =>{
          if(response.success){
            this.contributorOptions.user = this.contributingUser;
            this.contributorsForGame.push(this.contributorOptions);
            this.showContributorOptions = false;
          } else {
            swal(CONSTANTS.ERROR_ADD_CONTRIBUTOR_TITLE, CONSTANTS.ERROR_ADD_CONTRIBUTOR_BODY, CONSTANTS.ERROR);
          }
        })
      },
      updateContributor(index){
        // TODO: test case
        this.contributorOptions.game_id = this.contributorsForGame[index].game_id;
        this.contributorOptions.user_id = this.contributorsForGame[index].user_id;
        this.contributorOptions.play_value = this.contributorsForGame[index].play_value;
        this.contributorOptions.edit_value = this.contributorsForGame[index].edit_value;
        this.contributorOptions.delete_value = this.contributorsForGame[index].delete_value;
        contributorService.addOrUpdateUserAsContributor(this.contributorOptions).then((response) => {
          if(!response.success){
            swal(CONSTANTS.ERROR_UPDATE_CONTRIBUTOR_TITLE, CONSTANTS.ERROR_UPDATE_CONTRIBUTOR_BODY, CONSTANTS.ERROR);
          }
        })
      },
      openDeleteContributorDialog(user_id_to_delete, index){
        this.showDeleteContributorDialog = true;
        this.user_id_to_delete = user_id_to_delete;
        this.delete_index = index;
      },
      deleteUserAsContributor(){
        // TODO: test case
        contributorService.deleteUserAsContributor(this.user_id_to_delete, this.game.game_id).then((response) => {
          if(response.success){
            this.contributorsForGame.splice(this.delete_index, 1);
          } else {
            swal(CONSTANTS.ERROR_DELETE_CONTRIBUTOR_TITLE, CONSTANTS.ERROR_DELETE_CONTRIBUTOR_BODY, CONSTANTS.ERROR);
          }
        })
      },
      initContributorOptions() {
        this.contributorOptions = {
          game_id: -1,
          user_id: -1,
          play_value: false,
          edit_value: false,
          delete_value: false
        }
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
