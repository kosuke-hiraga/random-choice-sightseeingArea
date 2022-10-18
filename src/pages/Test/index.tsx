import React, { useContext } from "react";
import { db, auth } from "../../firebase/firebase";
import { deleteUser } from "firebase/auth";

import { TestContext } from "../../state/TestProvider";
import { te } from "../../firebase/logic";

import styled from 'styled-components'
import axios, { AxiosInstance } from "axios"
import { MUNI_ARRAY } from "../../util/muni"
import { setupGetPresentLocation } from "../../util/util"


const Body = styled.div`
    display: grid;

    grid-template-rows: 100px 100px;
    grid-template-columns: 100px 100px;
    grid-template-areas: 
        "itemA itemB" 
        "itemC itemC"
    ;

`



const ItemA = styled.div`
    grid-area: itemA;
    background-color: red;
`

const ItemB = styled.div`
    grid-area: itemB;
    background-color: blue;
`

const ItemC = styled.div`
    grid-area: itemC;
    background-color: green;
`


const JestTest: React.FC = () => {
    let lat: number | undefined;
    let lng: number | undefined;
    let axiosTest: AxiosInstance | undefined;


    // /**
    //  * @desc ブラウザで位置情報取得の許可が出た時のみ、現在位置の経緯・緯度を取得する
    //  */
    // function setupGetPresentLocation() {
    //     new Promise((resolve) => {
    //         navigator.geolocation.getCurrentPosition((position) => {
    //             let coords = position.coords;
    //             lat = coords.latitude;
    //             lng = coords.longitude;
    //             resolve("");
    //         })
    //     }).then((result) => {
    //         axiosTest = axios.create({
    //             baseURL: `https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress?lat=${lat}&lon=${lng}`,
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 // 'X-Requested-With': 'XMLHttpRequest',
    //                 // "Access-Control-Allow-Origin": "*"
    //             },
    //             responseType: 'json'
    //         });
    //     }).catch(() => {
    //         console.log("not allow");
    //     })
    // }


    // //ブラウザ側で位置情報の取得を許可した場合のみ実行される    
    // new Promise((resolve) => {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //         let coords = position.coords;
    //         lat = coords.latitude;
    //         lng = coords.longitude;
    //         resolve("");
    //     })
    // }).then((result) => {
    //     axiosTest = axios.create({
    //         baseURL: `https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress?lat=${lat}&lon=${lng}`,
    //         headers: {
    //             'Content-Type': 'application/json',
    //             // 'X-Requested-With': 'XMLHttpRequest',
    //             // "Access-Control-Allow-Origin": "*"
    //         },
    //         responseType: 'json'
    //     });
    // }).catch(() => {
    //     console.log("not allow");
    // })


    // /**
    //  * @desc 事前取得した経緯・緯度から現在位置を取得する
    //  * 
    //  * @returns 
    //  */
    // function excuteAction() {
    //     if (axiosTest === undefined) {
    //         alert("機能を有効にする為には位置情報の使用を許可してください")
    //         return
    //     }
    //     axiosTest.get("").then((result) => {
    //         const muniCd = Number(result.data.results.muniCd);
    //         console.log(getPresentLocation(muniCd));
    //     }).catch((err) => {
    //         console.log(err);
    //     })

    // }

    // /**
    //  * @desc muniCdに該当する「都道府県」「市町村」「区」を返す(但し区はある場合のみ)
    //  * @param muniCd muniCd(場所を一意に判定するコード)
    //  * @returns 該当する都道府県、市町村、区をまとめたオブジェクトを返す。該当しない場合、アラートを表示
    //  */
    // function getPresentLocation(muniCd: number) {
    //     if (muniCd in MUNI_ARRAY) {
    //         //@ts-ignore
    //         const parseArray = MUNI_ARRAY[muniCd].split(",");
    //         let ward: string | undefined;
    //         //"札幌市　北区" の様な文字列があるので、その場合は分割する
    //         if (parseArray[3].includes("　")) {
    //             const parseCity = parseArray[3].split("　");
    //             //市を格納
    //             parseArray[3] = parseCity[0];
    //             //区を格納
    //             ward = parseCity[1];
    //         }
    //         return {
    //             Prefectures: parseArray[1], //都道府県
    //             City: parseArray[3], //市町村
    //             Ward: ward //区
    //         }
    //     } else {
    //         alert("該当する地域なし");
    //         return
    //     }
    // }

    return (
        <>
            {/* <button onClick={() => excuteAction()}>test</button> */}
            <button onClick={() => setupGetPresentLocation()}>getMuni</button>
        </>




    )
}



export default JestTest;