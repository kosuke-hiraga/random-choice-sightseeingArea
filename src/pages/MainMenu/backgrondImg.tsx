import styled, { keyframes } from 'styled-components'
import { styled as st } from "@mui/system";
import FirstIMG from "./../../img/hitachi_seaside_park.jpeg"
import SecondIMG from "./../../img/katsuyama_park.jpeg"
import ThirdIMG from "./../../img/kokonoe_yume_otsurihashi.jpeg"
import FourthIMG from "./../../img/skytree.jpeg"
import FifthIMG from "./../../img/umeda_sky_building.jpeg"

const fade = keyframes`
    0% {
        opacity: 0;
    }

    5% {
        opacity: 1;
    }

    25% {
        opacity: 1;
    }

    30% {
        opacity: 0;
    }

    100% {
        opacity: 0;
    }
`

const Background = styled.div`
    width: 100%;
    height: 100vh;
    animation-name: ${fade};
    position: relative;
    /* position: absolute; */
    /* top: 0;
    left: 0; */
    z-index: 1;   
`
const IMGBase = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    opacity: 0;
    animation: ${fade} 15s infinite;
    //ぼかしを入れるかは検討中
    /* filter: blur(6px); */
    filter:brightness(50%);
`
const IMG1 = st(IMGBase)`
    background-image: url(${FirstIMG});
`
const IMG2 = st(IMGBase)`
    background-image: url(${SecondIMG});
    animation-delay: 3s;
`
const IMG3 = st(IMGBase)`
    background-image: url(${ThirdIMG});
    animation-delay: 6s;
`
const IMG4 = st(IMGBase)`
    background-image: url(${FourthIMG});
    animation-delay: 9s;
`
const IMG5 = st(IMGBase)`
    background-image: url(${FifthIMG});
    animation-delay: 12s;
`

const BackgroundImg = () => {
    return (
        <Background>
            <IMG1 />
            <IMG2 />
            <IMG3 />
            <IMG4 />
            <IMG5 />
        </Background>
    )
}


export default BackgroundImg;