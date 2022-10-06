import styled from 'styled-components'
import { P } from '../../components/Atoms/Typography'
import FirstIMG from "./../../img/hitachi_seaside_park.jpeg"
import { ShightseeingData } from "../../types/SightseeingData"
import { Link, Navigate, useNavigate } from "react-router-dom"
import FavoriteIcon from "../../components/Atoms/FavoriteIcon"
import { useContext } from "react"
import { AuthContext } from "../../state/LoginProvider"
import { isFavorite } from "../../util/util"
import {
    update_SessionStorage_favrorite,
    update_firestoreFavorite
} from "../../firebase/logic"


const CardWrap = styled.div`
    position: relative;
`
const Card = styled.div`
    max-width: 200px;
    /* max-height: 80px; */
    height: 70px;
    display: flex;
    border-bottom: 1px solid;
`

const ImgWrap = styled.div`
    width: 35%;
    display: grid;
    place-items: center;
`

const Img = styled.img`
    width: 95%;
    height: 95%;
    
`
const Title = styled.div`
    width: 50%; 
    text-align: center;
    display: grid;
    place-items:  center left;
    p{
        font-size: 12px;
    }
`
const FavoriteIconPosition = styled.div`
    position: absolute;
    top: 10px;
    right: 0px;

    display: flex;
    align-items: center;
`

const SightseeingCard: React.FC<ShightseeingData> = (props) => {
    const navigate = useNavigate();
    const Auth = useContext(AuthContext);

    return (
        // <CardWrap
        //     onClick={() => {
        //         sessionStorage.setItem("isBlack", "true")
        //         navigate(`./SightseeingData/${props.id}`, { state: props })
        //     }}>
        <CardWrap>
            <Card onClick={() => {
                sessionStorage.setItem("isBlack", "true")
                navigate(`./SightseeingData/${props.id}`, { state: props })
            }}>
                <ImgWrap>
                    {/* <Img src={FirstIMG}></Img> */}
                    <Img src={props.imgs[0]}></Img>
                </ImgWrap>
                <Title>
                    <P>{props.title}</P>
                </Title>
            </Card>
            {Auth.isSighIn() === true ?
                <FavoriteIconPosition>
                    {/* <FavoriteIcon favorite={isFavorite(props.id)} /> */}
                    <FavoriteIcon
                        favorite={isFavorite(props.id)}
                        sightseeingID={props.id}
                        onClick={(becomeFavorite: boolean) => {
                            update_SessionStorage_favrorite(props.id, becomeFavorite);
                            update_firestoreFavorite(Auth.currentUser);
                        }} />
                </FavoriteIconPosition>
                : ""}
        </CardWrap>
    )

}

export default SightseeingCard;