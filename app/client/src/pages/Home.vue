<template>
  <div>
    <NavigationBar />
    <!-- TODO: check why event is just fired once -->
    <GamePlay />
  </div>
</template>

<script>
  import NavigationBar from '../components/NavigationBar';
  import GamePlay from "../components/game_management/GamePlay";

  export default {
    name: 'Home',
    components: {
      GamePlay,
      NavigationBar
    },
    data () {
      return {

      }
    }
  }
</script>

<style scoped>

</style>
