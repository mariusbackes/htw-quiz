<template>
  <div>
    <v-card flat>
      <v-card-text>
        <v-layout row wrap justify-center>
          <v-flex xs12 lg5 mb-3>
            <v-expansion-panel popout>
              <v-expansion-panel-content>
                <!-- E-Mail Adresse ändern -->
                <div slot="header">E-Mail adresse ändern</div>
                <div class="text-xs-center">
                  <div class="element-padding">
                    <v-layout row wrap>
                      <v-flex >
                        <v-text-field p-2 outline label="Aktuelle E-Mail Adresse" :placeholder="user.email" disabled></v-text-field>
                      </v-flex>
                    </v-layout>
                  </div>

                  <div class="element-padding">
                    <v-layout row wrap>
                      <v-flex>
                        <v-form v-model="changeEmailFormValid">
                          <v-text-field p-2 outline label="Neue E-Mail Adresse" v-model="new_email" :rules="emailRules" required></v-text-field>
                        </v-form>
                      </v-flex>
                    </v-layout>
                  </div>

                  <div>
                    <v-btn color="primary" @click="changeEmail()" :disabled="!changeEmailFormValid">
                      Änderung speichern
                    </v-btn>
                  </div>
                </div>
              </v-expansion-panel-content>

              <!-- Username ändern -->
              <v-expansion-panel-content>
                <div slot="header">Username ändern</div>
                <div class="text-xs-center">
                  <div class="element-padding">
                    <v-layout row wrap>
                      <v-flex >
                        <v-text-field p-2 outline label="Aktueller Username" :placeholder="user.username" disabled></v-text-field>
                      </v-flex>
                    </v-layout>
                  </div>

                  <div class="element-padding">
                    <v-layout row wrap>
                      <v-flex>
                        <v-text-field p-2 outline label="Neuer Username" v-model="new_username" required ></v-text-field>
                      </v-flex>
                    </v-layout>
                  </div>

                  <div>
                    <v-btn color="primary" @click="changeUsername()" :disabled="new_username.length == 0">
                      Änderung speichern
                    </v-btn>
                  </div>
                </div>
              </v-expansion-panel-content>

              <!-- Benutzer löschen -->
              <v-expansion-panel-content>
                <div slot="header">Benutzer löschen</div>
                <v-flex xs12 sm6 offset-sm3>
                  <v-card>
                    <v-card-title class="headline">Benutzer löschen</v-card-title>
                    <v-card-text>Nach Bestätigung wird der Nutzer dauerhaft gelöscht! Alle erstellten Fragekataloge und Freigaben für andere Nutzer werden ebenfalls entfernt</v-card-text>
                    <v-card-actions>
                      <v-btn flat color="error" @click="showDeleteUserDialog = true">Benutzer löschen</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>

    <v-dialog
      v-model="showDeleteUserDialog"
      max-width="290">
      <v-card>
        <v-card-title class="headline">Wirklich löschen?</v-card-title>
        <v-card-text>Bei Bestätigung wird der Nutzer gelöscht. Diese Aktion lässt sich nicht rückgängig machen</v-card-text>

        <v-form ref="confirmPasswordForm" lazy-validation>
          <v-text-field type="password" prepend-icon="security" label="Passwort eingeben" required
                        v-model="confirm_password"
                        :rules="confirm_passwordRules"></v-text-field>
        </v-form>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat="flat"
            @click="showDeleteUserDialog = false">
            Abbrechen
          </v-btn>

          <v-btn
            color="error"
            flat="flat"
            @click="deleteUser()">
            Löschen
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  // Services
  import userService from '../../services/user.service';
import { CONSTANTS } from '../../services/constants';

  export default {
    name: "UserData",
    data(){
      return {
        user: {},
        // E-Mail managament
        new_email: "",
        changeEmailFormValid: false,
        emailRules: [
          v => !!v || 'E-Mail ist ein Pflichtfeld',
          v => /.+@.+/.test(v) || 'E-Mail muss gültig sein'
        ],
        // Username management
        new_username: "",
        // Delete User management
        showDeleteUserDialog: false,
        confirm_password: "",
        confirm_passwordRules: [
          password => !!password || 'Passwort ist ein Pflichtfeld',
          password => !!password && password.length >= 8 || 'Passwort muss mindestens 8 Zeichen enthalten'
        ],
      }
    },
    methods: {
      getUserData() {
        this.user = JSON.parse(localStorage.getItem('user'));
      },
      changeUsername() {
        userService.changeUsername(this.user, this.new_username).then((response) => {
          if(response.success){
            this.user.username = this.new_username;
            this.storeUser();
            swal(CONSTANTS.SUCCESS_EDIT_USERNAME_TITLE, CONSTANTS.SUCCESS_EDIT_USERNAME_BODY, CONSTANTS.SUCCESS);
          }
        })
      },
      changeEmail() {
        userService.changeEmail(this.user, this.new_email).then((response) => {
          if(response.success){
            this.user.email = this.new_email;
            this.storeUser();
            swal(CONSTANTS.SUCCESS_EDIT_MAIL_TITLE,CONSTANTS.SUCCESS_EDIT_MAIL_BODY, CONSTANTS.SUCCESS);
          }
        })
      },
      deleteUser() {
        this.showDeleteUserDialog = false;
        if (this.$refs.confirmPasswordForm.validate()) {
          userService.deleteUser(this.user, this.confirm_password).then(response => {
            if(response.success){
              localStorage.removeItem('user');
              swal("User erfolgreich gelöscht");
              this.$router.push('/');
            }
          })
        }
      },
      storeUser(){
        localStorage.setItem('user', JSON.stringify(this.user));
      }
    },
    mounted() {
      this.getUserData();
    }
  }
</script>

<style scoped>
  .element-padding {
    padding: 5px 10px 5px 10px;
  }
</style>
