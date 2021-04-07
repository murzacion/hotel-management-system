import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@/assets/css/tailwind.css";
import firebase from "firebase/app";
import axios from "axios";

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;
var firebaseConfig = {
  apiKey: "AIzaSyCCG9YYOLGhLSXfOQSel9jn5XF4EBMEcNs",
  authDomain: "hotel-app-f8efe.firebaseapp.com",
  projectId: "hotel-app-f8efe",
  storageBucket: "hotel-app-f8efe.appspot.com",
  messagingSenderId: "1054191617440",
  appId: "1:1054191617440:web:f8b19e09b9c8176129d0c5",
  measurementId: "G-0Y0R0Y39H4",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let app;

firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    store.dispatch("IMPORT_BOOKINGS");
    store.dispatch("IMPORT_USERS");
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount("#app");
  } else {
    console.log(user);
  }
});
