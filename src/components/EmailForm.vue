<template>
  <v-dialog ref="form" v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn target="_blank" v-bind="attrs" v-on="on" text> Send Email </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Send Email to All Users</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  :rules="rules"
                  label="Subject*"
                  item-text="name"
                  v-model="subject"
                  outlined
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  :rules="rules"
                  v-model="text"
                  name="Text"
                  label="Text*"
                  auto-grow
                  outlined
                  required
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeModal()"> Close </v-btn>
        <v-btn color="blue darken-1" text @click="saveAlert()"> Send </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      rules: [(v) => !!v || "This field is required"],
      dialog: false,
      text: "",
      subject: "",
    };
  },
  computed: {
    allEmails() {
      return this.$store.getters.getUsers.map((x) => {
        return x.email;
      });
    },
  },
  watch: {},

  methods: {
    async saveAlert() {
      if (this.$refs.form.validate()) {
        try {
          await this.addData();
          this.subject = "";
          this.text = "";
          this.dialog = false;
        } catch (err) {
          console.log(err);
        }
      }
    },
    async addData() {
      firebase
        .firestore()
        .collection("email")
        .doc()
        .set({
          allEmails: this.allEmails,
          subject: this.subject,
          text: this.text,
        })
        .then(() => {
          this.dialog = false;
          alert("Email send.");
        })
        .catch(() => {
          alert("Error");
        });
    },
    closeModal() {
      this.subject = "";
      this.text = "";
      this.dialog = false;
    },
  },
};
</script>
<style scoped>
.v-btn {
  outline: none;
}
.v-toolbar__content {
  padding-left: 0 !important;
}
</style>
