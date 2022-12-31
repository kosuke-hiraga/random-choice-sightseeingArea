import { deleteApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

//ローカルの場合、ローカル用プロジェクトを参照する様にする。
let firebaseConfig;

if (window.location.hostname === "localhost") {
    firebaseConfig = {
        apiKey: "AIzaSyCg6av84x0r5_vWzuGX8wC0Ayjo3fpPOWI",
        authDomain: "sightseeing-area-dev.firebaseapp.com",
        projectId: "sightseeing-area-dev",
        storageBucket: "sightseeing-area-dev.appspot.com",
        messagingSenderId: "1051991428796",
        appId: "1:1051991428796:web:2d395431b30ff619994ab9",
        measurementId: "G-560CJVWY6Y"
    }
} else {
    firebaseConfig = {
        apiKey: "AIzaSyDUDnxe2RcTMd6m6r_PaZGhOxjofi1xv1c",
        authDomain: "random-choice-sightseeing-area.firebaseapp.com",
        projectId: "random-choice-sightseeing-area",
        storageBucket: "random-choice-sightseeing-area.appspot.com",
        messagingSenderId: "278204816867",
        appId: "1:278204816867:web:0d6af1b06a51ab484b14d6"
    }
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export { db, auth, app, deleteApp }