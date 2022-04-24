import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBvyBKYJUX7ldPVh7mFOo6Wnq4VcP208nk",
    authDomain: "slack-react-clone-dc79f.firebaseapp.com",
    projectId: "slack-react-clone-dc79f",
    storageBucket: "slack-react-clone-dc79f.appspot.com",
    messagingSenderId: "173851165493",
    appId: "1:173851165493:web:d41499131ff612dba0027c"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
// const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };