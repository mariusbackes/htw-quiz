<template>
  <div>
    <v-card flat>
      <v-card-text>
        <v-layout row wrap justify-center>
          <v-flex xs12 lg5 mb-3>
            <v-list two-line subheader>
              <v-subheader inset>Benutzerinformationen</v-subheader>

              <v-list-tile
                avatar>
                <v-list-tile-avatar>
                  <v-icon>face</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Benutzername</v-list-tile-title>
                  <v-list-tile-sub-title>{{user.username}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                avatar>
                <v-list-tile-avatar>
                  <v-icon>contacts</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Vorname</v-list-tile-title>
                  <v-list-tile-sub-title>{{user.first_name}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                avatar>
                <v-list-tile-avatar>
                  <v-icon>contacts</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Name</v-list-tile-title>
                  <v-list-tile-sub-title>{{user.last_name}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                avatar>
                <v-list-tile-avatar>
                  <v-icon>alternate_email</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>E-Mail Adresse</v-list-tile-title>
                  <v-list-tile-sub-title>{{user.email}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile
                avatar>
                <v-list-tile-avatar>
                  <v-icon>access_time</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Angemeldet seit</v-list-tile-title>
                  <v-list-tile-sub-title>{{user.registered_at}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-divider inset></v-divider>
              <v-subheader inset>Spielinformationen</v-subheader>

              <v-list-tile
                avatar>
                <v-list-tile-avatar>
                  <v-icon>games</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Absolvierte Spiele</v-list-tile-title>
                  <v-list-tile-sub-title>{{user.completed_games}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-avatar>
                  <v-icon>timeline</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>Erreichte Punkte</v-list-tile-title>
                  <v-list-tile-sub-title>{{user.reached_points}}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    name: "UserInfo",
    data(){
      return {
        user: {}
      }
    },
    methods: {
      getUserData() {
        this.user =JSON.parse(localStorage.getItem('user'));
      }
    },
    mounted() {
      this.getUserData();
    }
  }
</script>

<style scoped>

</style>
