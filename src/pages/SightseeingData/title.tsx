import styled from 'styled-components'
import { P } from "../../components/Atoms/Typography";
import Device from "../../mediaQuary/config";
import { ShigtseeingData } from "./index"

const TitleWrapper = styled.div`
    margin-top: 30px;
`

const Title = styled.div`
    text-align: center;
    font-weight: bold;
    border-radius: 42px;
    box-shadow:  5px 5px 3px #cfd0d6,
                -5px -5px 3px #fdfeff;
    margin: 0px auto;
`

const SubTitle = styled.div`
    font-weight: bold;
    text-align: left;
    margin: 30px auto 0;
`

const ShightseeingInfoTitle: React.FC<ShigtseeingData> = (props) => {
    return (
        <TitleWrapper>
            <Title>
                <P variant="h4" sx={{
                    "fontSize": window.matchMedia(Device.mobile).matches ? "1.5rem" : "",
                    padding: "10px 0"
                }}>{props.title}</P>
            </Title>
            <SubTitle>
                <P variant="inherit" sx={{
                    "borderBottom": "1px solid",
                }}>{props.subTitle}</P>
            </SubTitle>
        </TitleWrapper>
    )
}

export default ShightseeingInfoTitle;