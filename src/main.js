import React from "react"
// import { db } from '../firebase/firebase.js'
import GetFirebaseData from "./pages/get firebase data/GetFirebaseData";
import MainMenu from "./pages/MainMenu"
import SightseeingData from "./pages/SightseeingData"
import PR from "./pages/test_s";
import { AuthContext, AuthProvider } from "./state/LoginProvider";
import Menu from "./pages/Menu";

import {
    // BrowserRouter as Router,
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom'

import JestTest from "./pages/Test";
import { TestContext, TestProvider } from "./state/TestProvider";



const main = () => {
    return (
        <TestProvider>
            <AuthProvider>
                < BrowserRouter >
                    <Routes>
                        {/* <button id="getFirestoreButton" onClick={excute}>firebase get</button> */}
                        {/* <input id="getID" type="text" placeholder="入力したIDでfirebase行き"></input> */}

                        <Route exact path='/getFirebase' element={<GetFirebaseData />} />
                        <Route exact path='/' element={<MainMenu />} />
                        <Route exact path='/SightseeingData/*' element={<SightseeingData />} />
                        <Route exact path='/PR' element={<PR />} />
                        {/* <Route exact path='/PR2' element={<PR2 />} /> */}
                        {/* <Route exact path='/test' element={<Menu />} /> */}

                        <Route exact path='/test' element={<JestTest />} />


                    </Routes>
                </BrowserRouter >
            </AuthProvider>
        </TestProvider>

    );


}



export default main;