import React from 'react';
import styled from 'styled-components';
import { styled as st } from "@mui/system";
import AddSearchLocationIcon from "../Atoms/AddSearchLocationIcon"
import { P } from "../Atoms/Typography"


const Body = styled.div`
    width: 280px;
    display: flex;
    border: 1px solid black;
    border-radius: 10px;
    align-items: center;
    justify-content: space-between;
    cursor: zoom-in;
`

const Input = st(P)`
    margin-right: 5px;
    width: 85%;
    /* height: 100px; */
    border:none;
    outline: none;
    color: rgb(0,0,0,0.5);
    background-color: inherit;
`

//表示させる文字が無い場合に表示
const showInitialValue = "どこを観光してみたいですか?";

//「defaultValue」はstorybookの初期表示用に使用
const InputPrefectures: React.FC<{
    showValue?: string,
    className?: string,
    onClick?: (event: React.MouseEvent<HTMLInputElement>) => void
}> = ({ showValue = showInitialValue, className, onClick }) => {

    return (
        <>
            <Body className={className} onClick={onClick}>
                <AddSearchLocationIcon />
                <Input >{showValue}</Input>
            </Body>
        </>
    );

}


export default InputPrefectures;