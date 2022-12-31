import React, { useState } from "react";
import styled from 'styled-components'
import BackgroundImg from "./backgrondImg";
import Header from "./header";
import Result from "./result"
import { getSessionStorage, toBoolean } from "../../util/util"
import { ShightseeingData } from "../../types/SightseeingData"
import SightseeingCard from "./body"
import SightseeingCard_Mobile from "./body_moblie"
import { STORAGE_KEY } from "../../util/const";


const HeaderPosition = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
`
const MainMenu = () => {
    //初回時は何も表示せず、二回目以降はセッションストレージに保存されている前回の検索結果を表示する
    const PreviousData_at_MainMenu = (() => {
        const PreviousData_at_MainMenu = getSessionStorage(STORAGE_KEY.PREVIOUSDATA_AT_MAINMENU);
        return PreviousData_at_MainMenu as unknown as Array<ShightseeingData>;
    })();
    const isBlackSession = (() => {
        return toBoolean(sessionStorage.getItem(STORAGE_KEY.IS_BLACK));
    })();

    const [sightseeingData, setSightseeingData] = useState<Array<ShightseeingData>>(PreviousData_at_MainMenu);
    const [isBlack, setIsBlack] = useState(isBlackSession);
    const [isMenu, setIsMenu] = useState(false);
    const [isSignUpScreen, setIsSignUpScreen] = useState(false);
    const [isSignInScreen, setIsSignInScreen] = useState(false);
    const [isHiddenTab, setIsHiddenTab] = useState(true);

    const useStates = {
        sightseeingData: sightseeingData,
        setSightseeingData: setSightseeingData,
        isBlack: isBlack,
        setIsBlack: setIsBlack,
        isMenu: isMenu,
        setIsMenu: setIsMenu,
        isSignUpScreen: isSignUpScreen,
        setIsSignUpScreen: setIsSignUpScreen,
        isSignInScreen: isSignInScreen,
        setIsSignInScreen: setIsSignInScreen,
        isHiddenTab: isHiddenTab,
        setIsHiddenTab: setIsHiddenTab
    };
    console.log(sightseeingData);

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
                                // ViewportState === "mobile" ?
                                window.matchMedia("(max-width: 519px)").matches === true ?
                                    <SightseeingCard_Mobile {...sightseeingInfo} key={sightseeingInfo.id} /> :
                                    <SightseeingCard {...sightseeingInfo} key={sightseeingInfo.id} />
                            )
                        })
                    }
                </Result>
                : ""}
            {/* 背景画像は下記コンポーネントが表示 */}
            <BackgroundImg />
        </>
    )
}


export default MainMenu;


