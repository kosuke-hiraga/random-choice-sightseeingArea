import React from "react"
// import { db } from '../firebase/firebase.js'
import GetFirebaseData from "./pages/get firebase data/GetFirebaseData";
import MainMenu from "./pages/MainMenu"
// import Test from "./pages/Test/Test"
import SightseeingData from "./pages/SightseeingData"

import {
    // BrowserRouter as Router,
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'



const main = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* <button id="getFirestoreButton" onClick={excute}>firebase get</button> */}
                {/* <input id="getID" type="text" placeholder="入力したIDでfirebase行き"></input> */}

                <Route exact path='/getFirebase' element={<GetFirebaseData />} />
                <Route exact path='/' element={<MainMenu />} />
                {/* <Route exact path='/test' element={<Test />} /> */}
                <Route exact path='/SightseeingData/*' element={<SightseeingData />} />
            </Routes>
        </BrowserRouter>
    );


}



export default main;