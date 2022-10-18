import styled from 'styled-components'
import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

type PasswordHiddenToggle = {
    onClick?: any
}

const PasswordHiddenToggle: React.FC<PasswordHiddenToggle> = ({ onClick }) => {
    const [isToggle, setIsToggle] = useState(false);

    function clickedAction(onClick: any) {
        setIsToggle(!isToggle);
        if (onClick === undefined) {
            console.log("not function");
            return;
        }
        onClick();
    }

    return (
        <>
            {isToggle === true ?
                <VisibilityIcon onClick={() => clickedAction(onClick)} /> :
                <VisibilityOffIcon onClick={() => clickedAction(onClick)} />
            }

        </>
    )
}

export default PasswordHiddenToggle;