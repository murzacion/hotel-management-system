<template>
  <v-card
    color="#F4F4F4"
    class="statistic-card w-screen 2xl:w-96 h-96 2xl:h-full"
  >
    <div class="flex flex-row">
      <v-card-title>Guests List</v-card-title>
      <v-spacer></v-spacer>
      <v-btn class="relative top-4" color="#1DE9B6" to="/Guests" text
        >More</v-btn
      >
    </div>
    <v-list subheader>
      <v-list-item v-for="(item, i) in displayedPosts" :key="i">
        <v-list-item-avatar color="#1DE9B6">
          <v-icon dark> mdi-account-circle </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="item.guestName"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: "PreviewGuestsList",
  data() {
    return { displayedPosts: [] };
  },
  beforeCreate() {
    this.$store.dispatch("IMPORT_BOOKINGS");
  },
  computed: {
    bookings() {
      return this.$store.getters.getBookings;
    },
  },
  watch: {
    bookings() {
      this.displayedPosts = this.bookings.slice(this.bookings.length - 10);
    },
  },
};
</script>

<style></style>
