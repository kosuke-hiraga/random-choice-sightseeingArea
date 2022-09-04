import styled from "styled-components"
import { P } from "../../components/Atoms/Typography"
import { Button } from "@mui/material";
import { styled as st } from "@mui/system";
import { ShightseeingData } from "../../types/SightseeingData"
import React from "react"
import { testData } from "../../TestData/testData";
import Device, { ViewportState } from "../../mediaQuary/config";


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
    grid-template-rows: 1fr 0.5fr 1fr;
    grid-template-areas: 
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


type SearchButtonComponent = {
    setSightseeingData: React.Dispatch<React.SetStateAction<ShightseeingData[]>>
    sightseeingData: ShightseeingData[];
    isBlack: boolean;
    setIsBlack: React.Dispatch<React.SetStateAction<boolean>>;
}


const HeaderTitle: React.FC<SearchButtonComponent> = ({
    setSightseeingData,
    setIsBlack,
    isBlack
}) => {
    function getShigthseeingData(num: number) {
        let returnArray: Array<ShightseeingData> = [];
        for (let i = 0; i < num; i++) {
            returnArray.push(testData[i])
        }
        setSightseeingData(returnArray);
        setIsBlack(!isBlack);

        sessionStorage.setItem("previousData_at_MainMenu", JSON.stringify(returnArray));
        // return returnArray;
    }

    return (
        <>
            <Layout>
                <Title><P>さぁ、どこに行く?</P></Title>
                <Explanation>
                    <P>下のボタンを押せば、</P>
                    <P>素敵な場所が貴方を誘う..</P>
                </Explanation>
                <SearchButtonWrap>
                    <SearchButton onClick={() => getShigthseeingData(3)}><P>今すぐ検索!</P></SearchButton>
                </SearchButtonWrap>
            </Layout>
        </>
    )
}

export default HeaderTitle;