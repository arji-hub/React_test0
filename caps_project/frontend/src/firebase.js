import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARIl1kOxchMQbDNUNgSG_4eBriSU-Wtsg",
  authDomain: "notes-528dc.firebaseapp.com",
  projectId: "notes-528dc",
  storageBucket: "notes-528dc.firebasestorage.app",
  messagingSenderId: "806036326924",
  appId: "1:806036326924:web:b2feb661769810bb7efc29",
  measurementId: "G-NEQX2KNTNP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);