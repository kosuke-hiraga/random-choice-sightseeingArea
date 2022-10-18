import React, { useState } from "react";
import styled from 'styled-components'

const ShowResult = styled.div`
    width: 1000px;
    height: 100px;
    border-radius: 1px solid black;
`
const ExcuteButton = styled.button`
    width: 100px;
    height: 50px;
`
type ForTestComponent = {
    onClick?: any,
    onClick2?: any,
    resultValue?: any
}

const ForTestComponent: React.FC<ForTestComponent> = (props) => {
    const [result, setResult] = useState("No result");

    // function sample(excute: (() => void) | ((test: string) => void) {
    function ClickedAction(onClick: (() => any) | (() => void)) {
        const result = onClick();
        if (result === undefined) {
            return;
        }
        setResult(result);
    }


    return (
        <>
            <ShowResult>
                <p>結果</p>
                <p data-testid="result">{result}</p>
            </ShowResult>
            {/* <ExcuteButton onClick={props.onClick} data-testid="test">テスト実行</ExcuteButton>
            <ExcuteButton onClick={props.onClick2} data-testid="test2">テスト実行2</ExcuteButton> */}
            <ExcuteButton onClick={() => props.onClick} data-testid="test">テスト実行</ExcuteButton>
            <ExcuteButton onClick={() => props.onClick2} data-testid="test2">テスト実行2</ExcuteButton>
        </>
    )
}

export default ForTestComponent;