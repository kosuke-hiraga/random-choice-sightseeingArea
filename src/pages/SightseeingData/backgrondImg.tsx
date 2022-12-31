import styled from 'styled-components'
import { styled as st } from "@mui/system";

const Background = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: -100;   
`
const IMGBase = styled.div`
    top: 0;
    left: 0;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    filter:blur(3px) brightness(50%);
`

const BackgroundImg: React.FC<{
    img: string
}> = ({ img }) => {
    const IMG1 = st(IMGBase)`
        background-image: url(${img});
    `
    return (
        <Background>
            <IMG1 />
        </Background>
    )
}


export default BackgroundImg;