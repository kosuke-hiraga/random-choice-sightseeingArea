import styled from 'styled-components'
import React from 'react';
import { P } from '../Atoms/Typography';
import BaseButton from '../Atoms/BaseButton';
import InputPrefectures from "../Molecules/InputPrefectures"

const Body = styled.div`
    width: 300px;
    height: 150px;
    background-color: #e6e7ee;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    border-radius: 10px;
    position: relative;   
`

const SearchPrefectureScreen: React.FC<{
    onClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    onButtonClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    showValue?: string
}> = ({ onClick, onButtonClick, showValue }) => {
    function handleClick(onClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) {
        if (onClick === undefined) return;
        onClick();
    }

    return (
        <Body >
            <InputPrefectures onClick={() => handleClick(onClick)} showValue={showValue} />
            <BaseButton onClick={() => handleClick(onButtonClick)}><P>検索</P></BaseButton>
        </Body >
    )
}

export default SearchPrefectureScreen;