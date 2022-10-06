import styled from "styled-components"
import { P } from "../../components/Atoms/Typography"
import { Button } from "@mui/material";
import { styled as st } from "@mui/system";
import { ShightseeingData } from "../../types/SightseeingData"
import React, { useContext } from "react"
import { testData } from "../../TestData/testData";
import Device, { ViewportState } from "../../mediaQuary/config";
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from "../../state/LoginProvider";
import { signUp, signIn } from "../../firebase/logic";
import { GetSightseeingData } from "../../firebase/logic";

import Menu from "../Menu";

import { useTest } from "../../hooks/hooks";

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

const SearchButton = st(Button)`
    background-color: #e6e7ee;
    width: 200px;
    height: 200px;
    border-radius: 200px;
    box-shadow:  3px 3px 3px #cfd0d6,
                -3px -3px 3px #fdfeff;
    &:active{
        box-shadow: inset 3px 3px 4px #cfd0d6,
                    inset -3px -3px 4px #fdfeff;
    }
`


const MenuWrap = styled.div`
    grid-template-areas: menu;
    width: 100%;
    height: 100%;
    background-color: green;
    position: relative;
`

const ButtonWrap = styled.div`
    width: 50%;
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


const SignUpButton = st(Button)`
    background-color: #e6e7ee;
    width: 100px;
    height: 50px;
    border-radius: 10px;
    box-shadow:  2px 2px 1px #cfd0d6,
                -2px -2px 1px #fdfeff;
    &:active{
        box-shadow: inset 2px 2px 1px #cfd0d6,
                    inset -2px -2px 1px #fdfeff;
    }
`

const SignInButton = st(SignUpButton)`
`

type SearchButtonComponent = {
    setSightseeingData: React.Dispatch<React.SetStateAction<ShightseeingData[]>>
    sightseeingData: ShightseeingData[];
    isBlack: boolean;
    setIsBlack: React.Dispatch<React.SetStateAction<boolean>>;
    isMenu: boolean;
    setIsMenu: React.Dispatch<React.SetStateAction<boolean>>
}


const HeaderTitle: React.FC<SearchButtonComponent> = ({
    setSightseeingData,
    setIsBlack,
    isBlack,
    isMenu,
    setIsMenu
}) => {

    const Auth = useContext(AuthContext);

    const tt = useTest();

    function Uu() {
        const pp = useTest();
    }

    // function getShigthseeingData(num: number) {
    //     let returnArray: Array<ShightseeingData> = [];
    //     for (let i = 0; i < num; i++) {
    //         returnArray.push(testData[i])
    //     }
    //     setSightseeingData(returnArray);
    //     setIsBlack(true);

    //     sessionStorage.setItem("previousData_at_MainMenu", JSON.stringify(returnArray));
    //     return returnArray;
    // }
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
                                <SignUpButton onClick={() => signUp("test@gmail.com", "ramram")}>新規登録</SignUpButton>
                                <SignInButton onClick={() => signIn("test@gmail.com", "ramram")}>ログイン</SignInButton>
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

            </Layout>
        </>
    )
}

export default HeaderTitle;