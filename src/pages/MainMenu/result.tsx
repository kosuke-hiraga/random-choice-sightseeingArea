import react, { FC, ReactNode } from "react";
import styled from 'styled-components';
import { Slider, Button } from "@mui/material";
import { style, styled as st } from "@mui/system";
import { P } from "../../components/Atoms/Typography"
import { getShigthseeingData } from "../../hooks/testHooks";
import { ShightseeingData } from "../../types/SightseeingData"
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';



const BlackDiv = styled.div`
    /* background-color: black; */
    background:rgba(0, 0, 0, 0.6);
    /* opacity: 0.5; */
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

    /* background-color: #e6e7ee; */
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
    /* padding-top: 10px; */
    margin: 0 auto;
    width: 95%;
    height: 80%;
    //380pxあたりで再検索ボタンと閉じるボタンが重なるのでそれを防ぐ
    @media (max-width: 380px){
        height: 70%;
    }
`

const ResultArea = styled.div`
    width: 100%;
    height: 98%;
    /* background-color: red; */
    overflow: scroll;
    display: flex;
    flex-wrap: wrap;
    align-content: start;
    /* justify-content: start; */
    justify-content: center;
    border-radius: 40px;
    /* box-shadow:  inset 1px 4px 3px #cfd0d6,
                 inset -2px -2px 3px #fdfeff; */
    box-shadow: inset 3px 4px 6px #707070,
                inset -1px -1px 4px #ffffff;
    scrollbar-width: none; //firefox用


    &::-webkit-scrollbar { 
        display: none; //Chrome・Safari・Microsoft Edge用
    }
    
    //検索結果同士の間隔を少し開ける
    > :nth-child(n){
        margin: 10px 20px;
    }
    @media (max-width: 380px){
        justify-content: center;
    }
    //561pxまで折り返しポイントまで辿り着かない為
    @media (max-width: 562px){
        justify-content: center;
    }
`


const SearchButtonWrap = styled.div`
    height: 20%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
    //380pxあたりで再検索ボタンと閉じるボタンが重なるのでそれを防ぐ
    @media (max-width: 380px){
        height: 30%;
        flex-direction: column;
    }
`

const SearchButton = st(Button)`
    display: flex;
    // flex-direction: space-evenly;
    justify-content: space-evenly;
    width: 150px;
    // width: 400px;
    height: 50px;
    border-radius: 42px;
    // box-shadow:  3px 3px 3px #cfd0d6,
    //             -3px -3px 3px #fdfeff;
    box-shadow:  2px 3px 3px #707070,
                 -2px -2px 4px #ffffff;
    &:active{
        box-shadow: inset 3px 3px 4px #cfd0d6,
                    inset -3px -3px 4px #fdfeff;
    }
`



// const result: FC<ReactNode> = ({ children }) => {
// const result: FC<ReactNode> = (props) => {
// const result = (props: any, {isBlack: boolean, setIsBlack: any}) => {
const result: FC<{
    isBlack: boolean;
    setIsBlack: React.Dispatch<React.SetStateAction<boolean>>;
    children: any,
    setSightseeingData: React.Dispatch<React.SetStateAction<ShightseeingData[]>>
}> = ({ isBlack, setIsBlack, children, setSightseeingData }) => {

    function reSearch() {
        getShigthseeingData(Math.ceil(Math.random() * 10));
        let getData = sessionStorage.getItem("previousData_at_MainMenu") ?? [] as ShightseeingData[];
        if (typeof getData !== "object") {
            getData = JSON.parse(getData) as Array<ShightseeingData>;
        }
        console.log(getData);
        setSightseeingData(getData);
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

                    <SearchButton onClick={() => setIsBlack(!isBlack)}>
                        <CloseIcon />
                        <P>閉じる</P>
                    </SearchButton>
                </SearchButtonWrap>
            </Body>

        </>
    )
};

export default result;