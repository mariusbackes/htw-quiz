<template>
  <div>
    <NavigationBar />
    <v-layout row wrap justify-center>
      <v-flex xs12 lg5 mb-3>
        <!-- Code eingeben um beizutreten -->
        <div v-if="!game_enabled">
          <div class="site_padding">
            <v-text-field
              v-model="invitation_code_input"
              label="Code eingeben"
              single-line
              outline>
            </v-text-field>

            <v-btn block color="primary"
                   @click="activateGame()">
              Spiel aktivieren
            </v-btn>
          </div>
        </div>

        <!-- Spiel aktiviert -->
        <div v-if="game_enabled">
          <!-- Code anzeigen -->
          <div class="site_padding">
            <v-text-field p-2 outline label="Code für das Spiel"
                          :placeholder="game.time_frame.invitation_code.toString()" disabled></v-text-field>
          </div>
          <!-- Liste aller beigetretenen Spieler -->
          <div v-if="joined_users.length > 0">
            <v-list subheader>
              <v-subheader inset>Beigetretene Spieler</v-subheader>
              <div v-for="ju in joined_users">
                <v-list-tile ripple>
                  <v-list-tile-content>
                    <v-list-tile-title>{{ju.first_name}} {{ju.last_name}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider inset></v-divider>
              </div>
            </v-list>
          </div>
          <div v-if="joined_users.length === 0">
            <v-alert :value="true" type="info">
              Es sind noch keine Nutzer beigetreten
            </v-alert>
          </div>

          <!-- Ersteller und Admin kann das Spiel starten -->
          <div class="site_padding">
            <v-btn v-if="game.creator === user.user_id"
                   block color="primary"
                   :disabled="joined_users.length === 0"
                   @click="startGame()">
              Spiel starten
            </v-btn>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import NavigationBar from "../components/NavigationBar";
  import swal from 'sweetalert';
  import { CONSTANTS } from "../services/constants";
  import { environment } from "../environment/environment";
  import io from 'socket.io-client';

  export default {
    name: "PrepareChallengedGame",
    components: { NavigationBar },
    data() {
      return {
        socket: null,
        invitation_code_input: "",
        game_enabled: false,
        game_id: -1,
        game: null,
        user: null,
        joined_users: []
      }
    },
    methods: {
      getInfos(){
        this.game_id = this.$route.params.game_id;
        this.game = this.$route.params.game;
        this.user = JSON.parse(localStorage.getItem('user'));

        // Connect to socket
        this.socket = io.connect(environment.socket_url);

        if(this.game.creator === this.user.user_id){
          this.game_enabled = true;
        }
      },
      activateGame(){
        if(this.game.time_frame.invitation_code === parseInt(this.invitation_code_input)){
          this.game_enabled = true;
          let user_data_to_send = {
            user_id: this.user.user_id,
            first_name: this.user.first_name,
            last_name: this.user.last_name
          };
          this.socket.emit('join_game', {
            user: user_data_to_send
          });
        } else {
          swal(CONSTANTS.ERROR_WRONG_INVITATION_CODE_TITLE, CONSTANTS.ERROR_WRONG_INVITATION_CODE_BODY, CONSTANTS.ERROR);
        }
      },
      startGame(){
        this.socket.emit('start_game_for_everyone', {
          game_id: this.game_id,
          game: this.game
        });
      }
    },
    beforeMount() {
      this.getInfos();
    },
    mounted() {
      this.socket.on('user_joined_game', (data) => {
        this.joined_users.push(data.user);
      });
      this.socket.on('starting_the_game', (data) => {
        this.$router.push({name: 'play', params: {game_id: data.game.game_id, game: data.game}});
      });
    }
  }
</script>

<style scoped>
  .site_padding {
    padding: 16px;
  }
</style>
