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
import SignUpScreen from "./components/Organisms/SignUpScreen"


const BasePath = "/build";

const main = () => {
    return (
        // <TestProvider>
        //     <AuthProvider>
        //         < BrowserRouter basename={BasePath}>
        //             {/* {/* < BrowserRouter basename>/*} */}
        //             <Routes>
        //                 {/* <button id="getFirestoreButton" onClick={excute}>firebase get</button> */}
        //                 {/* <input id="getID" type="text" placeholder="入力したIDでfirebase行き"></input> */}
        //                 <Route exact path='/getFirebase' element={<GetFirebaseData />} />
        //                 <Route exact path='/' element={<MainMenu />} />
        //                 <Route exact path='/SightseeingData/*' element={<SightseeingData />} />
        //                 <Route exact path='/PR' element={<PR />} />
        //                 <Route exact path='/test' element={<JestTest />} />
        //                 <Route exact path='/sighUp' element={<SignUpScreen />} />
        //                 <Route path='*' element={<MainMenu />} />
        //             </Routes>
        //         </BrowserRouter >
        //     </AuthProvider>
        // </TestProvider >

        <TestProvider>
            <AuthProvider>
                < BrowserRouter basename={BasePath}>
                    {/* {/* < BrowserRouter basename>/*} */}
                    <Routes>
                        <Route exact path='/' element={<MainMenu />} />
                        <Route path='/index.html' element={<JestTest />} />
                        {/* <Route exact path='/SightseeingData/*' element={<SightseeingData />} /> */}
                        <Route path='/PR' element={<PR />} />
                        <Route path='/test' element={<JestTest />} />
                        {/* <Route exact path='/sighUp' element={<SignUpScreen />} /> */}

                    </Routes>
                </BrowserRouter >
            </AuthProvider>
        </TestProvider >

    );


}



export default main;