import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { rooms: [] },
  getters: {
    getRooms: (state) => {
      return state.rooms;
    },
  },
  mutations: {
    importRooms(state, value) {
      console.log(value);
      state.rooms.push(value);
    },
  },
  actions: {
    async IMPORT_ROOMS({ commit }) {
      const cityRef = firebase.firestore().collection("Rooms");
      const doc = await cityRef.get();
      doc.forEach((x) => {
        console.log("Document data:");
        commit("importRooms", {
          id: x.id,
          RoomType: x.data().RoomType,
          capacity: x.data().capacity,
          number: x.data().number,
          floor: x.data().floor,
          price: x.data().price,
          facilities: x.data().facilities,
          bedType: x.data().facilities.bed ? "Single Bed" : "Double Bed",
          isAvailable: x.data().isAvailable,
          images: x.data().images,
          description: x.data().description,
        });
      });
    },
  },
  modules: {},
});
