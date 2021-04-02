import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/Dashboard",
    name: "Dashboard",
    component: () => import("@/views/Dashboard.vue"),
  },
  {
    path: "/Rooms",
    name: "Rooms",
    component: () => import("@/views/Rooms.vue"),
  },
  {
    path: "/Booking",
    name: "Booking",
    component: () => import("@/views/Booking.vue"),
  },
  {
    path: "/Guest",
    name: "Guest",
    component: () => import("@/views/Guest.vue"),
  },
];

const router = new VueRouter({
  //mode: "history",
  //base: process.env.BASE_URL,
  routes,
});

export default router;
