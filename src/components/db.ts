import firebase from "firebase/app";
import "firebase/firestore";

// Get a Firestore instance
export const db = firebase
  .firestore()
  .collection(process.env.NODE_ENV === "development" ? "Dev" : "Prod")
  .doc("BarchBadness");

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore;
export { Timestamp, GeoPoint };
