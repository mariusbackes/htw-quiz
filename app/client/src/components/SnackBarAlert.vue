<template>
    <div>
      <v-snackbar
        v-model="showSnackbar"
        :color="color"
        :timeout="timeout">
        {{ text }}
        <v-btn
          dark
          flat
          @click="showSnackbar = false">
          Schließen
        </v-btn>
      </v-snackbar>
    </div>
</template>

<script>
    export default {
      name: "SnackBarAlert",
      props: ['color', 'text'],
      data(){
        return {
          showSnackbar: true,
          timeout: 3000
        }
      }
    }
</script>

<style scoped>

</style>
