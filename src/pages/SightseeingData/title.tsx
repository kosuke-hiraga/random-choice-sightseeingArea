import styled from 'styled-components'
import { P } from "../../components/Atoms/Typography";
import Device, { ViewportState } from "../../mediaQuary/config";
// import { ShigtseeingData } from "./index"
import { ShightseeingData } from "../../types/SightseeingData"

const TitleWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    justify-content: space-evenly;
`
const Title = styled.div`
    text-align: center;
    font-weight: bold;
    border-radius: 42px;
    margin: 0px auto;
    /* padding-top: 10px; */
    @media ${Device.mobile} ,${Device.tablet}{
        h5{
            /* font-size: 33px; */
            /* font-size: calc(1.1875rem + ((1vw - 3.2px) * 2)); */
            font-size: calc(1.5875rem + ((1vw - 6.5px) * 2));
        }

    }
`
const SubTitle = styled.div`
    width: 95%;
    margin: 0 auto;
    font-weight: bold;
    margin-bottom: 5px;
    /* p{
        font-size: 14px;
    } */
`

const TitleSX = {
    "fontSize": window.matchMedia(Device.mobile).matches ? "1.5rem" : "",
    borderBottom: window.matchMedia(Device.laptop).matches ? "" : "1px solid",

}
const SubTitleSX = {
    borderBottom: "1px solid"

}

const ShightseeingInfoTitle: React.FC<ShightseeingData> = (props) => {
    return (
        <TitleWrapper>
            <Title>
                <P variant="h5" sx={TitleSX}>{props.title}</P>
            </Title>
            {ViewportState !== "laptop" ? "" :
                <SubTitle>
                    <P variant="inherit" sx={SubTitleSX}>{props.subTitle}</P>
                </SubTitle>
            }
        </TitleWrapper>
    )
}

export default ShightseeingInfoTitle;