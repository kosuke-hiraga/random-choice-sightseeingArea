import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { ShightseeingData } from "../../types/SightseeingData"
import { P } from "../../components/Atoms/Typography"
import FavoriteIcon from "../../components/Atoms/FavoriteIcon"
import { useContext } from "react"
import { AuthContext } from "../../state/LoginProvider"
import { isFavorite } from "../../util/util"
import {
    update_SessionStorage_favrorite,
    update_firestoreFavorite
} from "../../firebase/logic"
import NO_IMAGE from "../../img/NO_IMAGE.png";
import { STORAGE_KEY } from "../../util/const"

const SightseeingImgWrapper = styled.div`
    width: 100%;
    height: 70%;
    position: relative;
`
const SightseeingImg = styled.img`
    width: 100%;
    height: 100%;
`
const CircleWrap = styled.div`
    position: relative;
`
const Circle = styled.div`
    width: 150px;
    height: 150px;
    border-top: #cfd0d6 solid 2px;
    border-left: #cfd0d6 solid 1px;
    border-radius: 150px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow:  2px 3px 5px #707070,
                 -2px -2px 5px #ffffff;
    margin: 10px;
    :hover{
        ${SightseeingImg}{
            position: absolute;
            top: -3%;
            left: -3%;
            width: 106%;
            height: 103%;
            opacity: 0.7;
        }
    }
`
const SightseeingTitle = styled.div`
    height: 30%;
    background-color: rgba(230, 231, 238, 0.4);
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    p{
        font-size: 9px;
    }
`
const FavoriteIconPosition = styled.div`
    position: absolute;
    top: 10px;
    right: 20px;
`

const SightseeingCard: React.FC<ShightseeingData> = (props) => {
    const navigate = useNavigate();
    const Auth = useContext(AuthContext);
    //行ごとに文字の収納スペースが異なるので、適切な文字数に加工する
    const Paragraph = {
        first: props.title.substring(0, 13),
        second: props.title.substring(13, 24),
        third: props.title.substring(24, 32)
    }
    //画像がない場合、画像を差し替える
    for (let i = 0; i < 2; i++) {
        if (typeof props.imgs[i] === 'undefined') {
            props!.imgs[i] = NO_IMAGE;
        }
    }

    return (
        <CircleWrap>
            <Circle onClick={() => {
                sessionStorage.setItem(STORAGE_KEY.IS_BLACK, "true")
                navigate(`./SightseeingData/${props.id}`, { state: props })
            }} >
                <SightseeingImgWrapper>
                    <SightseeingImg src={props.imgs[0]}></SightseeingImg>
                </SightseeingImgWrapper>
                <SightseeingTitle>

                    <P>{Paragraph.first}</P>
                    <P>{Paragraph.second}</P>
                    <P>{Paragraph.third}</P>
                </SightseeingTitle>
            </Circle>
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
        </CircleWrap>
    )
}
export default SightseeingCard