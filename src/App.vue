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
  },
};
</script>
<style></style>
