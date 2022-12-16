import firebase from "firebase";
firebase.initializeApp({
  apiKey: "AIzaSyANxj9AutZvPgnUtrwN1276D0hLQlAW_lQ",
  authDomain: "moosebot-ccd89.firebaseapp.com",
  projectId: "moosebot-ccd89",
  storageBucket: "moosebot-ccd89.appspot.com",
  messagingSenderId: "641125417384",
  appId: "1:641125417384:web:cdf6cb098bb299ca049d9d",
  measurementId: "G-QKR358DEC8",
});
import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { firestorePlugin } from "vuefire";

Vue.use(firestorePlugin);

Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged((user) => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
