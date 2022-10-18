import styled from 'styled-components'
import React, { useState } from 'react';
import { styled as st } from "@mui/system";
import { signIn, signUp } from "../../firebase/logic";
import { auth } from "../../firebase/firebase"




type BaseButton = {
    width?: number,
    height?: number,
    children?: any,
    onClick?: any,
    disabled?: boolean,
    testid?: string
}
const TestButton: React.FC<BaseButton> = (props) => {
    const [changeStirng, setChangeStirng] = useState("初期値");
    const [count, setCount] = useState(0);

    function Action() {
        // setChangeStirng("change");
        const newCount = count + 1;
        setCount(newCount);
        signIn("test@gmail.com", "ramram");
    }
    const cu = auth.currentUser;
    console.log(cu);

    return (
        <>
            <button data-testid="test" onClick={() => Action()}>{count} </button>
        </>
    )
}


export default TestButton;