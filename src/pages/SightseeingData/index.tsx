import { useLocation, useNavigate } from "react-router-dom";
import styled from 'styled-components'
import ShightseeingInfoBody from "./body";
import ShightseeingInfoTitle from "./title";
import { ShightseeingData } from "../../types/SightseeingData"
// import Result from "./result";
import BackgroundImg from "./backgrondImg";

const BodyPosition = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`

const Body = styled.div`
    width: 95%;
    margin: 0 auto;
    /* height: 90vh; */
    height: 93%;
    /* background-color: red; */
    background-color: rgba(230, 231, 238, 0.7);
    border-radius: 10px;
`

const ShightseeingInfoTitlePosition = styled.div`
    height: 15%;
    /* background-color: yellow; */

`
const ShightseeingInfoBodyPosition = styled.div`
    height: 85%;
    /* background-color: green; */
`


const SightseeingData = () => {
    const navigate = useNavigate();
    const props: ShightseeingData = useLocation().state as ShightseeingData;
    console.log(props);
    console.log(props.imgs);
    console.log(useLocation());

    window.addEventListener("popstate", () => {
        console.log("popstate");
        navigate("/test", { state: props })
    });
    // window.addEventListener("popstate", () => console.log("tete"));

    return (
        <>
            <BodyPosition>
                <Body>
                    <ShightseeingInfoTitlePosition>
                        <ShightseeingInfoTitle {...props} />
                    </ShightseeingInfoTitlePosition>
                    <ShightseeingInfoBodyPosition>
                        <ShightseeingInfoBody {...props} />
                    </ShightseeingInfoBodyPosition>
                    {/* <Result /> */}
                </Body>
            </BodyPosition>

            <BackgroundImg img={props.imgs[0]!} />
        </>
    )
}

export default SightseeingData;