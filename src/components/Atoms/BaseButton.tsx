import styled from 'styled-components'
import React from 'react';
import { styled as st } from "@mui/system";
import { Button } from "@mui/material";



const sxButton = (props: BaseButton) => (
    <Button {...props}>
        {props.children}
    </Button>
);

const Body = st(sxButton)`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    background-color: #e6e7ee;
    border-radius: 10px;
    box-shadow:  2px 2px 1px #cfd0d6,
                -2px -2px 1px #fdfeff;
    &:active{
        box-shadow: inset 2px 2px 1px #cfd0d6,
                    inset -2px -2px 1px #fdfeff;
    }
    
`;

type BaseButton = {
    width?: number,
    height?: number,
    children?: any,
    onClick?: any,
    disabled?: boolean
}
const BaseButton: React.FC<BaseButton> = (props) => {
    return (
        <Body {...props}>
            {props.children}
        </Body >
    )
}

const defaultProps = {
    width: 200,
    height: 50
}
BaseButton.defaultProps = defaultProps;

export default BaseButton;