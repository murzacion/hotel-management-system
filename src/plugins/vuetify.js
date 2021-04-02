import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import OpenDoor from "../assets/icon/room.vue";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    // ...
  },
  iconfont: "mdi",
  icons: {
    values: {
      OpenDoor: {
        component: OpenDoor,
        props: {
          name: "open-door",
        },
      },
    },
  },
});
