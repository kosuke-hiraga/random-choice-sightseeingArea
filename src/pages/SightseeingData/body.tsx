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
        IconSize = "small"; break;
    case "laptop":
        IconSize = "large"; break;
}

const Hole = styled.div`
    /* width: 75px;
    height: 75px; */
    width: 60px;
    height: 60px;
    border-radius: 400px;
    box-shadow:  3px 3px 3px #cfd0d6,
                -3px -3px 3px #fdfeff;
    display: grid;
    place-items: center;    
    color: #31344b;

    @media ${Device.mobile}, ${Device.tablet}{
        width: 50px;
        height: 50px;
    }
`


const InfoWrapper = styled.div`
    width: 100%;
    height: 450px;
    /* height: 100%; */
    display: grid;
    grid-template-columns: 1fr 1fr;
    /* grid-gap: 10px 20px; */
    @media ${Device.mobile}, ${Device.tablet}{
        /* grid-template: 
        "img"
        "sightseeingInfo"; */
        grid-template-columns: unset;
        grid-template-rows: 1fr 1fr;
    }
`

const ImgWrapper = styled.div`
    grid-area: img;
    grid-row: 1;
    grid-column:1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    /* box-shadow: 10px 15px 22px 5px rgba(0, 0, 0, 0.2), */
                /* 0 0 2px rgba(0, 0, 0, 0.15); 周囲の影 */
    border-radius: 40px;
    background: #e6e7ee;
    box-shadow: inset 5px 5px 4px #cfd0d6,
                inset -5px -5px 4px #fdfeff;
    
    margin: 0 auto;
    @media ${Device.mobile}, ${Device.tablet}{
        width: 80%;
        height: 80%;
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
    grid-area: sightseeingInfo;
    grid-row: 1;
    grid-column:2;

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
    padding: 0px 30px;
    /* background: #e6e7ee; */
    /* box-shadow: inset 5px 5px 4px #cfd0d6,
                inset -5px -5px 4px #fdfeff; */
    @media ${Device.mobile}, ${Device.tablet}{
        /* grid-row: unset;
        grid-column: unset; */
    grid-row: 2;
    grid-column:1;
    }

`

const SightseeingInfo_base = styled.div`
    display: flex;
    align-items: center;
    @media ${Device.tablet}, ${Device.laptop}{
        > :nth-Child(2){
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 30px;
            max-width: 80%; //これが無いとholeが潰れてしまう
        }
    }
`

const Explanation = styled.div`
    position: relative;
    text-align: center;
    grid-area: explanation;
    /* grid-row: 1;
    grid-column:2; */
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    height: 100%;
    padding: 0 30px;
    border-radius: 46px;
    background: #e6e7ee;
    /* box-shadow: inset 5px 5px 4px #cfd0d6,
                inset -5px -5px 4px #fdfeff; */
    ${Hole} {
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

const Explanation2 = st(SightseeingInfo_base)`
    // grid-area: explanation;
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
            {/* <ImgWrapper >
                <Img alt={props.imgs[0]} src={props.imgs[0]}></Img>
            </ImgWrapper> */}
            {/* <Explanation>
                <Hole><LightbulbIcon fontSize={IconSize} /></Hole>
                <P>{props.explanation}</P>
            </Explanation> */}
            <SightseeingInfoWrapper>
                <Explanation2>
                    {ViewportState === "mobile" ? "" : <Hole><LightbulbIcon fontSize={IconSize} /></Hole>}
                    <div>
                        <P>{"【解説】"}</P>
                        <P>{props.explanation}</P>
                    </div>
                </Explanation2>
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