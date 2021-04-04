import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import OpenDoor from "../assets/icon/room.vue";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    // ...
  },
  iconfont: "custom",
  icons: {
    values: {
      OpenDoor: {
        component: OpenDoor,
      },
    },
  },
});
