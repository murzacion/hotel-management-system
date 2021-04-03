<template>
  <v-container class="main-login">
    <v-row justify="center">
      <v-col cols="6" sm="4" align-self="end">
        <span
          class="pt-6"
          :class="{
            'sm-title-text': $vuetify.breakpoint.smAndDown,
            'title-text': $vuetify.breakpoint.mdAndUp,
          }"
        >
          Hotel<br />
          Management <br />
          System
        </span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card
          class="ma-6 mx-sm-auto rounded-xl"
          max-width="600px"
          max-height="250px"
          color="#EDECEC"
        >
          <v-form ref="form" class="pa-sm-12 pa-6">
            <v-text-field
              :rules="[rules.required, rules.email]"
              v-model="email"
              type="email"
              label="Email"
              rounded
              outlined
              required
            ></v-text-field>
            <v-text-field
              :rules="[rules.required, rules.counter]"
              v-model="password"
              type="password"
              label="Password"
              rounded
              outlined
            ></v-text-field>
          </v-form> </v-card></v-col
    ></v-row>
    <v-row justify="end">
      <v-col cols="auto" sm="5">
        <v-btn
          class="login-btn white--text"
          x-large
          rounded
          color="#1A79D7"
          @click="submit"
        >
          Log in
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col xs="auto" sm="auto">
        <v-img
          max-height="64px"
          max-width="64px"
          src="../assets/icon/open.png"
        ></v-img>
      </v-col>
      <v-col xs="auto" sm="auto">
        <v-img
          max-height="64px"
          max-width="64px"
          src="..//assets/icon/hotel.png"
        ></v-img
      ></v-col>
      <v-col sm="auto">
        <v-img
          max-height="64px"
          max-width="64px"
          src="../assets/icon/rooms-available.png"
        />
      </v-col>
    </v-row>
    <p
      class="mt-6 text-center text-red-500 font-medium text-md-h4"
      v-if="error"
    >
      {{ error.message }}
    </p>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "Login",
  data: () => ({
    email: "",
    password: "",
    rules: {
      required: (value) => !!value || "Required.",
      counter: (value) => value.length > 8 || "Min 8 characters",
      email: (value) => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
    error: null,
  }),
  created() {
    console.log(firebase.auth().currentUser);
  },
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then((data) => {
            console.log(data);
            if (
              firebase.auth().currentUser.uid === "Cp28G9hieCcbj2kTsd78Mt5j9zQ2"
            )
              this.$router.replace({ name: "Dashboard" });
            else {
              firebase.auth().signOut();
            }
          })
          .catch((error) => {
            console.log(error);
            this.error = error;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main-login {
  background-color: #f9f9f9;
  height: 100%;
  max-width: 100%;
}
.title-text {
  display: flex;
  font-size: 3rem;
  font-weight: 800;
  color: #1976d2;
  line-height: 1.2;
}
.sm-title-text {
  display: flex;
  font-size: 2rem;
  font-weight: 600;
  color: #1976d2;
  line-height: 1.2;
}
.login-btn {
  border: 4px solid #0359ae;
}
</style>
