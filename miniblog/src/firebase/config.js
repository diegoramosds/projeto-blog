import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firebase"

const firebaseConfig = {
  apiKey: "AIzaSyAZSAgbTS478pntU29IAjO1ljmbBv0Z_7U",
  authDomain: "miniblog-7a270.firebaseapp.com",
  projectId: "miniblog-7a270",
  storageBucket: "miniblog-7a270.appspot.com",
  messagingSenderId: "345727055721",
  appId: "1:345727055721:web:bb8beff07f7eb5eb5aaff8"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };