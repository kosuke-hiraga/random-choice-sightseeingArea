import styled from 'styled-components'
import { style, styled as st } from "@mui/system";
import NO_IMAGE from "../../img/NO_IMAGE.png";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PlaceIcon from '@mui/icons-material/Place';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import Device, { ViewportState } from "../../mediaQuary/config";
import { P } from "../../components/Atoms/Typography";
// import { ShigtseeingData } from "./index"
import { ShightseeingData } from "../../types/SightseeingData"

let IconSize: "small" | "inherit" | "large" | "medium" | undefined;
switch (ViewportState) {
    case "mobile":
        IconSize = "small"; break;
    case "tablet":
        IconSize = "large"; break;
    case "laptop":
        IconSize = "large"; break;
}

const Hole = styled.div`
    width: 75px;
    height: 75px;
    border-radius: 400px;
    box-shadow:  5px 5px 3px #cfd0d6,
                -5px -5px 3px #fdfeff;
    display: grid;
    place-items: center;    
    color: #31344b;

    @media ${Device.mobile}{
        width: 50px;
        height: 50px;
    }
`


const InfoWrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px 20px;
    @media ${Device.mobile}, ${Device.tablet}{
        grid-template-rows: 1fr 1fr 1fr 1fr;
        grid-template-columns: 1fr;
    }
`

const Explanation = styled.div`
    position: relative;
    text-align: center;
    grid-row: 1;
    grid-column:2;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    height: 100%;
    padding: 0 30px;
    border-radius: 46px;
    background: #e6e7ee;
    box-shadow: inset 5px 5px 4px #cfd0d6,
                inset -5px -5px 4px #fdfeff;
    ${Hole} {
        position: absolute;
        top: 10%;
        @media ${Device.mobile}{
            top: 5%;
        }
    }
    @media ${Device.mobile}, ${Device.tablet}{
        grid-row: unset;
        grid-column: unset;
    }
`

const ImgWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;
    box-shadow: 10px 15px 22px 5px rgba(0, 0, 0, 0.2),
                0 0 2px rgba(0, 0, 0, 0.15); /* 周囲の影 */
    border-radius: 40px;
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
    height: 95%;
    max-height: 500px;
    border-radius: 100px;
    display: block;
    border-radius: 40px;
`

const SightseeingInfoWrapper = styled.div`
    grid-row: 2;
    grid-column:1;
    display: flex;
    flex-direction: column;
    /* align-items: space-evenly; */
    justify-content: space-evenly;
    background-color: #FDFCF5;
    border-radius: 100px;
    /* height: 100%; */
    height: 500px;
    padding: 0px 30px;

    border-radius: 46px;
    background: #e6e7ee;
    box-shadow: inset 5px 5px 4px #cfd0d6,
                inset -5px -5px 4px #fdfeff;
    @media ${Device.mobile}, ${Device.tablet}{
        grid-row: unset;
        grid-column: unset;
    }

`

const SightseeingInfo_base = styled.div`
    display: flex;
    @media ${Device.tablet}, ${Device.laptop}{
        > :nth-Child(2){
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 30px;
            max-width: 70%; //これが無いとholeが潰れてしまう
        }
    }
`

const SightseeingInfo_address = st(SightseeingInfo_base)`
`
const SightseeingInfo_access = st(SightseeingInfo_base)`
`
const SightseeingInfo_price = st(SightseeingInfo_base)`
`

const ShightseeingInfoBody: React.FC<ShightseeingData> = (props) => {
    //画像がない場合、画像を差し替える
    for (let i = 0; i < 2; i++) {
        if (typeof props.imgs[i] === 'undefined') {
            props!.imgs[i] = NO_IMAGE;
        }
    }

    return (
        <InfoWrapper>
            <ImgWrapper >
                <Img alt={props.imgs[0]} src={props.imgs[0]}></Img>
            </ImgWrapper>
            <ImgWrapper >
                <Img alt={props.imgs[0]} src={props.imgs[0]}></Img>
            </ImgWrapper>
            <Explanation>
                <Hole><LightbulbIcon fontSize={IconSize} /></Hole>
                <P>{props.explanation}</P>
            </Explanation>
            <SightseeingInfoWrapper>
                <SightseeingInfo_address>
                    {ViewportState === "mobile" ? "" : <Hole><PlaceIcon fontSize={IconSize} /></Hole>}
                    {/* {window.matchMedia(Device.mobile).matches ? "" : <Hole><PlaceIcon fontSize={IconSize} /></Hole>} */}
                    <div>
                        <P>{"【住所】"}</P>
                        <P>{props.address}</P>
                    </div>
                </SightseeingInfo_address>
                <SightseeingInfo_access>
                    {ViewportState === "mobile" ? "" : <Hole><TrendingUpIcon fontSize={IconSize} /></Hole>}
                    <div>
                        <P>{"【アクセス】"}</P>
                        <P>{props.access}</P>
                    </div>
                </SightseeingInfo_access>
                <SightseeingInfo_price>
                    {ViewportState === "mobile" ? "" : <Hole><CurrencyYenIcon fontSize={IconSize} /></Hole>}
                    <div>
                        <P>{"【料金】"}</P>
                        <P>{props.price}</P>
                    </div>
                </SightseeingInfo_price>
            </SightseeingInfoWrapper>
        </InfoWrapper>
    )
}

export default ShightseeingInfoBody