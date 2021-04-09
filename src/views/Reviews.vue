<template>
  <v-main>
    <LeftMenu />
    <TopBar :namePage="pageName" />
    <v-container class="relative top-32 lg:left-20"
      ><v-row
        ><v-col cols="12" lg="11">
          <v-card class="reviews-card" color="#F4F4F4">
            <v-container>
              <v-row>
                <v-col>
                  <div class="flex">
                    <div>All Reviews</div>
                    <div class="flex justify-end">
                      <div class="mr-2">Sort by:</div>
                      <v-rating
                        class="rating"
                        v-model="rating"
                        color="yellow darken-3"
                        background-color="grey darken-1"
                        hover
                      ></v-rating>
                    </div>
                  </div>
                </v-col>
              </v-row>
              <v-divider />
              <p
                class="mt-8 text-center text-lg"
                v-if="localreviews.length === 0"
              >
                No data found
              </p>
              <v-row
                v-for="(item, key) in displayedPosts"
                :key="key"
                class="mt-2"
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
                <v-col cols="8" md="2" class="flex flex-wrap content-center">
                  <v-btn
                    color="#E53935"
                    @click="deleteReview(item)"
                    rounded
                    dark
                    >Delete</v-btn
                  >
                </v-col>
              </v-row>

              <v-divider class="mt-5" />

              <div class="text-center mt-2">
                <v-pagination
                  v-model="page"
                  :length="pageCount"
                  circle
                ></v-pagination>
              </div>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import LeftMenu from "@/components/LeftMenu.vue";
import TopBar from "@/components/TopBar.vue";
export default {
  name: "Reviews",
  components: {
    LeftMenu,
    TopBar,
  },
  data() {
    return {
      pageName: "Reviews",
      rating: 5,
      page: 1,
      itemsPerPage: 10,
      previousRate: 5,
      localreviews: [],
    };
  },
  mounted() {
    this.$store.dispatch("IMPORT_REVIEWS");
  },
  computed: {
    reviews() {
      return this.$store.getters.getReviews;
    },
    pageCount() {
      return Math.ceil(this.localreviews.length / this.itemsPerPage);
    },
    displayedPosts() {
      return this.paginate(this.localreviews);
    },
  },
  watch: {
    reviews() {
      this.localreviews = this.reviews;
    },
    rating(val) {
      if (val >= this.previousRate)
        this.localreviews.sort((a, b) => {
          if (a.rate > b.rate && val === a.rate) return -1;
          else return 0;
        });
      else {
        this.localreviews.sort((a, b) => {
          if (a.rate < b.rate && val === a.rate) return -1;
          else return 0;
        });
      }
      this.previousRate = val;
    },
  },
  methods: {
    paginate(posts) {
      let page = this.page;
      let perPage = this.itemsPerPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return posts.slice(from, to);
    },
    deleteReview(item) {
      this.$store.dispatch("DELETE_REVIEW", item);
    },
  },
};
</script>

<style>
.main {
  background-color: #f9f9f9;
  height: 100%;
  max-width: 100%;
}
.my-divider {
  margin-left: 0px !important;
}
.v-rating > .v-icon {
  padding: 0px !important;
}
.reviews-card {
  border-radius: 30px !important;
}
</style>
