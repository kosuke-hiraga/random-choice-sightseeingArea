import React from "react"
// import { db } from '../firebase/firebase.js'
import SightseeingData from "./components/ShighseeingData/ShighseeingData";
import TestMaterialUI from "./components/TestMaterilUI/TestMaterilUI"
import Test from "./components/Test/Test"

import {
    // BrowserRouter as Router,
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'



const main = () => {

    console.log("load main.js");


    return (
        <BrowserRouter>
            <Routes>
                {/* <button id="getFirestoreButton" onClick={excute}>firebase get</button> */}
                {/* <input id="getID" type="text" placeholder="入力したIDでfirebase行き"></input> */}

                <Route exact path='/getFirebase' element={<SightseeingData />} />
                <Route exact path='/' element={<TestMaterialUI />} />
                <Route exact path='/test' element={<Test />} />
            </Routes>
        </BrowserRouter>
    );


}



export default main;