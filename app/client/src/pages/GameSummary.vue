<template>
  <div>
    <NavigationBar />
    <v-list two-line subheader>
      <v-subheader inset>Alles zum Spiel</v-subheader>
      <!-- Questions -->
      <CostumListTile icon="help_outline" title="Fragen"
                      subtitle="Anzahl Fragen im Spiel" :count="game_summary.answers_correct + game_summary.answers_wrong"></CostumListTile>
      <CostumListTile icon="done" title="Richtig"
                      subtitle="Davon richtig beantwortet" :count="game_summary.answers_correct"></CostumListTile>
      <CostumListTile icon="close" title="Falsch"
                      subtitle="Davon falsch beantwortet" :count="game_summary.answers_wrong"></CostumListTile>
      <CostumListTile icon="compare_arrows" title="Prozentzahl"
                      subtitle="Prozentual richtig" :count="((game_summary.answers_correct * 100) / (game_summary.answers_correct + game_summary.answers_wrong)).toFixed(2) + ' %'"></CostumListTile>

      <!-- Points -->
      <CostumListTile icon="control_point" title="Punkte"
                      subtitle="Erreichte Punkte" :count="game_summary.reached_score"></CostumListTile>
      <CostumListTile icon="unfold_more" title="Maximale Punkte"
                      subtitle="Maximal erreichbare Punkte" :count="game_summary.maximum_score"></CostumListTile>
      <v-divider inset></v-divider>
      <v-subheader inset>Nutzerinfos</v-subheader>
      <CostumListTile icon="zoom_out_map" title="Spiele gesamt"
                      subtitle="Alle abgeschlossenen Spiele" :count="user.completed_games"></CostumListTile>
      <CostumListTile icon="thumb_up_alt" title="Punkte gesamt"
                      subtitle="Alle erreichten Punkte" :count="user.reached_points"></CostumListTile>
    </v-list>

    <div style="padding: 16px">
      <v-btn block color="primary" @click="saveHighscore()">Spiel abschließen</v-btn>
    </div>
  </div>
</template>

<script>
  import NavigationBar from '../components/NavigationBar';
  import CostumListTile from '../components/CostumListTile';
  import highscoreService from '../services/highscore.service'

  export default {
    name: "GameSummary",
    components: {
      NavigationBar,
      CostumListTile
    },
    data() {
      return {
        game: null,
        game_id: -1,
        game_summary: null,
        user: null
      }
    },
    methods: {
      getRouterData(){
        this.game = this.$route.params.game;
        this.game_id = this.$route.params.game_id;
        this.game_summary = this.$route.params.game_summary;
        this.user = this.$route.params.user;

        this.user.completed_games++;
        this.user.reached_points = this.user.reached_points + this.game_summary.reached_score;
      },
      saveHighscore(){
        highscoreService.saveHighscore(this.game_id, this.user, this.game_summary).then((response) => {
          if(response.success){
            localStorage.setItem('user', JSON.stringify(this.user));
            this.$router.push('/home');
          }
        })
      }
    },
    beforeMount() {
      this.getRouterData();
    }
  }
</script>

<style scoped>

</style>
