import styled, { keyframes } from 'styled-components'
import { styled as st } from "@mui/system";
import FirstIMG from "./../../img/hitachi_seaside_park.jpeg"
import SecondIMG from "./../../img/katsuyama_park.jpeg"
import ThirdIMG from "./../../img/kokonoe_yume_otsurihashi.jpeg"
import FourthIMG from "./../../img/skytree.jpeg"
import FifthIMG from "./../../img/umeda_sky_building.jpeg"

const Background = styled.div`
    width: 100%;
    height: 100vh;
    /* position: absolute; */
    position: fixed;
    top: 0;
    z-index: -100;   
    /* background-color: red; */
`
const IMGBase = styled.div`
    /* position: absolute; */
    /* z-index: -; */
    top: 0;
    left: 0;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    //ぼかしを入れるかは検討中
    /* filter: blur(6px); */
    filter:blur(3px) brightness(50%);
`
// const IMG1 = st(IMGBase)`
//     background-image: url(${FirstIMG});
// `
// const IMG2 = st(IMGBase)`
//     background-image: url(${SecondIMG});
//     animation-delay: 3s;
// `


const BackgroundImg: React.FC<{
    img: string
}> = ({ img }) => {

    const IMG1 = st(IMGBase)`
        background-image: url(${img});
    `

    return (
        <Background>
            <IMG1 />
            {/* <IMG2 /> */}
        </Background>
    )
}


export default BackgroundImg;