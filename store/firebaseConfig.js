import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBA3GP28uMUwV57j8bhZSoZqT0ftVlVrBU",
  authDomain: "lab3-064.firebaseapp.com",
  databaseURL: "https://lab3-064-default-rtdb.firebaseio.com",
  projectId: "lab3-064",
  storageBucket: "lab3-064.appspot.com",
  messagingSenderId: "1005169962417",
  appId: "1:1005169962417:web:6e6a935bfc35379add6190",
  measurementId: "G-8RND4GL8ED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Ensure this is correct
export { db };