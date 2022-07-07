import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDUDnxe2RcTMd6m6r_PaZGhOxjofi1xv1c",
    authDomain: "random-choice-sightseeing-area.firebaseapp.com",
    projectId: "random-choice-sightseeing-area",
    storageBucket: "random-choice-sightseeing-area.appspot.com",
    messagingSenderId: "278204816867",
    appId: "1:278204816867:web:0d6af1b06a51ab484b14d6"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

// export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);