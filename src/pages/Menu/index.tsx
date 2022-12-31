import React, { FC, useContext } from "react"
import styled from 'styled-components'
import { P } from "../../components/Atoms/Typography";
import { ShightseeingData } from "../../types/SightseeingData"
import { AuthContext } from '../../state/LoginProvider'
import { getFavoriteData, logOut } from "../../firebase/logic";
import CloseIcon from '@mui/icons-material/Close';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import PersonIcon from '@mui/icons-material/Person';
import ClearIcon from '@mui/icons-material/Clear';
import BaseButton from "../../components/Atoms/BaseButton";
import { STORAGE_KEY } from "../../util/const";

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
`
const FavoriteButton = styled(BaseButton)`
    display: flex;
    justify-content: space-evenly;
`
const LogoutButton = styled(BaseButton)`
    display: flex;
    justify-content: space-evenly;
`
const sx = {
    cursor: "pointer",
    position: "absolute",
    right: 0,
}

const Menu: FC<{
    setIsMenu: React.Dispatch<React.SetStateAction<boolean>>,
    setSightseeingData: React.Dispatch<React.SetStateAction<ShightseeingData[]>>,
    setIsBlack: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ setIsMenu, setSightseeingData, setIsBlack }) => {

    const Auth = useContext(AuthContext);
    async function setFavoriteData() {
        let getData = await getFavoriteData(Auth.currentUser);
        setIsBlack(true);
        sessionStorage.setItem(STORAGE_KEY.PREVIOUSDATA_AT_MAINMENU, JSON.stringify(getData));
        setSightseeingData(getData);
    }

    return (
        <>
            <BlackDiv onClick={() => setIsMenu(false)} />
            <Body>
                <LoginInfo>
                    <PersonIcon sx={{ cursor: "pointer" }} />
                    <P fontSize={"small"}>{Auth.currentUser}でログイン中...</P>
                    <ClearIconPosition>
                        <ClearIcon sx={sx} onClick={() => setIsMenu(false)} />
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