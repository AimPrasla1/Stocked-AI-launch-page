import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVMfmTAGG3pzlDyCkiJ8rtBf_mlskyip0",
  authDomain: "stocked-dda37.firebaseapp.com",
  projectId: "stocked-dda37",
  storageBucket: "stocked-dda37.appspot.com",
  messagingSenderId: "333261386841",
  appId: "1:333261386841:web:b9df42ae19a9f04f49ed48",
  measurementId: "G-P04GHEGLMZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
