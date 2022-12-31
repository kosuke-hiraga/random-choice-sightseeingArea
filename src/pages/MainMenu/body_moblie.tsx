import styled from 'styled-components'
import { ShightseeingData } from "../../types/SightseeingData"
import { useNavigate } from "react-router-dom"
import { P } from '../../components/Atoms/Typography'
import FavoriteIcon from "../../components/Atoms/FavoriteIcon"
import { useContext } from "react"
import { AuthContext } from "../../state/LoginProvider"
import { isFavorite } from "../../util/util"
import {
    update_SessionStorage_favrorite,
    update_firestoreFavorite
} from "../../firebase/logic"
import NO_IMAGE from "../../img/NO_IMAGE.png";
import { STORAGE_KEY } from '../../util/const'


const CardWrap = styled.div`
    position: relative;
`
const Card = styled.div`
    width: 230px;
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

    for (let i = 0; i < 2; i++) {
        if (typeof props.imgs[i] === 'undefined') {
            props!.imgs[i] = NO_IMAGE;
        }
    }

    return (
        <CardWrap>
            <Card onClick={() => {
                sessionStorage.setItem(STORAGE_KEY.IS_BLACK, "true")
                navigate(`./SightseeingData/${props.id}`, { state: props })
            }}>
                <ImgWrap>
                    <Img src={props.imgs[0]}></Img>
                </ImgWrap>
                <Title>
                    <P>{props.title}</P>
                </Title>
            </Card>
            {Auth.isSighIn() === true ?
                <FavoriteIconPosition>
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