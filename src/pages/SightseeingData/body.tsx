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
    width: 60px;
    height: 60px;
    border-radius: 400px;
    box-shadow:  3px 4px 4px #707070,
                 -1px -1px 4px #ffffff;
    display: grid;
    place-items: center; 
    background-color: rgba(230, 231, 238, 0.4);

    @media ${Device.mobile}, ${Device.tablet}{
        width: 50px;
        height: 50px;
    }
`
const InfoWrapper = styled.div`
    overflow: scroll;
    
    scrollbar-width: none; //firefox用
    &::-webkit-scrollbar { 
        display: none; //Chrome・Safari・Microsoft Edge用
    }
    width: 100%;
    /* height: 450px; */
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    /* grid-gap: 10px 20px; */
    @media ${Device.mobile}, ${Device.tablet}{
        grid-template-columns: unset;
        grid-template-rows: 1fr 1fr 1fr;
    }
`

const ImgWrapper = styled.div`
    grid-area: img;
    grid-row: 1;
    grid-column:1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 95%;
    height: 100%;
    border-radius: 40px;
    margin: 0 auto;
    @media ${Device.mobile}, ${Device.tablet}{
        width: 90%;
        height: 90%;
        grid-row: 2;
        grid-column:1;
    }
    
`
const Img = styled.img`
    width: 95%;
    height: 95%;
    max-height: 500px;
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
    @media ${Device.mobile}, ${Device.tablet}{
        grid-row: 3;
        grid-column:1;
        gap: 30px;
    }

`

const SightseeingInfo_base = styled.div`
    display: flex;
    align-items: center;
    /* text-shadow: 1px 1px 1px rgba(230, 231, 238. 0.1); */
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

const Explanation = st(SightseeingInfo_base)`
`
const SightseeingInfo_address = st(SightseeingInfo_base)`
`
const SightseeingInfo_access = st(SightseeingInfo_base)`
`
const SightseeingInfo_price = st(SightseeingInfo_base)`
`

const SubTitle = styled.div`
    grid-row: 1;
    grid-column:1;
    width: 95%;
    margin: 10px auto 10px;
    font-weight: bold;
    /* margin-bottom: 15px; */
    p{
        /* width: 95%; */
        font-size: 14px;
    }
`
const SubTitleSX = {
    // borderBottom: "1px solid"
    borderBottom: window.matchMedia(Device.laptop).matches ? "1px solid" : "",
}


const ShightseeingInfoBody: React.FC<ShightseeingData> = (props) => {
    //画像がない場合、画像を差し替える
    for (let i = 0; i < 2; i++) {
        if (typeof props.imgs[i] === 'undefined') {
            props!.imgs[i] = NO_IMAGE;
        }
    }

    return (
        <InfoWrapper>
            {ViewportState === "laptop" ? "" :
                <SubTitle>
                    <P variant="inherit" sx={SubTitleSX}>{props.subTitle}</P>
                    {/* <P variant="inherit" sx={SubTitleSX}>wwwww</P> */}
                </SubTitle>
            }
            <ImgWrapper >
                <Img alt={props.imgs[0]} src={props.imgs[0]}></Img>
            </ImgWrapper>
            <SightseeingInfoWrapper>
                <Explanation>
                    {ViewportState === "mobile" ? "" : <Hole><LightbulbIcon fontSize={IconSize} /></Hole>}
                    <div>
                        <P >{"【解説】"}</P>
                        <P>{props.explanation}</P>
                    </div>
                </Explanation>
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