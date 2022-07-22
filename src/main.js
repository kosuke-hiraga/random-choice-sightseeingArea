import React from "react"
// import { db } from '../firebase/firebase.js'
import SightseeingData from "./components/ShighseeingData/ShighseeingData";
import TestMaterialUI from "./components/TestMaterilUI/TestMaterilUI"
import Test from "./components/Test/Test"
import Test2 from "./components/Test2/Test2"

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
                <Route exact path='/test2' element={<Test2 />} />
            </Routes>
        </BrowserRouter>
    );


}



export default main;