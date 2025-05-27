import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyB_hIsgTLBOICviq9ehjp4Css5kMWG81iA",
  authDomain: "pokeapi2-cd35d.firebaseapp.com",
  projectId: "pokeapi2-cd35d",
  storageBucket: "pokeapi2-cd35d.firebasestorage.app",
  messagingSenderId: "291258842080",
  appId: "1:291258842080:web:8c646e41f64c249a73c985"
};const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ ¡Esto es necesario!

export { auth, db };