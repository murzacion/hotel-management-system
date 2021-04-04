<template>
  <div class="invisible lg:visible left-menu">
    <v-card class="ml-3 mt-4" height="950px" max-width="120px">
      <v-navigation-drawer color="#E8F5E9" permanent>
        <v-list>
          <v-list-item-group class="mt-16" color="#1de9b6" mandatory>
            <v-list-item
              v-for="(item, key) in items"
              :key="key"
              class="list-item flex-column"
              :to="item.route"
            >
              <v-list-item-icon>
                <v-icon size="42"> {{ item.icon }} </v-icon>
              </v-list-item-icon>
              <v-list-item-content class="text-h6">
                {{ item.name }}
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "LeftMenu",
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
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.left-menu {
  float: left;
  position: fixed;
  max-width: 120px;
  z-index: 1;
}
.v-card {
  border-radius: 50px !important;
  border: none !important;
}
.v-list-item__content {
  padding: 0 !important;
}

.v-list-item__icon {
  margin: auto !important;
}
.list-item {
  border-radius: 100px;
}
.list-item::before {
  border-radius: 100px;
  background-color: white !important;
}
#nav a.router-link-exact-active {
  color: #42b983 !important;
}
</style>
