<template lang="pug">
.login
  button(v-if="!loggedIn", @click="login") Login
  button(v-else, @click="logout") Logout
  pre {{ JSON.stringify(user, null, 2) }}
</template>

<script>
import firebase from "firebase";
import { mapGetters } from "vuex";

export default {
  name: "Login",
  computed: {
    ...mapGetters(["user", "loggedIn"]),
  },
  methods: {
    login() {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          console.log("logged in", result);
        })
        .catch((error) => {
          console.log("error logging in", error);
        });
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("logged out");
        })
        .catch((error) => {
          console.log("error logging out", error);
        });
    },
  },
};
</script>
