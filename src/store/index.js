import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { rooms: [], bookings: [], reviews: [] },
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
    getBookings: (state) => {
      return state.bookings;
    },
    getReviews: (state) => {
      return state.reviews;
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
    importReviews(state, value) {
      state.reviews.push(value);
    },
  },
  actions: {
    async IMPORT_ROOMS({ commit, state }) {
      state.rooms = [];
      const roomRef = firebase.firestore().collection("Rooms");
      const doc = await roomRef.get();
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
    async IMPORT_BOOKINGS({ commit }) {
      const bookingRef = firebase.firestore().collection("Bookings");
      const doc = await bookingRef.get();
      doc.forEach((x) => {
        commit("importBookings", {
          id: x.id,
          guestName:
            x.data().reservationData.userData.firstName +
            " " +
            x.data().reservationData.userData.lastName,
          guestNumber: x.data().reservationData.people,
          room: x.data().reservationData.room,
          reservationDate: {
            date: x
              .data()
              .reservationData.dates.reservationDate.toDate()
              .toDateString(),
            hour:
              x
                .data()
                .reservationData.dates.reservationDate.toDate()
                .getHours()
                .toString() +
              ":" +
              x
                .data()
                .reservationData.dates.reservationDate.toDate()
                .getMinutes()
                .toString(),
          },
          dateIn: x
            .data()
            .reservationData.dates.startDate.toDate()
            .toDateString(),
          dateOut: x
            .data()
            .reservationData.dates.endDate.toDate()
            .toDateString(),
          price: x.data().reservationData.room.price,
          userData: x.data().reservationData.userData,
          status: "Booked",
        });
      });
    },
    async IMPORT_REVIEWS({ commit }) {
      var reviewsRfe = firebase.firestore().collection("Reviews");
      var doc = await reviewsRfe.get();

      doc.forEach((x) => {
        for (const [k, v] of Object.entries(x.data())) {
          let review = {
            id: x.id,
            userID: k,
            guestName: v.user.firstName + " " + v.user.lastName,
            reviewDate: {
              date: v.reviewDate.toDate().toDateString(),

              hour:
                v.reviewDate.toDate().getHours().toString() +
                ":" +
                v.reviewDate.toDate().getMinutes().toString(),
            },
            rate: v.rate,
            description: v.description,
          };

          commit("importReviews", review);
        }
      });
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
