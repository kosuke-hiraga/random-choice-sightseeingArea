import { initializeApp } from "firebase/app";

import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

import {
    assertFails,
    assertSucceeds,
    initializeTestEnvironment,
    RulesTestEnvironment,
    authenticatedContext
} from "@firebase/rules-unit-testing";


const fs = require('fs');
// import * as fs from "fs"

const firebaseConfig = {
    apiKey: "AIzaSyCg6av84x0r5_vWzuGX8wC0Ayjo3fpPOWI",
    authDomain: "sightseeing-area-dev.firebaseapp.com",
    projectId: "sightseeing-area-dev",
    storageBucket: "sightseeing-area-dev.appspot.com",
    messagingSenderId: "1051991428796",
    appId: "1:1051991428796:web:2d395431b30ff619994ab9",
    measurementId: "G-560CJVWY6Y"
};
const app = initializeApp(firebaseConfig);

// 認証付きFirestoreクライアントの取得
// export function getFirestoreWithAuth() {
async function getTestEnv() {
    const time = new Date;
    return await initializeTestEnvironment({
        // projectId: time.getTime(),
        projectId: "sightseeing-area-dev",
        firestore: {
            auth: { uid: "H1UCHFKqD3WuBnMlYeka302pNYw2", email: "test@gmail.com" },
            rules: fs.readFileSync('./../firestore.rules', 'utf8'),
            // rules: fs.readFileSync('./../firestore.rules', 'utf8'),
            port: 8080,
            host: "localhost"
        }
    })
}

// ローカルで実行中の場合は、エミュレータを使う
let auth = getAuth();
connectAuthEmulator(auth, 'http://localhost:9099')

let db = getFirestore()
connectFirestoreEmulator(db, 'localhost', 8080);


export { db, auth, getTestEnv }