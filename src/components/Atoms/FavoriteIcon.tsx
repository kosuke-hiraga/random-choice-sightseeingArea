import styled from 'styled-components'
import StarIcon from '@mui/icons-material/Star';
import React, { useState } from 'react';
import { toBoolean } from '../../util/util';

const Star = (props: any) => (
    <StarIcon fontSize='large' {...props} />
);
const StyledStar = styled(Star)`
    color: ${props => toBoolean(props.favorite) ? "yellow" : "#e6e7ee"};
    filter:  drop-shadow(0.5px 0.5px 0.5px #707070) 
             drop-shadow(-0.5px -0.5px 0.5px #ffffff);
    cursor: pointer;
`

type onClick_FavoriteIcon = (() => void) | ((pram: any) => void);


const FavoriteIcon: React.FC<{
    favorite?: boolean,
    onClick?: onClick_FavoriteIcon,
    sightseeingID?: string
}> = ({ favorite = false, onClick }) => {
    const [isFavorite, setIsFavorite] = useState(favorite);

    function ClickedAction(onClick?: onClick_FavoriteIcon) {
        setIsFavorite(!isFavorite);

        if (onClick === undefined) {
            console.log("not function");
            return;
        }
        onClick(!isFavorite);
    }

    return (
        <StyledStar favorite={isFavorite.toString()} onClick={() => ClickedAction(onClick)} />
    )
}


export default FavoriteIcon;