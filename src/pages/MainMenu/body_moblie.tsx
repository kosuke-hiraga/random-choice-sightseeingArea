import styled from 'styled-components'
import { P } from '../../components/Atoms/Typography'
import FirstIMG from "./../../img/hitachi_seaside_park.jpeg"
import { ShightseeingData } from "../../types/SightseeingData"
import { Link, Navigate, useNavigate } from "react-router-dom"

const CardWrap = styled.div`
    max-width: 200px;
    max-height: 80px;
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
    p{
        font-size: 12px;
    }
`

const SightseeingCard: React.FC<ShightseeingData> = (props) => {
    const navigate = useNavigate();

    return (
        <CardWrap
            onClick={() => {
                sessionStorage.setItem("isBlack", "true")
                navigate(`./SightseeingData/${props.id}`, { state: props })
            }}>
            <ImgWrap>
                <Img src={FirstIMG}></Img>
            </ImgWrap>
            <Title>
                <P>{props.title}</P>
            </Title>
        </CardWrap>
    )

}

export default SightseeingCard;