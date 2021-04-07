<template>
  <div>
    <LeftMenu />
    <TopBar :namePage="pageName" />
    <v-container class="relative top-32 lg:left-20">
      <v-row>
        <v-col cols="12" sm="6" lg="3">
          <v-card
            class="statistic-card"
            width="370px"
            height="130px"
            color="#29B6F6"
            dark
          >
            <div class="ml-2 d-flex justify-space-between">
              <div>
                <v-card-title class="text-sm-h4 font-weight-bold">{{
                  numberOfBookings
                }}</v-card-title>
                <v-card-subtitle class="text-h6 font-weight-medium">
                  Bookings</v-card-subtitle
                >
              </div>
              <v-icon class="mr-6" size="64">mdi-beaker-check-outline</v-icon>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" lg="3">
          <v-card
            class="statistic-card"
            width="370px"
            height="130px"
            color="#00E676"
            dark
          >
            <div class="ml-2 d-flex justify-space-between">
              <div>
                <v-card-title class="text-sm-h4 font-weight-bold">{{
                  numberOfSchedule
                }}</v-card-title>
                <v-card-subtitle class="text-h6 font-weight-medium">
                  Schedule Rooms</v-card-subtitle
                >
              </div>
              <v-icon class="mr-6" size="64">mdi-calendar-clock-outline</v-icon>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" lg="3">
          <v-card
            class="statistic-card"
            width="370px"
            height="130px"
            color="#F0FA4A"
            dark
          >
            <div class="ml-2 d-flex justify-space-between">
              <div>
                <v-card-title class="text-sm-h4 font-weight-bold">{{
                  numberOfCheckin
                }}</v-card-title>
                <v-card-subtitle class="text-h6 font-weight-medium">
                  Check-in</v-card-subtitle
                >
              </div>
              <v-icon class="mr-6" size="64">mdi-account-arrow-left</v-icon>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" lg="3">
          <v-card
            class="statistic-card"
            width="370px"
            height="130px"
            color="#FF6363"
            dark
          >
            <div class="ml-2 d-flex justify-space-between">
              <div>
                <v-card-title class="text-sm-h4 font-weight-bold">{{
                  numberOfCheckout
                }}</v-card-title>
                <v-card-subtitle class="text-h6 font-weight-medium">
                  Check-out</v-card-subtitle
                >
              </div>
              <v-icon class="mr-6" size="64">mdi-account-arrow-right</v-icon>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-card
            class="statistic-card rooms-aviable"
            min-height="100px"
            width="1200px"
            color="#F4F4F4"
          >
            <v-container class="">
              <v-row>
                <v-col cols="10" md="5">
                  <div>
                    <v-card-title class="card-text"
                      ><span class="text-base md:text-xl">Available Room</span>
                    </v-card-title>
                    <v-progress-linear
                      class="ml-3"
                      height="15px"
                      rounded
                      :value="(100 * availableRooms) / numberOfRooms"
                      color="#1DE9B6"
                    ></v-progress-linear>
                    <v-card-subtitle class="card-text-subtitle"
                      >Total rooms: {{ numberOfRooms }}</v-card-subtitle
                    >
                    <v-card-text class="text-sm-h5 font-weight-bold">{{
                      availableRooms
                    }}</v-card-text>
                  </div>
                </v-col>

                <v-col class="md:ml-24" cols="10" md="5">
                  <div class="">
                    <v-card-title class="card-text"
                      ><span class="text-base md:text-xl">Available Room</span>
                    </v-card-title>
                    <v-progress-linear
                      class="ml-3"
                      height="15px"
                      rounded
                      :value="(100 * soldOutRoom) / numberOfRooms"
                      color="#FF6363"
                    ></v-progress-linear>
                    <v-card-subtitle class="card-text-subtitle"
                      >Total rooms: {{ numberOfRooms }}</v-card-subtitle
                    >

                    <v-card-text class="text-sm-h5 font-weight-bold">{{
                      soldOutRoom
                    }}</v-card-text>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
          <PreviewReviewCard />
        </v-col>
        <v-col><PreviewGuestsList /></v-col>
      </v-row>
      <v-row>
        <v-col></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LeftMenu from "@/components/LeftMenu.vue";
import TopBar from "@/components/TopBar.vue";
import PreviewReviewCard from "@/components/PreviewReviewCard.vue";
import PreviewGuestsList from "@/components/PreviewGuestsList.vue";

export default {
  name: "Dashboard",
  components: {
    LeftMenu,
    TopBar,
    PreviewReviewCard,
    PreviewGuestsList,
  },
  data() {
    return {
      pageName: "Dashboard",
    };
  },
  computed: {
    availableRooms() {
      return this.$store.getters.getAvailableRooms.length;
    },
    numberOfRooms() {
      return this.$store.getters.getRooms.length;
    },
    soldOutRoom() {
      return this.$store.getters.getBookedRooms.length;
    },
    bookings() {
      return this.$store.getters.getBookings;
    },
    numberOfBookings() {
      return this.bookings.length;
    },
    numberOfSchedule() {
      return this.getnNumberOfSchedule();
    },
    numberOfCheckin() {
      return this.getNumberOfCheckin();
    },
    numberOfCheckout() {
      return this.getNumberOfCheckout();
    },
  },

  methods: {
    getnNumberOfSchedule() {
      let b = this.bookings;
      var nr = 0;
      b.forEach((element) => {
        var dateIn = element.dateIn;
        if (new Date(dateIn) < new Date()) nr++;
      });
      return nr;
    },
    getNumberOfCheckin() {
      let b = this.bookings;
      var nr = 0;
      b.forEach((element) => {
        var dateIn = element.dateIn;
        var dateOut = element.dateOut;
        if (new Date(dateIn) >= new Date() && new Date(dateOut) > new Date())
          nr++;
      });
      return nr;
    },
    getNumberOfCheckout() {
      let b = this.bookings;
      var nr = 0;
      b.forEach((element) => {
        var dateOut = element.dateOut;
        if (new Date(dateOut) <= new Date()) nr++;
      });
      return nr;
    },
  },
};
</script>

<style lang="scss">
.statistic-card {
  border-radius: 30px !important;
}
.v-card__subtitle {
  color: white !important;
}

.rooms-aviable {
  padding-left: 20px;
}
.card-text {
  padding-bottom: 5px;
  padding-top: 0px;
}
.card-text-subtitle {
  padding-top: 5px;
  color: #504f4f !important;
}
.v-divider--vertical {
  height: 20px;
  margin-top: 5px !important;
  height: 90px !important;
}
</style>
