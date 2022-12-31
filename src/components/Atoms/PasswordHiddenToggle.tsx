import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


type PasswordHiddenToggleType = {
    onClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
}

const PasswordHiddenToggle: React.FC<PasswordHiddenToggleType> = ({ onClick }) => {
    const [isToggle, setIsToggle] = useState(false);

    function clickedAction(onClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) {
        setIsToggle(!isToggle);
        if (onClick === undefined) return;
        onClick();
    }

    return (
        <>
            {isToggle === true ?
                <VisibilityIcon sx={{ cursor: "pointer" }} onClick={() => clickedAction(onClick)} /> :
                <VisibilityOffIcon sx={{ cursor: "pointer" }} onClick={() => clickedAction(onClick)} />
            }
        </>
    )
}

export default PasswordHiddenToggle;