import styled from 'styled-components'
import React, { useState } from 'react';
import { P } from '../Atoms/Typography';
import BaseButton from '../Atoms/BaseButton';
import { styled as st } from "@mui/system";
import Device from '../../mediaQuary/config';

const Body = styled.div`
    width: 90%;
    max-width: 400px;
    
    height: 350px;
    background-color: #e6e7ee;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 10px;
    /* border: 1px solid red; */

    position: relative;
`

type SelectPrefectures = {
    onClick: any
    className?: string
}


const SelectPrefectures: React.FC<SelectPrefectures> = (props) => {
    const [isPasswordHidden, setIsPasswordHidden] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    return (
        <Body className={props.className}>

        </Body >
    )
}

export default SelectPrefectures;