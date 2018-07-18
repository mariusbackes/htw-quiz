<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Einloggen</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form ref="loginForm" lazy-validation>
                <v-text-field type="text" prepend-icon="person" required label="Login"
                              ref="email"
                              v-model="email"
                              :rules="emailRules"></v-text-field>
                <v-text-field type="password" prepend-icon="lock" required label="Password"
                              ref="password"
                              v-model="password"
                              :rules="[() => !!password || 'Passwort ist ein Pflichtfeld']"></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="login()">Login</v-btn>
            </v-card-actions>
          </v-card>

          <!-- Register -->
          <v-layout row justify-center>
            <v-dialog v-model="showRegisterModal" persistent max-width="290">
              <v-btn slot="activator" color="primary" dark>Noch kein Mitglied? Jetzt registrieren!</v-btn>
              <v-card>
                <v-card-title class="headline">Nutzer anlegen</v-card-title>
                <v-card-text>Geben sie alle benötigten Informationen an um ein Nutzerkonto zu erstellen</v-card-text>
                <!-- Inputs -->
                <v-form ref="registerForm" lazy-validation>
                  <v-text-field type="text" prepend-icon="person" label="Username" required
                                ref="username"
                                v-model="username"
                                :rules="[() => !!username || 'Username ist ein Pflichtfeld']"></v-text-field>
                  <v-text-field type="text" prepend-icon="person" label="Vorname" required
                                ref="first_name"
                                v-model="first_name"
                                :rules="[() => !!first_name || 'Vorname ist ein Pflichtfeld']"></v-text-field>
                  <v-text-field type="text" prepend-icon="person" label="Name" required
                                ref="last_name"
                                v-model="last_name"
                                :rules="[() => !!last_name || 'Name ist ein Pflichtfeld']"></v-text-field>
                  <v-text-field type="email" prepend-icon="person" label="E-Mail Adresse" required
                                ref="email"
                                v-model="email"
                                :rules="emailRules"></v-text-field>
                  <v-text-field type="password" prepend-icon="person" label="Passwort" required
                                ref="password"
                                v-model="password"
                                :rules="passwordRules"></v-text-field>
                  <v-text-field type="password" prepend-icon="person" label="Passwort wiederholen" required
                                ref="repeat_password"
                                v-model="repeat_password"
                                :rules="repeatPasswordRules"></v-text-field>
                </v-form>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" flat @click.native="showRegisterModal = false">Abbrechen</v-btn>
                  <v-btn color="green darken-1" flat @click.native="register()">Registrieren</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  import userService from '../services/user.service';

  export default {
    name: "Login",
    data() {
      return {
        // Register-Data
        user_id: null,
        username: null,
        first_name: null,
        last_name: null,
        email: null,
        password: null,
        repeat_password: null,
        showRegisterModal: false,

        // Rules
        emailRules: [
          email => !!email || 'E-mail ist ein Pflichtfeld',
          email => /.+@.+/.test(email) || 'E-mail muss gültig sein'
        ],
        passwordRules: [
          password => !!password || 'Passwort ist ein Pflichtfeld',
          password => !!password && password.length >= 8 || 'Passwort muss mindestens 8 Zeichen enthalten'
        ],
        repeatPasswordRules: [
          repeat_password => !!repeat_password || 'Password wiederholen ist ein Pflichtfeld',
          repeat_password => !!repeat_password && repeat_password.length >= 8 || 'Passwort muss mindestens 8 Zeichen enthalten',
          () => this.password == this.repeat_password || 'Passwörter müssen übereinstimmen'
        ]
      }
    },
    methods: {
      login() {
        if(this.$refs.loginForm.validate()){
          let login_obj = {
            user_id: this.user_id,
            email: this.email,
            password: this.password
          };
          userService.login(login_obj).then((response) => {
            if(response.success){
              this.$router.push('/home');
            } else {
              // TODO: Show error message
            }
          });
        }
      },
      register() {
        if (this.$refs.registerForm.validate()) {
          let user = {
            username: this.username,
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            password: this.password,
          };
          userService.register(user).then((response) => {
            if(response.erfolg){
              this.user.user_id = response.user_id;
              // TODO: Store user in local storage or something like that
            } else {
              // TODO: Show error message
            }
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
