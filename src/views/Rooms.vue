<template>
  <v-main class="main">
    <LeftMenu />
    <TopBar :namePage="pageName" />
    <v-container class="relative top-32 lg:left-20">
      <v-row align="center">
        <v-col class="m-auto" cols="12" md="5">
          <div>
            <v-card class="my-card" max-width="500px">
              <v-tabs
                class="my-card"
                height="70px"
                centered
                color="#1DE9B6"
                background-color="#F4F4F4"
              >
                <v-tab @click="getAll()">All Rooms</v-tab>
                <v-tab @click="getAvailable()">Available</v-tab>
                <v-tab @click="getBooked()">Booked</v-tab>
              </v-tabs>
            </v-card>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xl="11">
          <v-data-table
            v-model="selected"
            :single-select="singleSelect"
            :headers="headers"
            :items="rooms"
            :sort-by="sort"
            :page.sync="page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            @page-count="pageCount = $event"
            class="elevation-1 rooms-table"
            show-select
          >
            <template v-slot:item.images="{ item }">
              <v-img
                role="20px"
                height="100px"
                width="100px"
                :src="item.images[0]"
                class="m-2"
              />
            </template>
            <template v-slot:item.isAvailable="{ item }">
              <v-chip :color="getColor(item.isAvailable)" dark>
                {{ item.isAvailable === true ? "Available" : "Booked" }}
              </v-chip>
            </template>
            <template v-slot:item.facilities="{ item }">
              {{ getFacilities(item.facilities) }}
            </template>
            <template v-slot:item.facilities="{ item }">
              {{ getFacilities(item.facilities) }}
            </template>
            <template v-slot:item.floor="{ item }">
              {{ "Floor F-" + item.floor }}
            </template>
            <template v-slot:item.number="{ item }">
              {{ "Room R-" + item.number }}
            </template>
            <template v-slot:top>
              <v-toolbar flat color="#F4F4F4">
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="#1DE9B6" dark v-bind="attrs" v-on="on">
                      New Item
                    </v-btn>
                  </template>
                  <v-overlay :absolute="true" :value="isLoading">
                    <v-progress-circular
                      class="progress"
                      :rotate="360"
                      :size="100"
                      :width="15"
                      :value="progress"
                      color="teal"
                    >
                      {{ progress }}
                    </v-progress-circular>
                  </v-overlay>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.RoomType"
                              label="Name"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.number"
                              label="Number"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.floor"
                              label="Floor"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.capacity"
                              label="Capacity"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.price"
                              label="Price"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12">
                            <v-textarea
                              v-model="editedItem.description"
                              name="Description"
                              label="Description"
                              auto-grow
                              outlined
                            ></v-textarea>
                          </v-col>
                          <v-col cols="12">
                            <v-switch
                              v-model="editedItem.facilities.Wifi"
                              label="Wifi"
                              color="success"
                              hide-details
                            ></v-switch>
                          </v-col>
                          <v-col cols="12">
                            <v-switch
                              v-model="editedItem.facilities.TV"
                              label="TV"
                              color="success"
                              hide-details
                            ></v-switch>
                          </v-col>
                          <v-col cols="12">
                            <v-switch
                              v-model="editedItem.facilities.bed"
                              label="Singel Bed"
                              color="success"
                              hide-details
                            ></v-switch>
                          </v-col>
                          <v-col cols="12">
                            <v-switch
                              v-model="editedItem.facilities.doubleBed"
                              label="Double Bed"
                              color="success"
                              hide-details
                            ></v-switch>
                          </v-col>
                          <v-col cols="12">
                            <v-switch
                              v-model="editedItem.facilities.shower"
                              label="Shower"
                              color="success"
                              hide-details
                            ></v-switch>
                          </v-col>
                          <v-col cols="12">
                            <v-switch
                              v-model="editedItem.facilities.dinner"
                              label="Dinner"
                              color="success"
                              hide-details
                            ></v-switch>
                          </v-col>
                          <v-col cols="12">
                            <v-file-input
                              v-model="imagesURL"
                              label="File input"
                              filled
                              prepend-icon="mdi-camera"
                              show-size
                              multiple
                            ></v-file-input>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">
                        Cancel
                      </v-btn>
                      <v-btn color="blue darken-1" text @click="save">
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="headline"
                      >Are you sure you want to delete this item?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete"
                        >Cancel</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteItemConfirm"
                        >OK</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="11">
          <div class="text-center pt-2">
            <v-pagination
              color="#1DE9B6"
              v-model="page"
              :length="pageCount"
              circle
            ></v-pagination>
            <v-text-field
              :value="itemsPerPage"
              label="Items per page"
              type="number"
              min="-1"
              max="15"
              @input="itemsPerPage = parseInt($event, 10)"
            ></v-text-field></div
        ></v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import LeftMenu from "@/components/LeftMenu.vue";
