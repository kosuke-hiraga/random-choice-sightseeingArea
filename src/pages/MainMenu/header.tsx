import React, { useContext, useState } from "react"
import styled from "styled-components"
import { ShightseeingData } from "../../types/SightseeingData"
import { AuthContext } from "../../state/LoginProvider";
import { GetSightseeingData_developing } from "../../firebase/logic";
import Menu from "../Menu";
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MenuIcon from '@mui/icons-material/Menu';
import { P } from "../../components/Atoms/Typography"
import SignUpScreen from "../../components/Organisms/SignUpScreen";
import SignInScreen from "../../components/Organisms/SignInScreen";
import SelectPrefecturesTab from "../../components/Organisms/SelectPrefecturesTab";
import SearchPrefectureScreen from "../../components/Organisms/SearchPrefectureScreen";
import BaseButton from "../../components/Atoms/BaseButton";
import Device from "../../mediaQuary/config";
import { getSessionStorage } from "../../util/util";
import { STORAGE_KEY } from "../../util/const";

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 0.3fr 1fr 0.5fr 1fr;
    grid-template-areas: 
    "menu"
    "title"
    "explanation"
    "search"
    ;
`
const Title = styled.div`
    grid-area: title;
    width: 90%;
    margin: 0 auto ;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    p{
        color: #e6e7ee;
        text-shadow: 2px 6px 0px rgba(0, 0, 0, 0.42);
        font-size: calc(2rem + ((1vw - 3.20px) * 7));
        font-weight: bold;
    }
`
const Explanation = styled.div`
    grid-area: explanation;
    width: 90%;
    margin: 0 auto ;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    p{
        color: #e6e7ee;
        text-shadow: 2px 4px 0px rgba(0, 0, 0, 0.42);
        font-size: calc(1rem + ((1vw - 3.20px) * 3));
        font-weight: bold;
    }
`
const SearchButtonWrap = styled.div`
    grid-area: search;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
`
const MenuWrap = styled.div`
    grid-template-areas: menu;
    width: 100%;
    height: 100%;
    position: relative;
`
const ButtonWrap = styled.div`
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 10px;
`
const SignUpButton = styled(BaseButton)`
    display: flex;
    justify-content: space-evenly;
    width: 100px;
`
const SignInButton = styled(BaseButton)`
    display: flex;
    justify-content: space-evenly;
    width: 100px;
`
const BlackDiv = styled.div`
    background:rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
`
const TabPosition = styled.div`
    width: 600px;
    height: 500px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 100;
    @media ${Device.mobile}{
        width: 300px;
    }
`
const SignInScreen_EXT = styled(SignInScreen)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 20;
`
const SignUpScreen_EXT = styled(SignUpScreen)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 20;
`

const paragraphSx = {
    cursor: "default"
};


type MainMenuHeaderComponent = {
    setSightseeingData: React.Dispatch<React.SetStateAction<ShightseeingData[]>>
    sightseeingData: ShightseeingData[];
    isBlack: boolean;
    setIsBlack: React.Dispatch<React.SetStateAction<boolean>>;
    isMenu: boolean;
    setIsMenu: React.Dispatch<React.SetStateAction<boolean>>;
    isSignUpScreen: boolean;
    setIsSignUpScreen: React.Dispatch<React.SetStateAction<boolean>>;
    isSignInScreen: boolean;
    setIsSignInScreen: React.Dispatch<React.SetStateAction<boolean>>;
    isHiddenTab: boolean,
    setIsHiddenTab: React.Dispatch<React.SetStateAction<boolean>>
}


const HeaderTitle: React.FC<MainMenuHeaderComponent> = ({
    setSightseeingData,
    setIsBlack,
    isMenu,
    setIsMenu,
    isSignUpScreen,
    setIsSignUpScreen,
    isSignInScreen,
    setIsSignInScreen,
    isHiddenTab,
    setIsHiddenTab
}) => {
    const Auth = useContext(AuthContext);
    const [searchWord, setSearchWord] = useState(getSessionStorage(STORAGE_KEY.PUSHED_PREFECTURE_BUTTON).join("・"));

    async function getShigthseeingData() {
        const Prefectures = getSessionStorage(STORAGE_KEY.PUSHED_PREFECTURE_BUTTON);

        const getData = await GetSightseeingData_developing(Prefectures);
        // const getData = sampleData;
        // const getData = await getSightseeingData_sample();
        setIsBlack(true);
        //【TODO】検索処理　一旦停止中
        setSightseeingData(getData);
        sessionStorage.setItem(STORAGE_KEY.PREVIOUSDATA_AT_MAINMENU, JSON.stringify(getData));
    }

    //都道府県を選択する毎に動作するのを想定
    function closedTabAction() {
        const searchPrefectures = getSessionStorage(STORAGE_KEY.PUSHED_PREFECTURE_BUTTON).join("・");
        setIsHiddenTab(!isHiddenTab);
        setSearchWord(searchPrefectures);
    }

    return (
        <>
            <Layout>
                <MenuWrap>
                    <ButtonWrap>
                        {Auth.currentUser === "logout" ?
                            <>
                                <SignUpButton onClick={() => setIsSignUpScreen(true)}>
                                    <PersonAddIcon />
                                    新規登録
                                </SignUpButton>
                                <SignInButton onClick={() => setIsSignInScreen(true)}>
                                    <LoginIcon />
                                    ログイン
                                </SignInButton>
                            </>
                            : <MenuIcon fontSize="large" sx={{ cursor: "pointer", color: "#e6e7ee" }} onClick={() => setIsMenu(true)} />
                        }
                    </ButtonWrap>

                </MenuWrap>
                <Title><P sx={paragraphSx}>さぁ、どこに行く?</P></Title>
                <Explanation>
                    <P sx={paragraphSx}>下のボタンを押せば、</P>
                    <P sx={paragraphSx}>素敵な場所が貴方を誘う..</P>
                </Explanation>
                <SearchButtonWrap>
                    <SearchPrefectureScreen onClick={() => setIsHiddenTab(!isHiddenTab)}
                        onButtonClick={() => getShigthseeingData()}
                        showValue={searchWord ? searchWord : undefined}></SearchPrefectureScreen>
                </SearchButtonWrap>
                {isHiddenTab === true ?
                    "" :
                    <>
                        <BlackDiv onClick={() => setIsHiddenTab(true)} />
                        <TabPosition>
                            <SelectPrefecturesTab onClick={() => closedTabAction()} />
                        </TabPosition>
                    </>
                }
                {isMenu === true ?
                    <Menu setIsMenu={setIsMenu} setSightseeingData={setSightseeingData} setIsBlack={setIsBlack} />
                    : ""
                }
                {isSignUpScreen === true ?
                    <>
                        <BlackDiv onClick={() => setIsSignUpScreen(false)} />
                        <SignUpScreen_EXT onClick={() => setIsSignUpScreen(false)} />
                    </>
                    : ""
                }
                {isSignInScreen === true ?
                    <>
                        <BlackDiv onClick={() => setIsSignInScreen(false)} />
                        <SignInScreen_EXT onClick={() => setIsSignInScreen(false)} />
                    </>
                    : ""
                }
            </Layout>
        </>
    )
}

export default HeaderTitle;