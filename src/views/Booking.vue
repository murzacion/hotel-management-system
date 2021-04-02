<template>
  <v-main><LeftMenu :change="change" :selected="selected" /> </v-main>
</template>

<script>
import LeftMenu from "@/components/LeftMenu.vue";

export default {
  name: "Booking",
  components: {
    LeftMenu,
  },
  data: () => ({
    selected: 2,
  }),

  methods: {
    change(i) {
      this.selected = i;
      if (i === 0) this.$router.push({ name: "Dashboard" });
      if (i === 1) this.$router.push({ name: "Rooms" });
      if (i === 3) this.$router.push({ name: "Guest" });
    },
  },
};
</script>

<style></style>
