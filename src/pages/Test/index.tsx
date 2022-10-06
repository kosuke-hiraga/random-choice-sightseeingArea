import React, { useContext } from "react";
import { db, auth } from "../../firebase/firebase";
import { TestContext } from "../../state/TestProvider";
import { te } from "../../firebase/logic";


const JestTest: React.FC = () => {
    // const JestTest = () => {
    // console.log(db);
    console.log(TestContext);
    const tt = useContext(TestContext);
    const yy = 32;
    te();


    return (



        <div id="JestTest">{tt.checkTest()}</div>
        // <div id="JestTest">{yy}</div>
        // <div id="JestTest">ss</div>

    )
}



export default JestTest;