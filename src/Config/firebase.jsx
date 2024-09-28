import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import {  getStorage  } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAbLZN4JhxzxWxds5Y2EsI-JAcVQyIJEG0",
    authDomain: "healthinsight-ai.firebaseapp.com",
    projectId: "healthinsight-ai",
    storageBucket: "healthinsight-ai.appspot.com",
    messagingSenderId: "816211425035",
    appId: "1:816211425035:web:e0b4ee49252da12f08940e",
    measurementId: "G-6VDE3V2FYX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
