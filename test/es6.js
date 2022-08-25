import { testData } from "./../src/TestData/testData"

export const arrow = () => {
    return "es6";
}

//test用
export function getTestData(num) {
    let returnArray = [];
    console.log(num);
    for (let i = 0; i < num; i++) {
        returnArray.push(testData[i])
    }
    return returnArray
}