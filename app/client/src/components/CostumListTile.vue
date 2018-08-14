<template>
  <v-list-tile>
    <v-list-tile-avatar>
      <v-icon>{{icon}}</v-icon>
    </v-list-tile-avatar>

    <v-list-tile-content>
      <v-list-tile-title>{{ title }}</v-list-tile-title>
      <v-list-tile-sub-title>{{ subtitle }}</v-list-tile-sub-title>
    </v-list-tile-content>

    <v-list-tile-action style="text-align: center">
      {{count}}
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
  export default {
    name: "CostumListTile",
    props: ['icon', 'title', 'subtitle', 'count'],
  }
</script>

<style scoped>

</style>
