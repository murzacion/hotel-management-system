<template>
  <v-main class="main">
    <LeftMenu />
    <TopBar :namePage="pageName" />
  </v-main>
</template>

<script>
import LeftMenu from "@/components/LeftMenu.vue";
import TopBar from "@/components/TopBar.vue";

export default {
  name: "Guest",
  components: {
    LeftMenu,
    TopBar,
  },
  data() {
    return {
      pageName: "Guest",
    };
  },

  methods: {},
};
</script>

<style lang="scss">
.main {
  background-color: #f9f9f9;
  height: 100%;
  max-width: 100%;
}
</style>
