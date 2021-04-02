<template>
  <div>
    <LeftMenu />
    <TopBar :namePage="pageName" />
    <v-container class="relative top-32 md:left-20">
      <v-row>
        <v-col>
          <v-card
            class="statistic-card"
            width="370px"
            height="130px"
            color="#29B6F6"
            dark
          >
            <div class="ml-2 d-flex justify-space-between">
              <div>
                <v-card-title class="text-sm-h3 font-weight-bold"
                  >889</v-card-title
                >
                <v-card-subtitle class="text-h6 font-weight-medium">
                  New Booking</v-card-subtitle
                >
              </div>
              <v-avatar class="mt-6 mr-6" size="64" tile>
                <v-img src="../assets/icon/booking (1).png"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
        <v-col>
          <v-card
            class="statistic-card"
            width="370px"
            height="130px"
            color="#00E676"
            dark
          >
            <div class="ml-2 d-flex justify-space-between">
              <div>
                <v-card-title class="text-sm-h3 font-weight-bold"
                  >889</v-card-title
                >
                <v-card-subtitle class="text-h6 font-weight-medium">
                  Schendule Room</v-card-subtitle
                >
              </div>
              <v-avatar class="mt-6 mr-6" size="64" tile>
                <v-img src="../assets/icon/calendar.png"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
        <v-col>
          <v-card
            class="statistic-card"
            width="370px"
            height="130px"
            color="#F0FA4A"
            dark
          >
            <div class="ml-2 d-flex justify-space-between">
              <div>
                <v-card-title class="text-sm-h3 font-weight-bold"
                  >129</v-card-title
                >
                <v-card-subtitle class="text-sm-h6 font-weight-medium">
                  Check-in</v-card-subtitle
                >
              </div>
              <v-avatar class="mt-6 mr-6" size="64" tile>
                <v-img src="../assets/icon/check-in(2).png"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
        <v-col>
          <v-card
            class="statistic-card"
            width="370px"
            height="130px"
            color="#FF6363"
            dark
          >
            <div class="ml-2 d-flex justify-space-between">
              <div>
                <v-card-title class="text-sm-h3 font-weight-bold"
                  >889</v-card-title
                >
                <v-card-subtitle class="text-h6 font-weight-medium">
                  Check-out</v-card-subtitle
                >
              </div>
              <v-avatar class="mt-6 mr-6" size="64" tile>
                <v-img src="../assets/icon/check-out(1).png"></v-img>
              </v-avatar>
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
                <v-col cols="6">
                  <div>
                    <v-card-title class="card-text">Aviable Room </v-card-title>
                    <v-progress-linear
                      height="15px"
                      rounded
                      :value="(100 * aviableRoom) / numberOfRooms"
                      color="#1DE9B6"
                    ></v-progress-linear>
                    <v-card-subtitle class="card-text-subtitle"
                      >Total rooms: {{ numberOfRooms }}</v-card-subtitle
                    >
                    <v-card-text class="text-sm-h4 font-weight-bold">{{
                      aviableRoom
                    }}</v-card-text>
                  </div>
                </v-col>
                <br class="d-md-none d-sm-flex" />
                <v-col cols="6">
                  <div>
                    <v-card-title class="card-text"
                      >Sold Out Room
                    </v-card-title>
                    <v-progress-linear
                      height="15px"
                      rounded
                      :value="(100 * soldOutRoom) / numberOfRooms"
                      color="#FF6363"
                    ></v-progress-linear>
                    <v-card-subtitle class="card-text-subtitle"
                      >Total rooms: {{ numberOfRooms }}</v-card-subtitle
                    >
                    <v-card-text class="text-sm-h4 font-weight-bold">{{
                      soldOutRoom
                    }}</v-card-text>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col
          ><v-card
            color="#F4F4F4"
            class="statistic-card"
            width="433px"
            height="500px"
            ><v-card-title></v-card-title></v-card
        ></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import LeftMenu from "@/components/LeftMenu.vue";
import TopBar from "../components/TopBar.vue";

export default {
  name: "Dashboard",
  components: {
    LeftMenu,
    TopBar,
  },
  data: () => ({
    pageName: "Dashboard",
    aviableRoom: 350,
    numberOfRooms: 1000,
    soldOutRoom: 750,
  }),

  methods: {},
};
</script>

<style lang="scss">
.statistic-card {
  border-radius: 30px !important;
}
.v-card__subtitle {
  color: white !important;
}
.v-progress-linear {
  max-width: 400px;
  margin-left: 15px;
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
