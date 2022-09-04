import React, { useState } from "react"
import { testData } from "../TestData/testData";

export function useSightseeingData() {

    console.log("useSightseeingData");
    const [unti, setUnti] = useState("unti");

}


export function getShigthseeingData(num) {
    let returnArray = [];
    for (let i = 0; i < num; i++) {
        returnArray.push(testData[i])
    }
    //共通化の為、state管理は呼び出し元で行う
    // setSightseeingData(returnArray);
    // setIsBlack(!isBlack);

    sessionStorage.setItem("previousData_at_MainMenu", JSON.stringify(returnArray));
}