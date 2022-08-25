import React, { useState } from "react"
import styled from 'styled-components'
import SightseeingCard from "./body"
import SearchArea from './header'
import { ShightseeingData } from "../../types/SightseeingData"
import Device from "../../mediaQuary/config";


const SightseeingDataPosition = styled.div`
    width: 90%;
    margin: 0 auto;
    /* background-color: gray; */
    @media ${Device.mobile}{
        width: 100%;
    }
`

const SightseeingDataList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 50px; //test用
`

const MainMenu = () => {
    const DefaultSliderNum: number = 1;
    const [sliderValue, setSliderValue] = useState<number>(DefaultSliderNum);
    // const [sightseeingData, setSightseeingData] = useState<Array<ShightseeingData>>([]);

    //初回時は何も表示せず、二回目以降はセッションストレージに保存されている前回の検索結果を表示する
    let PreviousData_at_MainMenu = sessionStorage.getItem("previousData_at_MainMenu") ?? [] as ShightseeingData[];
    if (typeof PreviousData_at_MainMenu !== "object") {
        PreviousData_at_MainMenu = JSON.parse(PreviousData_at_MainMenu) as Array<ShightseeingData>;
    }
    const [sightseeingData, setSightseeingData] = useState<Array<ShightseeingData>>(PreviousData_at_MainMenu);

    const useStates = {
        sliderValue: sliderValue,
        setSliderValue: setSliderValue,
        sightseeingData: sightseeingData,
        setSightseeingData: setSightseeingData
    }

    // console.log(sightseeingData);

    return (
        <>
            {/* <SearchArea setSliderValue={setSliderValue} sliderValue={sliderValue} defaultSliderNumber={DefaultSliderNum} /> */}
            <SearchArea {...useStates} defaultSliderNumber={DefaultSliderNum} />
            <SightseeingDataPosition>
                <SightseeingDataList>
                    {
                        sightseeingData.map((sightseeingInfo, index) => {
                            // pops.map((sightseeingInfo, index) => {
                            return <SightseeingCard {...sightseeingInfo} key={index} />
                        })
                    }
                </SightseeingDataList>
            </SightseeingDataPosition>
        </>
    )
}


export default MainMenu;