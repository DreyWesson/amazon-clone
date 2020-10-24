import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAOC2Xku6xmY2vuhKrhFp5LhFWH-BZ4Hrw",
  authDomain: "fir-1425e.firebaseapp.com",
  databaseURL: "https://fir-1425e.firebaseio.com",
  projectId: "fir-1425e",
  storageBucket: "fir-1425e.appspot.com",
  messagingSenderId: "131021827577",
  appId: "1:131021827577:web:f0998d4bf246df4e1e6128",
  measurementId: "G-1Y51X3C06J",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
