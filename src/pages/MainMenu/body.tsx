import styled from "styled-components"
import { P } from "../../components/Atoms/Typography"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { ShightseeingData } from "../../types/SightseeingData"

const SightseeingImgWrapper = styled.div`
    width: 100%;
    height: 70%;
    position: relative;
`
const SightseeingImg = styled.img`
    width: 100%;
    height: 100%;
`
const Circle = styled.div`
    /* width: 300px; */
    /* height: 300px; */

    //別画面に表示する版
    /* width: 230px;
    height: 230px; */
    width: 150px;
    height: 150px;

    

    /* border: #cfd0d6 solid 5px; */
    border-top: #cfd0d6 solid 2px;
    border-left: #cfd0d6 solid 1px;
    border-radius: 150px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    /* box-shadow:  1px 4px 3px #cfd0d6,
                -2px -2px 3px #fdfeff; */
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
    /* background-color: #e6e7ee; */
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
const SightseeingCard: React.FC<ShightseeingData> = (props) => {
    const navigate = useNavigate();
    //行ごとに文字の収納スペースが異なるので、適切な文字数に加工する
    const Paragraph = {
        first: props.title.substring(0, 13),
        second: props.title.substring(13, 24),
        third: props.title.substring(24, 32)
    }

    return (
        <Circle onClick={() => {
            sessionStorage.setItem("isBlack", "true")
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
    )
}


export default SightseeingCard