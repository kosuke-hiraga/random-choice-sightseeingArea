import { useLocation } from "react-router-dom";
import styled from 'styled-components'
import ShightseeingInfoBody from "./body";
import ShightseeingInfoTitle from "./title";

const ShightseeingInfoBodyWrapper = styled.div`
    margin-top: 50px;
`

const Body = styled.div`
    width: 95%;
    margin: 0 auto;   
`

export type ShigtseeingData = {
    title: string,
    subTitle: string,
    explanation: string,
    imgs: Array<string> | Array<undefined>,
    address: string,
    area: string,
    access: string,
    price: string,
    createAt?: object,
    updateAt?: object
}

const SightseeingData = () => {
    const props: ShigtseeingData = useLocation().state as ShigtseeingData;

    return (
        <Body>
            <ShightseeingInfoTitle {...props} />
            <ShightseeingInfoBodyWrapper>
                <ShightseeingInfoBody {...props} />
            </ShightseeingInfoBodyWrapper>
        </Body>
    )
}

export default SightseeingData;