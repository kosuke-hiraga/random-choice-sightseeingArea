import styled from 'styled-components'
import { P } from "../../components/Atoms/Typography";
import Device, { ViewportState } from "../../mediaQuary/config";
// import { ShigtseeingData } from "./index"
import { ShightseeingData } from "../../types/SightseeingData"
import FavoriteIcon from '../../components/Atoms/FavoriteIcon';

import { useContext } from "react"

import { isFavorite } from "../../util/util"
import {
    update_SessionStorage_favrorite,
    update_firestoreFavorite
} from "../../firebase/logic"
import { AuthContext } from "../../state/LoginProvider"

const Body = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    justify-content: space-evenly;
    border-bottom: 1px solid;
`

const TitleWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    
`
const Title = styled.div`
    width: 90%;
    text-align: center;
    font-weight: bold;
    border-radius: 42px;
    margin: 0px auto;
    /* padding-top: 10px; */
    @media ${Device.mobile} ,${Device.tablet}{
        h5{
            /* font-size: 33px; */
            /* font-size: calc(1.1875rem + ((1vw - 3.2px) * 2)); */
            font-size: calc(1.5875rem + ((1vw - 6.5px) * 2));
        }

    }
`
const FavoriteIconPosition = styled.div`
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const SubTitle = styled.div`
    width: 95%;
    margin: 0 auto;
    font-weight: bold;
    margin-bottom: 5px;
    /* p{
        font-size: 14px;
    } */
`

const TitleSX = {
    "fontSize": window.matchMedia(Device.mobile).matches ? "1.5rem" : "",
    // borderBottom: window.matchMedia(Device.laptop).matches ? "" : "1px solid",

}

const ShightseeingInfoTitle: React.FC<ShightseeingData> = (props) => {
    const Auth = useContext(AuthContext);
    console.log(Auth);
    console.log(AuthContext);

    return (
        <Body>
            <TitleWrapper>
                <Title>
                    <P variant="h5" sx={TitleSX}>{props.title}</P>
                </Title>

                {Auth.isSighIn() === true ?
                    <FavoriteIconPosition>
                        {/* <FavoriteIcon /> */}
                        <FavoriteIcon
                            favorite={isFavorite(props.id)}
                            sightseeingID={props.id}
                            onClick={(becomeFavorite: boolean) => {
                                update_SessionStorage_favrorite(props.id, becomeFavorite);
                                update_firestoreFavorite(Auth.currentUser);
                            }} />
                    </FavoriteIconPosition>
                    : ""}
            </TitleWrapper>
            {ViewportState !== "laptop" ? "" :
                <SubTitle>
                    <P variant="inherit">{props.subTitle}</P>
                </SubTitle>
            }
        </Body>
    )
}

export default ShightseeingInfoTitle;