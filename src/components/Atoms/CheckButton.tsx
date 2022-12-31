import styled from "styled-components";
import React, { useState } from "react";
import BaseButton from "./BaseButton"



const Body = styled(BaseButton) <{ isPushed: boolean }>`
    box-shadow: ${props => props.isPushed === true ?
        "inset 2px 2px 1px #cfd0d6,inset -2px -2px 1px #fdfeff"
        : "2px 2px 1px #cfd0d6, -2px -2px 1px #fdfeff"
    };
`

type CheckButtonType = {
    className?: string,
    isPush: boolean,
    children?: React.ReactNode,
    onClick: any
}

const CheckButton: React.FC<CheckButtonType> = (props) => {
    const [isPush, setIsPush] = useState(props.isPush);
    function clickedAction(onClick?: (pram: boolean) => void) {
        setIsPush(!isPush);
        if (onClick === undefined) {
            console.log("not function");
            return
        };
        onClick(!isPush);
        console.log("click");
    }

    return (
        <>
            <Body className={props.className} isPushed={isPush} onClick={() => clickedAction(props.onClick)}>
                {props.children}
            </Body>
        </>
    )
}

export default CheckButton;