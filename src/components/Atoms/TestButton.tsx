import React, { useState } from 'react';
import { signIn } from "../../firebase/logic";
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
    const [count, setCount] = useState(0);

    function Action() {
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