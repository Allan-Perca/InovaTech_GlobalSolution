import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC9g85UpA1PkcGoeAwfLXcaqWFDUyzo8rA",
  authDomain: "inovax-f04ba.firebaseapp.com",
  projectId: "inovax-f04ba",
  storageBucket: "inovax-f04ba.appspot.com",
  messagingSenderId: "538005460017",
  appId: "1:538005460017:web:6a7599a538b01e5706b110",
  measurementId: "G-DDCSY2XFW1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db };
