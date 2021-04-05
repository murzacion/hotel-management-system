<template>
  <div class="fixed top-3 left-2 w-12/12 right-8 lg:left-32 lg:w-11/12 z-10">
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
      <v-spacer></v-spacer>
      <div class="flex-col mr-4">
        <div>{{ email }}</div>
        <div><v-btn @click="logout" text>Log out</v-btn></div>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
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
    email: "",
  }),
  created() {
    this.email = firebase.auth().currentUser.email;
    console.log(this.email);
  },
  methods: {
    logout() {
      firebase.auth().signOut();
      console.log(firebase.auth().currentUser);
      this.$router.replace({ name: "Login" });
    },
  },
};
</script>

<style>
.top-bar {
  width: calc(100% - 8.5rem) !important;
}
.v-toolbar {
  border-radius: 30px !important;
}
.toolbar-title {
  font-size: 30px !important;
  font-weight: 500;
  color: #757575;
}
</style>
