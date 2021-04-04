import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { rooms: [], bookings: [] },
  getters: {
    getRooms: (state) => {
      return state.rooms;
    },
    getAvailableRooms: (state) => {
      return state.rooms.filter((x) => x.isAvailable === true);
    },
    getBookedRooms: (state) => {
      return state.rooms.filter((x) => !x.isAvailable);
    },
  },
  mutations: {
    importRooms(state, value) {
      state.rooms.push(value);
    },
    deleteRoom(state, value) {
      state.rooms.splice(value, 1);
    },
    importBookings(state, value) {
      state.bookings.push(value);
    },
  },
  actions: {
    async IMPORT_ROOMS({ commit, state }) {
      state.rooms = [];
      const cityRef = firebase.firestore().collection("Rooms");
      const doc = await cityRef.get();
      doc.forEach((x) => {
        commit("importRooms", {
          id: x.id,
          RoomType: x.data().RoomType,
          capacity: x.data().capacity,
          number: x.data().number,
          floor: x.data().floor,
          price: x.data().price,
          facilities: x.data().facilities,
          bedType:
            x.data().facilities.bed === true ? "Single Bed" : "Double Bed",
          isAvailable: x.data().isAvailable,
          images: x.data().images,
          description: x.data().description,
        });
      });
    },
    IMPORT_BOOKINGS({ commit }) {
      commit("importBookings");
    },
    async DELETE_ROOM({ commit }, { id, index }) {
      commit("deleteRoom", index);
      firebase.firestore().collection("Rooms").doc(id).delete();
      var storage = firebase.storage();
      var storageRef = storage.ref("Rooms").child(`/${id}/`);
      await storageRef
        .listAll()
        .then((res) => {
          res.items.forEach((itemRef) => {
            itemRef.delete();
            // All the items under listRef.
          });
        })
        .catch((error) => {
          console.log(error);
          // Uh-oh, an error occurred!
        });
    },
  },
  modules: {},
});
