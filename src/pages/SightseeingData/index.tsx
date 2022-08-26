import { useLocation, useNavigate } from "react-router-dom";
import styled from 'styled-components'
import ShightseeingInfoBody from "./body";
import ShightseeingInfoTitle from "./title";
import { ShightseeingData } from "../../types/SightseeingData"

const ShightseeingInfoBodyWrapper = styled.div`
    margin-top: 20px;
    height: 100%;
`

const Body = styled.div`
    width: 95%;
    margin: 0 auto;
    height: 100%;
`

const SightseeingData = () => {
    const navigate = useNavigate();
    const props: ShightseeingData = useLocation().state as ShightseeingData;
    console.log(props);
    console.log(useLocation());

    window.addEventListener("popstate", () => {
        console.log("popstate");
        navigate("/", { state: props })
    });
    // window.addEventListener("popstate", () => console.log("tete"));

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