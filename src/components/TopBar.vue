<template>
  <div class="fixed top-3 left-2 w-full right-8 md:left-32 md:w-11/12 z-10">
    <v-app-bar class="" height="100px" max-height="100px" color="#E0F2F1">
      <v-menu right bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="visible lg:invisible" icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(n, i) in items" :key="i" :to="n.route">
            <v-list-item-title> {{ n.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-toolbar-title class="toolbar-title">{{ namePage }}</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "TopBar",
  props: {
    namePage: String,
  },
  data: () => ({
    items: [
      {
        icon: "mdi-view-dashboard-outline",
        name: "Dashborad",
        route: "Dashboard",
      },
      { icon: "mdi-door-open", name: "Room", route: "Rooms" },
      {
        icon: "mdi-calendar-month-outline ",
        name: "Booking",
        route: "Booking",
      },
      {
        icon: "mdi-account-multiple-check-outline",
        name: "Guest",
        route: "Guest",
      },
    ],
  }),
};
</script>

<style>
.top-bar {
  width: calc(100% - 8.5rem) !important;
}
.v-toolbar {
  border-radius: 50px !important;
}
.toolbar-title {
  font-size: 40px !important;
  font-weight: 600;
  color: #757575;
}
</style>
