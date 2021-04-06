<template>
  <div class="mt-4">
    <v-card
      color="#F4F4F4"
      class="statistic-card"
      min-height="470px"
      width="1200px"
    >
      <div class="flex flex-row">
        <v-card-title>Preview reviews</v-card-title>
        <v-spacer></v-spacer>
        <v-btn class="relative top-4" color="#1DE9B6" to="/Reviews" text
          >More</v-btn
        >
      </div>
      <v-divider></v-divider>
      <v-container>
        <v-row
          v-for="(item, key) in displayedPosts"
          :key="key"
          :class="key % 2 !== 0 ? 'bg-gray-200' : ''"
        >
          <v-col cols="8" md="3">
            <div class="space-x-2 space-y-2">
              <div class="ml-2"></div>
              <div class="text-black text-xl font-medium">
                {{ item.guestName }}
              </div>
              <div>
                <v-icon
                  v-for="i in 5"
                  :key="i"
                  :color="i <= item.rate ? '#f9a825' : ''"
                  >mdi-star</v-icon
                >
              </div>
              <div class="text-gray-600">
                Posted on {{ item.reviewDate.date }}
              </div>
            </div>
          </v-col>
          <v-col cols="7">
            <div>
              {{ item.description }}
            </div>
          </v-col>
        </v-row></v-container
      ></v-card
    >
  </div>
</template>

<script>
export default {
  name: "PreviewReviewCard",
  data() {
    return { displayedPosts: [] };
  },
  beforeCreate() {
    this.$store.dispatch("IMPORT_REVIEWS");
  },
  computed: {
    reviews() {
      return this.$store.getters.getReviews;
    },
  },
  watch: {
    reviews() {
      this.displayedPosts = this.reviews.slice(this.reviews.length - 3);
    },
  },
};
</script>

<style></style>
