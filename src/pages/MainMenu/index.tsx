import React, { useState } from "react"
import { Button } from "@mui/material";
import styled from 'styled-components'
import { styled as st } from "@mui/system";
import { P } from "../../components/Atoms/Typography";
import BackgroundImg from "./backgrondImg";
import Header from "./header";
// import SearchButton from "./body";
import Result from "./result"
import { toBoolean } from "../../util/util"
import { ShightseeingData } from "../../types/SightseeingData"

import SightseeingCard from "./body"
import SightseeingCard_Mobile from "./body_moblie"
import { ViewportState } from "../../mediaQuary/config";

import Menu from "../Menu";
import { update_SessionStorage_favrorite, update_firestoreFavorite } from "../../firebase/logic";


// const Layout = styled.div`
//     width: 100%;
//     height: 100%;
//     position: absolute;
//     top: 0;
//     left: 0;
//     display: grid;
//     grid-template-areas: 
//         "title"
//         "search"
//     ;
//     z-index: 10;
// `
const HeaderPosition = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    /* background-color: green; */
    /* grid-area: title; */
`

// const ButtonPosition = styled.div`
//     grid-area: search;
// `
const ChangeBlack = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 1000;
`

const SightseeingDataList = styled.div`
    /* display: flex;
    flex-wrap: wrap;
    justify-content: center; */
    /* justify-content: left; */
    /* margin-top: 50px; //test用 */
`


const MainMenu = () => {
    const DefaultSliderNum: number = 1;
    const [sliderValue, setSliderValue] = useState<number>(DefaultSliderNum);

    //初回時は何も表示せず、二回目以降はセッションストレージに保存されている前回の検索結果を表示する
    let PreviousData_at_MainMenu = sessionStorage.getItem("previousData_at_MainMenu") ?? [] as ShightseeingData[];
    if (typeof PreviousData_at_MainMenu !== "object") {
        PreviousData_at_MainMenu = JSON.parse(PreviousData_at_MainMenu) as Array<ShightseeingData>;
    }
    const [sightseeingData, setSightseeingData] = useState<Array<ShightseeingData>>(PreviousData_at_MainMenu);

    let isBlackSession = toBoolean(sessionStorage.getItem("isBlack"));
    if (typeof isBlackSession === "string") {
        isBlackSession = toBoolean(isBlackSession);
    }

    const [isBlack, setIsBlack] = useState(isBlackSession);
    const [isMenu, setIsMenu] = useState(false);


    const useStates = {
        sliderValue: sliderValue,
        setSliderValue: setSliderValue,
        sightseeingData: sightseeingData,
        setSightseeingData: setSightseeingData,
        isBlack: isBlack,
        setIsBlack: setIsBlack,
        isMenu: isMenu,
        setIsMenu: setIsMenu
    };



    return (
        <>
            <HeaderPosition>
                <Header {...useStates} />
            </HeaderPosition>

            {isBlack === true ?
                <Result isBlack={isBlack} setIsBlack={setIsBlack} setSightseeingData={setSightseeingData} >
                    {
                        sightseeingData.map((sightseeingInfo) => {
                            return (
                                ViewportState === "mobile" ?
                                    <SightseeingCard_Mobile {...sightseeingInfo} key={sightseeingInfo.id} /> :
                                    <SightseeingCard {...sightseeingInfo} key={sightseeingInfo.id} />
                            )
                        })
                    }
                </Result>
                : ""}
            <ChangeBlack>
                <button onClick={() => setIsBlack(!isBlack)}> 黒切り替え</button>
            </ChangeBlack>
            <ChangeBlack>
                {/* <button onClick={() => setIsMenu(!isMenu)}> メニュー</button> */}
                {/* <button onClick={() => addSessionStorage_favrorite("ee")}> addFavrorite</button> */}
                {/* <button onClick={() => addFirebase_favorite("nJMhRN2XbPaWmqCHMoR9lRnrpy03")}> addFavrorite</button> */}
            </ChangeBlack>

            {/* 背景画像は下記コンポーネントが表示 */}
            <BackgroundImg />
        </>
    )
}


export default MainMenu;


