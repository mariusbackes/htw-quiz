<template>
  <div class="text-xs-center">
    <div class="element-padding">
      <v-form ref="changePasswordForm">
        <!-- Aktuelles Passwort -->
        <v-layout row wrap>
          <v-flex >
            <v-text-field p-2 outline label="Aktuelles Passwort"
                          v-model="actual_password"
                          ref="actual_password"
                          :rules="changePasswordRules" required></v-text-field>
          </v-flex>
        </v-layout>

        <!-- Neues Passwort -->
        <v-layout row wrap>
          <v-flex>
            <v-text-field p-2 outline label="Neues Passwort"
                          v-model="new_password"
                          ref="new_password"
                          :rules="changePasswordRules" required></v-text-field>
          </v-flex>
        </v-layout>

        <!-- Neues Passwort bestätigen -->
        <v-layout row wrap>
          <v-flex>
            <v-text-field p-2 outline label="Neues Passwort bestätigen"
                          v-model="new_password_confirm"
                          ref="new_password_confirm"
                          :rules="changePasswordRules" required></v-text-field>
          </v-flex>
        </v-layout>
      </v-form>
    </div>

    <div>
      <v-btn color="primary" @click="changePassword()">
        Neues Passwort speichern
      </v-btn>
    </div>
  </div>
</template>

<script>
  import globalService from '../../services/global.service';
  import userService from '../../services/user.service';

  export default {
    name: "UserChangePassword",
    data(){
      return {
        user: {},
        actual_password: "",
        new_password: "",
        new_password_confirm: "",
        changePasswordRules: [
          actual_password => !!actual_password || 'Aktuelles Passwort ist ein Pflichtfeld',
          actual_password => !!actual_password && actual_password.length >= 8 || 'Das aktuelle Passwort muss mindestens 8 Zeichen enthalten',
          new_password => !!new_password || 'Neues Passwort ist ein Pflichtfeld',
          new_password => !!new_password && new_password.length >= 8 || 'Das neue Passwort muss mindestens 8 Zeichen enthalten',
          new_password_confirm => !!new_password_confirm || 'Neues Passwort wiederholen ist ein Pflichtfeld',
          new_password_confirm => !!new_password_confirm && new_password_confirm.length >= 8 || 'Das neue Passwort muss mindestens 8 Zeichen enthalten',
          (actual_password) => actual_password != this.user.password || 'Aktuelle Passwörter müssen übereinstimmen',
          (new_password,new_password_confirm) => new_password != new_password_confirm || 'Neue Passwörter müssen übereinstimmen'
        ]
      }
    },
    methods: {
      getUserData() {
        this.user = globalService.getUser();
      },
      changePassword() {
        if (this.$refs.changePasswordForm.validate()) {
          userService.changePassword(this.user, this.actual_password, this.new_password).then(response => {
            if(response.success){
              this.user.password = this.new_password;
              localStorage.setItem('user', JSON.stringify(this.user));
              globalService.setUser(this.user);
            }
          })
        }
      }
    },
    mounted() {
      this.getUserData();
    }
  }
</script>

<style scoped>

</style>
