import styled from 'styled-components'
import React from 'react';
import { styled as st } from "@mui/system";
import { Button } from "@mui/material";
import { StyledEngineProvider } from '@mui/material/styles';


const MUIButton = st(Button)`
    width: 200px;
    height: 50px;
    background-color: #e6e7ee;
    border-radius: 10px;
    box-shadow:  2px 2px 1px #cfd0d6,
                -2px -2px 1px #fdfeff;
    &:active{
        box-shadow: inset 2px 2px 1px #cfd0d6,
                    inset -2px -2px 1px #fdfeff;
    }
`

type BaseButton = {
    children?: React.ReactNode,
    onClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    disabled?: boolean,
    className?: string
}

const BaseButton: React.FC<BaseButton> = (props) => {
    function handleClick() {
        if (props.onClick === undefined) {
            console.log("not function");
            return
        };
        props.onClick();
    }

    return (
        <StyledEngineProvider injectFirst>
            <MUIButton className={props.className} onClick={() => handleClick()} sx={{ backgroundColor: "" }} disabled={props.disabled}>
                {props.children}
            </MUIButton>
        </StyledEngineProvider >
    )
}

export default BaseButton;