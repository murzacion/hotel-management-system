import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";
import "firebase/auth";

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
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/Rooms",
    name: "Rooms",
    component: () => import("@/views/Rooms.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/Bookings",
    name: "Bookings",
    component: () => import("@/views/Bookings.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/Guests",
    name: "Guests",
    component: () => import("@/views/Guests.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/Reviews",
    name: "Reviews",
    component: () => import("@/views/Reviews.vue"),
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({ name: "Login" });
    } else {
      next();
    }
  } else {
    next();
  }
});
export default router;
