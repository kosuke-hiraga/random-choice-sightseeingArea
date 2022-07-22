// import React from "react";
import { useLocation } from "react-router-dom";
import styled from 'styled-components'
import { style, styled as st } from "@mui/system";
import { P } from "../Atoms/Typography";
import NO_IMAGE from "../../img/NO_IMAGE.png";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PlaceIcon from '@mui/icons-material/Place';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import Device from "../../mediaQuary/config";

const Hole = styled.div`
    width: 75px;
    height: 75px;
    border-radius: 400px;
    box-shadow:  5px 5px 3px #cfd0d6,
                -5px -5px 3px #fdfeff;
    display: grid;
    place-items: center;    
    color: #31344b;
`

const Body = styled.div`
    width: 85%;
    margin: 0 auto;   

    @media ${Device.mobile}{
        background-color: red;
    }
    @media ${Device.tablet}{
        background-color: blue;
    }

`

const TitleWrapper = styled.div`
    margin: 30px;
    border-radius: 42px;
    /* box-shadow: inset 5px 5px 4px #e6e6e6,
                inset -5px -5px 4px #ffffff; */
    box-shadow:  5px 5px 3px #cfd0d6,
                -5px -5px 3px #fdfeff;
`

const Title = styled.div`
    text-align: center;
    /* font-size: 30px; */
    /* font-size: bold; */
    font-weight: bold;

`

const SubTitle = styled.div`
    text-align: center;
`

const InfoWrapper = styled.div`
    margin-top: 50px;
    width: 100%;
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: auto;
    grid-gap: 10px 20px;

    /* justify-items: center;
    align-items: center; */
        /* color: #Fafafa; */
    /* text-shadow:  5px 5px 0px #DEB887,
             -5px -5px 0px #ffffff; */
`

const Explanation = styled.div`
    position: relative;
    text-align: center;
    grid-row: 1;
    grid-column:2;
    display: flex;
    align-items: center;
    justify-content: center;
    /* width: 85%; */
    margin: 0 auto;
    border-radius: 100px;
    height: 100%;
    padding: 0px 30px;

    border-radius: 46px;
    /* background: #fafafa;
    box-shadow:  5px 5px 3px #dfdfdf,
                -5px -5px 3px #ffffff; */
    /* background: #Fafafa;
    box-shadow: inset 5px 5px 4px #e6e6e6,
                inset -5px -5px 4px #ffffff; */
    background: #e6e7ee;
    box-shadow: inset 5px 5px 4px #cfd0d6,
                inset -5px -5px 4px #fdfeff;
    
    ${Hole} {
        position: absolute;
        top: 10%;
    }
`

const ImgWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    /* width: 180px; 本の幅 */
    position: relative;
    box-shadow: 10px 15px 22px -5px rgba(0, 0, 0, 0.2),
                0 0 2px rgba(0, 0, 0, 0.15); /* 周囲の影 */
    border-radius: 40px; 

    /* background: #Fafafa;
    box-shadow: inset 5px 5px 4px #e6e6e6,
                inset -5px -5px 4px #ffffff; */
    background: #e6e7ee;
    box-shadow: inset 5px 5px 4px #cfd0d6,
                inset -5px -5px 4px #fdfeff;

    :after{
        content: '';
        position: absolute; /* 親要素に重なるように */
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        /* 👇白の透明度を調整したグラデーション */
        background: linear-gradient(
            -90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.1) 80%,
            rgba(255, 255, 255, 0.4) 94%,
            rgba(255, 255, 255, 0.5) 96%,
            rgba(255, 255, 255, 0) 100%
        )
    }
`

const Img = styled.img`
    width: 95%;
    height:95%;
    max-height: 500px;
    border-radius: 100px;
    display: block;
    border-radius: 40px; 
    /* border: solid 6px #e6e7ee; */
`

const SightseeingInfoWrapper = styled.div`
    grid-row: 2;
    grid-column:1;
    display: flex;
    flex-direction: column;
    /* align-items: space-evenly; */
    justify-content: space-evenly; 
    /* width: 80%; */
    

    background-color: #FDFCF5;
    border-radius: 100px;
    height: 100%;
    padding: 0px 30px;

    border-radius: 46px;
    /* background: #fafafa; */
    background: #e6e7ee;
    /* color: #423ace; */
    /* box-shadow: inset 5px 5px 4px #e6e6e6,
                inset -5px -5px 4px #ffffff; */
    background: #e6e7ee;
    box-shadow: inset 5px 5px 4px #cfd0d6,
                inset -5px -5px 4px #fdfeff;
    

`

const SightseeingInfo_address = styled.div`
    display: flex;
    margin: 0 10px;
    div{
        margin-left: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`
const SightseeingInfo_access = styled.div`
    display: flex;
    div{
        
        margin-left: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`
const SightseeingInfo_price = styled.div`
    display: flex;
    div{
        max-width: 70%;
        margin-left: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`

const Test = () => {
    const props = useLocation().state;

    //画像がない場合、画像を差し替える
    for (let i = 0; i < 2; i++) {
        if (props.imgs[i] === undefined) {
            props.imgs[i] = NO_IMAGE;
        }
    }

    return (
        <>
            {window.matchMedia(Device.mobile).matches ? <div>unnnnn</div> : ""}
            <Body>
                <TitleWrapper>
                    <Title>
                        <P variant="h4">{props.title}</P>
                    </Title>
                    <SubTitle>
                        <P variant="h6">{"~" + props.subTitle + "~"}</P>
                    </SubTitle>
                </TitleWrapper>

                <InfoWrapper>
                    <ImgWrapper >
                        <Img alt={props.imgs[0]} src={props.imgs[0]}></Img>
                    </ImgWrapper>
                    <Explanation>
                        <Hole><LightbulbIcon fontSize="large" /></Hole>
                        <P>{props.explanation}</P>
                    </Explanation>
                    <ImgWrapper >
                        <Img alt={props.imgs[1]} src={props.imgs[1]}></Img>
                    </ImgWrapper>
                    <SightseeingInfoWrapper>
                        <SightseeingInfo_address>
                            <Hole><PlaceIcon fontSize="large" /></Hole>
                            <div>
                                <P>{"【住所】"}</P>
                                <P>{props.address}</P>
                            </div>
                        </SightseeingInfo_address>
                        <SightseeingInfo_access>
                            <Hole><TrendingUpIcon fontSize="large" /></Hole>
                            <div>
                                <P>{"【アクセス】"}</P>
                                <P>{props.access}</P>
                            </div>
                        </SightseeingInfo_access>
                        <SightseeingInfo_price>
                            <Hole><CurrencyYenIcon fontSize="large" /></Hole>
                            <div>
                                <P>{"【料金】"}</P>
                                <P>{props.price}</P>
                            </div>
                        </SightseeingInfo_price>
                    </SightseeingInfoWrapper>
                </InfoWrapper>


            </Body>
        </>
    )
}

export default Test;