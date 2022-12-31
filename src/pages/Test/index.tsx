import React, { useContext } from "react";
import { db, auth } from "../../firebase/firebase";
import { deleteUser } from "firebase/auth";

import styled from 'styled-components'
import axios, { AxiosInstance } from "axios"
import { MUNI_ARRAY } from "../../util/muni"
import { addPrefectureString, getSessionStorage, setupGetPresentLocation } from "../../util/util"

import { GetSightseeingData_developing, getSightseeingData_sample } from "../../firebase/logic";
import { addDoc, collection, documentId, getDocs, limit, query, where, doc, setDoc, deleteDoc } from "firebase/firestore";

import * as Prefecture from "../../util/Prefecture"
import { ScreenType, ViewportState } from "../../mediaQuary/config";

import { sampleData } from "../../TestData/sampleData";

const JestTest: React.FC = () => {


    /**
     * サンプルデータをfirestoreに保存する
     */
    function registerSampleData() {
        console.log(sampleData);

        const refCollection = collection(db, "sightseeingData");

        sampleData.forEach((data) => {
            const { id, ...rest } = data;
            addDoc(refCollection,
                rest
            );
        })

    }

    async function registerSampleData_indexs() {
        //sampleデータのIDを全て取得
        const Ids = await (async () => {
            const refCollection = collection(db, "sightseeingData");
            const docs = await getDocs(refCollection);
            return docs.docs.map((doc) => {
                return doc.id
            });
        })();

        //取得したIDをfirestoreに保存
        console.log(Ids);
        const refDoc = doc(db, "sightseeingIndexs", "sample");
        setDoc(refDoc, {
            ids: Ids
        });
    }

    //dbに登録するときはここを使ってね
    // async function setIndexs(targetPrefecture: string) {
    async function setIndexs(targetPrefectures: Array<string>) {

        await Promise.all(targetPrefectures.map(async (targetPrefecture) => {
            // console.log(targetPrefecture);
            const Prefecture = addPrefectureString(targetPrefecture);

            const refCol = collection(db, "sightseeingData");
            const q = query(refCol, where("area", "==", Prefecture))
            const docs = await getDocs(q);
            const sightseeingIndexs = docs.docs.map((data) => {
                return data.id
            });
            console.log(sightseeingIndexs);

            const refDoc = doc(db, "sightseeingIndexs", Prefecture);
            setDoc(refDoc, {
                ids: sightseeingIndexs
            });
        })
        );
    }

    async function searchKINKI() {
        // const LP = addPrefectureString(Prefecture.KINKI);

        let Prefectures: Array<string> = [];
        Prefecture.KINKI.forEach((pre) => {
            Prefectures.push(addPrefectureString(pre));
        });

        console.log(Prefectures);

        const refCol = collection(db, "sightseeingData");
        const q = query(refCol, where("area", "in", Prefectures))
        const docs = await getDocs(q);
        const sightseeingIndexs = docs.docs.map((data) => {
            return data.id
        });
        // docs.docs.map((data) => {
        //     deleteDoc(data.ref)
        // });
        console.log(sightseeingIndexs);
    }

    //dbに登録するときはここを使ってね
    // async function setIndexs(targetPrefecture: string) {
    async function setALLIndexs() {
        const refCol = collection(db, "sightseeingIndexs");
        const docs = await getDocs(refCol);
        const sightseeingALLIndexs = docs.docs.map((data) => {
            return data.id
        });

        console.log(sightseeingALLIndexs);


        // const GOMI = Prefecture.ZENKOKU.filter((TODOUHUKEN) => {
        //     sightseeingALLIndexs.forEach((ALL) => {
        //         return TODOUHUKEN === ALL
        //     });
        // });
        console.log(Prefecture.ZENKOKU);

        const NEW = Prefecture.ZENKOKU.map((P) => {
            return addPrefectureString(P);
        });

        console.log(NEW);

        const GOMI = NEW.filter((ALL) => {
            return sightseeingALLIndexs.indexOf(ALL) === -1
        });
        console.log(GOMI);
    };

    /**
 * @desc スマホなら8件。 それ以外の端末は10件レコードを取得する
 * @return 8件 or 10件のレコード
 */
    function extractID(Ids: Array<string>): Array<string> {
        const numberOfExecutions = ViewportState === ScreenType.Mobile ? 8 : 10;
        const extractIds = [];
        for (let i = 0; i < numberOfExecutions; i++) {
            let randomNum = Math.floor(Math.random() * Ids.length);
            let targetId = Ids.splice(randomNum, 1).toString();
            extractIds.push(targetId);
        };
        return extractIds;
    }


    return (
        <>
            <button onClick={() => setupGetPresentLocation()}>getMuni</button>
            <button onClick={() => {
            }}>ALL</button>
            <button onClick={() => {
            }}>GetSightseeingData_developing</button>

            <button onClick={() => {
                // setIndexs("北海道");
                // setIndexs(Prefecture.TOHOKU);
                // setIndexs(Prefecture.KANTO); まだ登録してない
                // setIndexs(Prefecture.TYUBU);
                // setIndexs(Prefecture.KINKI);
                // setIndexs(Prefecture.SHIKOKU);
                // setIndexs(Prefecture.TYUGOKU);
                // setIndexs(Prefecture.KYUSHU_OKINAWA);
                setALLIndexs()
            }}>setIndexs</button>

            {/* <button onClick={() => searchKINKI()}>searchKINKI</button> */}
            <button onClick={() => registerSampleData()}>registerSampleData</button>
            <button onClick={() => registerSampleData_indexs()}>registerSampleData_indexs</button>



        </>







    )
}



export default JestTest;