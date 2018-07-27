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
                <div class="element-padding">
                  <v-layout row wrap>
                    <v-flex xs12 sm6 md3>
                      <v-text-field p-2 outline label="Aktuelle E-Mail Adresse" :placeholder="user.email" disabled></v-text-field>
                    </v-flex>
                  </v-layout>
                </div>

                <div class="element-padding">
                  <v-layout row wrap>
                    <v-flex xs12 sm6 md3>
                      <v-form v-model="changeEmailFormValid">
                        <v-text-field p-2 outline label="Neue E-Mail Adresse" v-model="new_email" :rules="emailRules" required></v-text-field>
                      </v-form>
                    </v-flex>
                  </v-layout>
                </div>

                <div class="text-xs-center">
                  <v-btn color="primary" @click="changeEmail()" :disabled="!changeEmailFormValid">
                    Änderung speichern
                  </v-btn>
                </div>
              </v-expansion-panel-content>

              <!-- Username ändern -->
              <v-expansion-panel-content>
                <div slot="header">Username ändern</div>
              </v-expansion-panel-content>

              <!-- Benutzer löschen -->
              <v-expansion-panel-content>
                <div slot="header">Benutzer löschen</div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  // Services
  import globalService from '../../services/global.service';
  import userService from '../../services/user.service';

  export default {
    name: "UserData",
    data(){
      return {
        user: {},
        new_email: "",
        changeEmailFormValid: false,
        emailRules: [
          v => !!v || 'E-Mail ist ein Pflichtfeld',
          v => /.+@.+/.test(v) || 'E-Mail muss gültig sein'
        ]
      }
    },
    methods: {
      getUserData() {
        this.user = globalService.getUser();
      },
      changeUsername() {
        // TODO: Implement
      },
      changeEmail() {
        userService.changeEmail(this.user, this.new_email).then((response) => {
          if(response.success){
            this.user.email = this.new_email;
            localStorage.setItem('user', JSON.stringify(this.user));
            globalService.setUser(this.user);
          }
        })
      },
      deleteUser() {
        // TODO: Implement
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
