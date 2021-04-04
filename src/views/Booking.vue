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
            :items="bookings"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            class="elevation-1 booking-table"
            @page-count="pageCount = $event"
            show-select
            item-key="name"
          ></v-data-table>
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
  name: "Booking",
  components: {
    LeftMenu,
    TopBar,
  },
  data() {
    return {
      pageName: "Booking",
      selected: [],
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
      headers: [
        {
          text: "Booking no.",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Guest Name", value: "guestName" },
        { text: "Guest(s)", value: "guestNumber" },
        { text: "Room Number", value: "room.number" },
        { text: "Check-in", value: "dateIn" },
        { text: "Check-out", value: "dateOut" },
        { text: "Total", value: "price" },
      ],
    };
  },

  computed: {
    bookings() {
      return this.$store.getters.getBookings;
    },
  },
  methods: {},
};
</script>

<style>
.main {
  background-color: #f9f9f9;
  height: 100%;
  max-width: 100%;
}
.booking-table {
  background-color: #f4f4f4 !important;
  border-radius: 50px !important;
}
</style>
