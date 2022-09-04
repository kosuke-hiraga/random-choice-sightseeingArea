import styled from 'styled-components'
import { P } from '../../components/Atoms/Typography'
import FirstIMG from "./../../img/hitachi_seaside_park.jpeg"

const CardWrap = styled.div`
    display: flex;
    border-bottom: 1px solid;
`

const ImgWrap = styled.div`
    width: 30%;
    /* background-color: red; */
    display: grid;
    place-items: center;
`

const Img = styled.img`
    /* margin: 0 auto; */
    width: 95%;
    height: 95%;
    
`

const Title = styled.div`
    width: 70%; 
    text-align: center;
    display: grid;
    place-items:  center left;
`

const PR = () => {

    return (
        <CardWrap>
            <ImgWrap>
                <Img src={FirstIMG}></Img>
            </ImgWrap>
            <Title>
                <P>title</P>
            </Title>
        </CardWrap>
    )

}

export default PR;