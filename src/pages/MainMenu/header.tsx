import styled from "styled-components"
import { P } from "../../components/Atoms/Typography"
import { Slider, Button } from "@mui/material";
import { styled as st } from "@mui/system";
import { ShightseeingData } from "../../types/SightseeingData"
import React from "react"
import { testData } from "../../TestData/testData";
import Device, { ViewportState } from "../../mediaQuary/config";
import TOKYOIMG from "../../img/東京タワートリミング.jpg";

const Header = styled.div`
    width: 100%;
    height: 100px;
    border-radius: 42px;
    /* box-shadow:  5px 5px 3px #cfd0d6,
                -5px -5px 3px #fdfeff; */
    margin: 0px auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    @media ${Device.mobile}{
        flex-direction: column-reverse;
    }

`

const Title = styled.div`
width: 100%;
height: 300px;
`

const Img = styled.img`
    width: 100%;
    height: 100%;
`


const SearchButtonWrap = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`

const SearchButton = st(Button)`
    width: 150px;
    width: 400px;
    height: 50px;
    border-radius: 42px;
    box-shadow:  5px 5px 3px #cfd0d6,
                -5px -5px 3px #fdfeff;
    
    &:active{
        box-shadow: inset 5px 5px 4px #cfd0d6,
                    inset -5px -5px 4px #fdfeff;
    }
`

const SliderWrap = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    flex-direction: space-between;
    /* flex-direction: column; */
`

const SliderToSetNumberOfSightseeingSpots = st(Slider)(({ theme }) => ({
    width: "200px",
    color: "#e6e7ee",
    "& .MuiSlider-rail": {
        color: "#0f0f10",
        opacity: "0.2",
        boxShadow: "1px 1px 1px #cfd0d6, -1px -1px 1px #fdfeff",
    },
    "& .MuiSlider-track": {
        color: "#0f0f10",
        opacity: "0.5",
        boxShadow: "1px 3px 1px #cfd0d6, -1px -3px 1px #fdfeff",

    },
    "& .MuiSlider-thumb": {
        boxShadow: "2px 2px 1px #cfd0d6, -2px -2px 1px #fdfeff",
        height: "100%",
        width: "15%"
    }
}));


const SearchArea: React.FC<{
    setSliderValue: React.Dispatch<React.SetStateAction<number>>;
    sliderValue: number;
    setSightseeingData: React.Dispatch<React.SetStateAction<ShightseeingData[]>>
    sightseeingData: ShightseeingData[];
    defaultSliderNumber: number;
}> = ({ setSliderValue, sliderValue, setSightseeingData, sightseeingData, defaultSliderNumber }) => {

    function updateSliderValue(e: Event | React.SyntheticEvent<Element, Event>, value: number | number[]) {
        console.log(value);
        if (typeof value === "object") {
            return;
        }
        setSliderValue(value);
    }

    function getShigthseeingData(num: number) {
        let returnArray: Array<ShightseeingData> = [];
        for (let i = 0; i < num; i++) {
            returnArray.push(testData[i])
        }
        // console.log(returnArray);
        setSightseeingData(returnArray);

        sessionStorage.setItem("previousData_at_MainMenu", JSON.stringify(returnArray));
        // return returnArray;
    }

    return (
        <>
            <Title>
                {/* <img src="../../img/東京タワートリミング.jpg"></img> */}
                {/* <img src={TOKYOIMG}></img> */}
                <Img src={TOKYOIMG}></Img>
            </Title>
            <Header>
                <SearchButtonWrap>
                    <SearchButton
                        onMouseDown={() => getShigthseeingData(sliderValue)}>
                        <P>Search</P>
                    </SearchButton>
                </SearchButtonWrap>

                <SliderWrap>
                    <SliderToSetNumberOfSightseeingSpots
                        defaultValue={defaultSliderNumber}
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={1}
                        max={10}
                        disableSwap={true}
                        onChangeCommitted={updateSliderValue}
                    ></SliderToSetNumberOfSightseeingSpots>
                    <P fontSize={"large"}>{`${sliderValue} 件を表示`}</P>
                </SliderWrap>
            </Header>
        </>

    )
}

export default SearchArea;