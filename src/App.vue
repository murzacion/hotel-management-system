<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
  created() {
    this.$store.dispatch("IMPORT_ROOMS");
    this.$store.dispatch("IMPORT_BOOKINGS");
  },
};
</script>
<style>
.v-btn {
  outline: none !important;
}
</style>
