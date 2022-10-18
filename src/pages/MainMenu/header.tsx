import React, { useContext } from "react"
import styled from "styled-components"
import { ShightseeingData } from "../../types/SightseeingData"
import { AuthContext } from "../../state/LoginProvider";
import { signUp, signIn, GetSightseeingData } from "../../firebase/logic";
import Menu from "../Menu";
import { styled as st } from "@mui/system";
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MenuIcon from '@mui/icons-material/Menu';
import { P } from "../../components/Atoms/Typography"
import SignUpScreen from "../../components/Organisms/SignUpScreen";
import SignInScreen from "../../components/Organisms/SignInScreen";
import BaseButton from "../../components/Atoms/BaseButton";

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* background-color: red; */
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
    /* height: 50%;
    height: 50%; */
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
    /* width: 100%;
    height: 50%; */
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

const SearchButton = st(BaseButton)`
    width: 200px;
    height: 200px;
    border-radius: 200px;
`




const MenuWrap = styled.div`
    grid-template-areas: menu;
    width: 100%;
    height: 100%;
    background-color: green;
    position: relative;
`

const ButtonWrap = styled.div`
    /* width: 50%; */
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    /* background-color: blue; */
    display: flex;
    align-items: center;
    justify-content: end;
    
    gap: 10px;
`

const SignUpButton = styled(BaseButton)`
    display: flex;
    justify-content: space-evenly;
`
const SignInButton = styled(BaseButton)`
    display: flex;
    justify-content: space-evenly;
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
    setIsSignInScreen: React.Dispatch<React.SetStateAction<boolean>>
}


const HeaderTitle: React.FC<MainMenuHeaderComponent> = ({
    setSightseeingData,
    setIsBlack,
    isBlack,
    isMenu,
    setIsMenu,
    isSignUpScreen,
    setIsSignUpScreen,
    isSignInScreen,
    setIsSignInScreen
}) => {
    const Auth = useContext(AuthContext);

    async function getShigthseeingData() {
        let getData = await GetSightseeingData(Math.ceil(Math.random() * 10));
        // console.log(getData);
        setIsBlack(true);
        setSightseeingData(getData);
        sessionStorage.setItem("previousData_at_MainMenu", JSON.stringify(getData));
    }


    return (
        <>
            <Layout>
                <MenuWrap>
                    <ButtonWrap>
                        {Auth.currentUser === "logout" ?
                            <>
                                <SignUpButton onClick={() => setIsSignUpScreen(true)} width={100}>
                                    <PersonAddIcon />
                                    新規登録
                                </SignUpButton>
                                <SignInButton onClick={() => setIsSignInScreen(true)} width={100}>
                                    <LoginIcon />
                                    ログイン
                                </SignInButton>
                            </>
                            : <MenuIcon fontSize="large" sx={{ color: "red" }} onClick={() => setIsMenu(true)} />
                        }
                    </ButtonWrap>

                </MenuWrap>
                <Title><P>さぁ、どこに行く?</P></Title>
                <Explanation>
                    <P>下のボタンを押せば、</P>
                    <P>素敵な場所が貴方を誘う..</P>
                </Explanation>
                <SearchButtonWrap>
                    <SearchButton onClick={() => getShigthseeingData()}><P>今すぐ検索!</P></SearchButton>
                </SearchButtonWrap>

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