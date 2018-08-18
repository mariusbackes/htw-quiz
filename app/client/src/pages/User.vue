<template>
  <div>
    <NavigationBar />
    <v-tabs centered icons-and-text>
      <v-tabs-slider color="blue"></v-tabs-slider>

      <v-tab href="#tab-1">
        Benutzerinfo
        <v-icon>info</v-icon>
      </v-tab>

      <v-tab href="#tab-2">
        Benutzerdaten
        <v-icon>face</v-icon>
      </v-tab>

      <v-tab href="#tab-3">
        Passwort
        <v-icon>security</v-icon>
      </v-tab>

      <!-- Allgemeine Informationen zum Benutzer -->
      <v-tab-item id="tab-1">
        <UserInfo />
      </v-tab-item>

      <!-- Änderung von Namen oder E-Mail Adresse -->
      <v-tab-item id="tab-2">
        <UserData />
      </v-tab-item>

      <!-- Passwort ändern -->
      <v-tab-item id="tab-3">
        <UserChangePassword />
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
  // Components
  import NavigationBar from '../components/NavigationBar';
  import UserInfo from '../components/user_management/UserInfo';
  import UserData from '../components/user_management/UserData';
  import UserChangePassword from '../components/user_management/UserChangePassword';

  export default {
    name: "User",
    components: {
      NavigationBar,
      UserInfo,
      UserData,
      UserChangePassword
    },
    data(){
      return {
        user: {}
      }
    },
    methods: {
      getUserData() {
        this.user = JSON.parse(localStorage.getItem('user'));
      }
    },
    mounted() {
      this.getUserData();
    }
  }
</script>

<style scoped>

</style>
