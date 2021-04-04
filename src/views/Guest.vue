<template>
  <v-main class="main">
    <LeftMenu />
    <TopBar :namePage="pageName" />
    <v-container class="relative top-32 lg:left-20">
      <v-row>
        <v-col cols="12" lg="11">
          <v-data-table
            v-model="selected"
            :headers="headers"
            :items="guests"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            class="elevation-1 guests-table"
            @page-count="pageCount = $event"
            show-select
            item-key="name"
          >
            <template v-slot:item.status="{ item }">
              <v-chip :color="getColor(item.status)" dark>
                {{ item.status }}
              </v-chip>
            </template>
            <template v-slot:item.reservationDate="{ item }">
              <span>{{ item.reservationDate.date }}</span>
              <br />
              <span class="text-gray-500">{{ item.reservationDate.hour }}</span>
            </template>
            <template v-slot:item.room="{ item }">
              {{ item.room.RoomType }}
              <br />
              {{ "#" + item.room.number }}
            </template>
          </v-data-table>
          <div class="text-center pt-2">
            <v-pagination
              color="#1DE9B6"
              v-model="page"
              :length="pageCount"
            ></v-pagination>
            <v-text-field
              :value="itemsPerPage"
              label="Items per page"
              type="number"
              min="-1"
              max="15"
              @input="itemsPerPage = parseInt($event, 10)"
            ></v-text-field>
          </div>
        </v-col>
      </v-row>
    </v-container>
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
      selected: [],
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        {
          text: "Guest",
          align: "start",
          sortable: false,
          value: "guestName",
        },
        { text: "Date Order", value: "reservationDate" },
        { text: "Guest(s)", value: "guestNumber" },
        { text: "Check-in", value: "dateIn" },
        { text: "Check-out", value: "dateOut" },
        { text: "Room", value: "room" },

        { text: "Status", value: "status" },
      ],
    };
  },
  created() {
    console.log(new Date().getHours().toString());
  },
  computed: {
    guests() {
      return this.$store.getters.getBookings;
    },
  },
  methods: {
    getColor(status) {
      if (status === "Booked") return "green";
      if (status === "Pending") return "orange";
      if (status === "Canceled") return "red";
      return "gray";
    },
  },
};
</script>

<style lang="scss">
.main {
  background-color: #f9f9f9;
  height: 100%;
  max-width: 100%;
}
.guests-table {
  background-color: #f4f4f4 !important;
  border-radius: 50px !important;
}
</style>
