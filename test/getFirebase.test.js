import {
    assertFails,
    assertSucceeds,
    initializeTestEnvironment,
    RulesTestEnvironment,
} from "@firebase/rules-unit-testing";

import { useGetSightseeingData } from "../src/hooks/hooks"
import { getTestData } from "../test/es6"

let testEnv;

beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
        projectId: "random choice sightseeing area",
        firestore: {
            host: 'localhost',
            port: 8088
        }
    });
});

afterAll(async () => {
    //テスト終了後テスト環境で作成されたすべての RulesTestContexts を破棄します。
    await testEnv.cleanup()
})




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