import TopBar from "../components/TopBar.vue";
import firebase from "firebase/app";
import "firebase/functions";
import "firebase/auth";
import "firebase/storage";
export default {
  name: "Rooms",
  components: {
    LeftMenu,
    TopBar,
  },
  data: () => ({
    showAll: true,
    showAvailable: false,
    showBooked: false,
    isLoading: false,
    progress: 0,
    pageName: "Rooms",
    sort: "number",
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    dialog: false,
    dialogDelete: false,
    singleSelect: false,
    selected: [],
    headers: [
      {
        text: "Room Name",
        align: "start",
        sortable: false,
        value: "RoomType",
      },
      { text: "", value: "images", sortable: false },
      { text: "Number", value: "number" },
      { text: "Bed Type", value: "bedType" },
      { text: "Room Floor", value: "floor" },
      { text: "Capacity", value: "capacity" },
      { text: "Room facilities", value: "facilities" },
      { text: "Room Status", value: "isAvailable" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    imagesURL: [],
    editedItem: {
      RoomType: "",
      number: 0,
      floor: 0,
      capacity: 0,
      isAvailable: true,
      price: 0,
      facilities: {
        Wifi: false,
        TV: false,
        bed: false,
        doubleBed: false,
        shower: false,
        dinner: false,
      },
      ranking: 0,
      opinions: 0,
      description: "",
      images: [],
    },
    defaultItem: {
      description: "",
      RoomType: "",
      number: 0,
      floor: 0,
      capacity: 0,
      price: 0,
      isAvailable: true,
      facilities: {
        Wifi: false,
        TV: false,
        bed: false,
        doubleBed: false,
        shower: false,
        dinner: false,
      },
      images: [],
    },
  }),
  mounted() {},
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    rooms() {
      return this.getRooms();
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  methods: {
    getRooms() {
      if (this.showAvailable) return this.$store.getters.getAvailableRooms;
      if (this.showBooked) return this.$store.getters.getBookedRooms;
      if (this.showAll) return this.$store.getters.getRooms;
    },
    getAvailable() {
      this.showAvailable = true;
      this.showAll = false;
      this.showBooked = false;
    },
    getBooked() {
      this.showAvailable = false;
      this.showAll = false;
      this.showBooked = true;
    },
    getAll() {
      this.showAvailable = false;
      this.showAll = true;
      this.showBooked = false;
    },
    editItem(item) {
      this.editedIndex = this.rooms.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.rooms.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store.dispatch("DELETE_ROOM", {
        id: this.editedItem.id,
        index: this.editedIndex,
      });
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async uploadImg(x) {
      return new Promise((resolve, reject) => {
        console.log("Uploading image ...");
        const storageRef = firebase
          .storage()
          .ref(`Rooms/${this.editedItem.number}/${x.name}/`);

        const uploadTask = storageRef.put(x);

        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            this.progress = Math.ceil(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            console.log("Upload is " + this.progress + "% done");
          },
          (error) => {
            console.log(error);
            reject(error);
          },
          async () => {
            const imgURL = await uploadTask.snapshot.ref.getDownloadURL();
            console.log("uploaded image: " + imgURL);
            resolve(imgURL);
          }
        );
      });
    },
    async getImagesUrl() {
      let aux = [];
      for (var i = 0; i < this.imagesURL.length; i++) {
        this.isLoading = true;
        const res = await this.uploadImg(this.imagesURL[i]);
        this.isLoading = false;
        aux.push(res);
      }
      return aux;
    },
    async save() {
      if (this.editedIndex > -1) {
        let imgs = await this.getImagesUrl();
        if (imgs.length > 0) {
          this.editedItem.images = this.editedItem.images.concat(imgs);
        }
        await firebase
          .firestore()
          .collection("Rooms")
          .doc(this.editedItem.number)
          .set(this.editedItem)
          .then(() => console.log("ok"))
          .catch((error) => {
            console.log(error);
          });
        this.$store.dispatch("IMPORT_ROOMS");
        this.close();
      } else {
        this.editedItem.images = this.getImagesUrl;
        await firebase
          .firestore()
          .collection("Rooms")
          .doc(this.editedItem.number)
          .set(this.editedItem)
          .then(() => console.log("ok"))
          .catch((error) => {
            console.log(error);
          });
        this.$store.dispatch("IMPORT_ROOMS");
        this.close();
      }
    },
    getColor(isAvailable) {
      if (isAvailable === true) return "green";
      else return "red";
    },
    getFacilities(facilities) {
      let res = "";
      for (const [i, a] of Object.entries(facilities)) {
        if (a === true) {
          res += i + ", ";
        }
      }
      return res;
    },
  },
};
</script>

<style>
.main {
  background-color: #f9f9f9;
  height: 100%;
  max-width: 100%;
}
.my-card {
  border-radius: 50px !important;
}
.v-card {
  border: none;
}
.rooms-table {
  background-color: #f4f4f4 !important;
  border-radius: 30px !important;
}
.progress {
  z-index: 1 !important;
}
</style>
