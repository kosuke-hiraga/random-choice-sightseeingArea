

import {
    assertFails,
    assertSucceeds,
    initializeTestEnvironment,
    RulesTestEnvironment,
} from "@firebase/rules-unit-testing";

import { useGetSightseeingData } from "../src/hooks/hooks"

let testEnv;



describe("firebase データ取得テスト", () => {
    test("正常系 データを取得できるか", async () => {


        const firebaseData = await useGetSightseeingData(1);
        // const firebaseData = useGetSightseeingData(1);
        // const firebaseData = getTestData(1);
        expect(firebaseData).toBeTruthy();
    });

    // test("正常系　任意の数データを取得できるか", () => {
    //     let getRecordsNum = 2;
    //     let firebaseData = useGetSightseeingData(getRecordsNum);
    //     expect(firebaseData.length).toBe(getRecordsNum);

    //     getRecordsNum = 3;
    //     firebaseData = useGetSightseeingData(getRecordsNum);
    //     expect(firebaseData.length).toBe(getRecordsNum);
    // });
})

// beforeEach(async () => {
//     // Firestore エミュレータ用に構成された projectId に属する Firestore データベースのデータをクリアします。
//     await testEnv.clearFirestore()
// })

