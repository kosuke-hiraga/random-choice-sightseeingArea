import { FC } from "react";
import styled from 'styled-components';
import { Button } from "@mui/material";
import { styled as st } from "@mui/system";
import { P } from "../../components/Atoms/Typography"
import { ShightseeingData } from "../../types/SightseeingData"
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import { GetSightseeingData_developing } from "../../firebase/logic";
import { getSessionStorage } from "../../util/util";
import { STORAGE_KEY } from "../../util/const";


const BlackDiv = styled.div`
    background:rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 11;
`
const Body = styled.div`
    width: 90%;
    height: 90%;
    display: flex;
    flex-direction: column;
    background-color: rgba(230, 231, 238, 0.8);
    border-radius: 40px;
    position: absolute;
    top: 5%;
    left: 5%;
    right: 5%;
    z-index: 12;
`
const ResultAreaWrap = styled.div`
    display: grid;
    place-items: center;
    margin: 0 auto;
    width: 95%;
    height: 80%;
`

const ResultArea = styled.div`
    width: 100%;
    height: 98%;
    overflow: scroll;
    display: flex;
    flex-wrap: wrap;
    align-content: start;
    justify-content: center;
    border-radius: 40px;
    box-shadow: inset 3px 4px 6px #707070,
                inset -1px -1px 4px #ffffff;
    scrollbar-width: none; //firefox用
    &::-webkit-scrollbar { 
        display: none; //Chrome・Safari・Microsoft Edge用
    }
    //検索結果同士の間隔を少し開ける
    > :nth-child(n){
        margin: 10px 10px;
    }
    @media (max-width: 519px){
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
        place-items: center;
    }
    @media (min-width: 520px) and (max-width: 600px){
        grid-template-columns: repeat(auto-fit, 220px);
    }
`
const SearchButtonWrap = styled.div`
    height: 20%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
`

const ButtonBase = st(Button)`
    display: flex;
    justify-content: space-evenly;
    width: 150px;
    height: 50px;
    border-radius: 42px;
    box-shadow:  2px 3px 3px #707070,
                 -2px -2px 4px #ffffff;
    &:active{
        box-shadow: inset 3px 3px 4px #cfd0d6,
                    inset -3px -3px 4px #fdfeff;
    }
    @media (max-width: 380px){
        width: 100px;
    }
`
const SearchButton = styled(ButtonBase)``
const CloseButton = styled(ButtonBase)``

const result: FC<{
    isBlack: boolean;
    setIsBlack: React.Dispatch<React.SetStateAction<boolean>>;
    children: any,
    setSightseeingData: React.Dispatch<React.SetStateAction<ShightseeingData[]>>
}> = ({ isBlack, setIsBlack, children, setSightseeingData }) => {

    async function reSearch() {
        const Prefectures = getSessionStorage(STORAGE_KEY.PUSHED_PREFECTURE_BUTTON);
        const getData = await GetSightseeingData_developing(Prefectures);
        setSightseeingData(getData);
        sessionStorage.setItem(STORAGE_KEY.PREVIOUSDATA_AT_MAINMENU, JSON.stringify(getData));
    }

    return (
        <>
            <BlackDiv onClick={() => setIsBlack(!isBlack)}></BlackDiv >
            <Body>
                <ResultAreaWrap>
                    <ResultArea>
                        {children}
                    </ResultArea>
                </ResultAreaWrap>
                <SearchButtonWrap>
                    <SearchButton onClick={() => reSearch()}>
                        <ReplayIcon />
                        <P>再検索</P>
                    </SearchButton>
                    <CloseButton onClick={() => setIsBlack(!isBlack)}>
                        <CloseIcon />
                        <P>閉じる</P>
                    </CloseButton >
                </SearchButtonWrap>
            </Body>
        </>
    )
};

export default result;