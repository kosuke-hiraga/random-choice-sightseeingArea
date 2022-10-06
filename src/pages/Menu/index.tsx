import React, { FC, useContext, useState } from "react"
import { Button } from "@mui/material";
import styled from 'styled-components'
import { styled as st } from "@mui/system";
import { P } from "../../components/Atoms/Typography";
import { ViewportState } from "../../mediaQuary/config";
import { ShightseeingData } from "../../types/SightseeingData"

import { AuthContext } from '../../state/LoginProvider'
import { logOut } from "../../firebase/logic";


import CloseIcon from '@mui/icons-material/Close';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import PersonIcon from '@mui/icons-material/Person';
import ClearIcon from '@mui/icons-material/Clear';
import { getFavoriteData } from "../../firebase/logic";

const BlackDiv = styled.div`
    background:rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
`

const Body = styled.div`
    position: absolute;
    z-index: 20;
    right: 0%;


    width: 300px;
    height: 95%;
    background-color: #e6e7ee;
    /* background-color: red; */
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
`

const LoginInfo = styled.div`
    width: 100%;
    height: 50px;   
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const ClearIconPosition = styled.div`
    width: 50px;
    height: 100%;
    position: relative;
    /* background-color: gray; */
`


const FavoriteButton = st(Button)`
    background-color: #e6e7ee;
    width: 150px;
    height: 50px;
    border-radius: 10px;
    box-shadow:  2px 2px 1px #cfd0d6,
                -2px -2px 1px #fdfeff;
    &:active{
        box-shadow: inset 2px 2px 1px #cfd0d6,
                    inset -2px -2px 1px #fdfeff;
    }
`

const unti = {
    position: "absolute",
    right: 0,
}

const LogoutButton = st(FavoriteButton)`
`




// const Auth = useContext(AuthContext);
// async function reSearch() {
//     let getData = await GetSightseeingData(Math.ceil(Math.random() * 10));
//     // console.log(getData);
//     setSightseeingData(getData);
// }


const Menu: FC<{
    setIsMenu: React.Dispatch<React.SetStateAction<boolean>>,
    setSightseeingData: React.Dispatch<React.SetStateAction<ShightseeingData[]>>,
    setIsBlack: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setIsMenu, setSightseeingData, setIsBlack }) => {
    const Auth = useContext(AuthContext);


    async function setFavoriteData() {
        let getData = await getFavoriteData(Auth.currentUser);
        setIsBlack(true);
        setSightseeingData(getData);
    }

    return (
        <>
            <BlackDiv />
            <Body>
                <LoginInfo>
                    <PersonIcon />
                    <P fontSize={"small"}>{Auth.currentUser}でログイン中...</P>
                    <ClearIconPosition>
                        <ClearIcon sx={unti} onClick={() => setIsMenu(false)} />
                        {/* <ClearIcon /> */}
                    </ClearIconPosition>

                </LoginInfo>
                <FavoriteButton onClick={setFavoriteData}>
                    <StarBorderIcon />
                    お気に入り
                </FavoriteButton>
                <LogoutButton onClick={logOut}>
                    <CloseIcon />
                    ログアウト
                </LogoutButton>
                {/* 下記のdivはjustfy-content: space-evenlyをうまく均等化させる為のダミーである */}
                <div></div>
            </Body>

        </>
    )
}


export default Menu;