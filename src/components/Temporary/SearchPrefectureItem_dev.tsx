import styled from 'styled-components'
import React, { useState } from 'react';
import { P } from '../Atoms/Typography';
import BaseButton from '../Atoms/BaseButton';
import SelectPrefecturesTab from '../Organisms/SelectPrefecturesTab';
import SearchPrefectureScreen from '../Organisms/SearchPrefectureScreen';
import InputPrefectures from '../Molecules/InputPrefectures';
import { getSessionStorage } from '../../util/util';
import { STORAGE_KEY } from '../../util/const';


const Body = styled.div`
    position: relative;
    width: 500px;
    height: 500px;
    background-color: red;
    display: flex;
    align-items: center;
    justify-content: center;
`
const TabPosition = styled.div`
    position: absolute;
    z-index: 100;
`

const SearchPrefectureDialog = styled.div`
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


const SearchPrefectureItem_dev = () => {
    const [searchWord, setSearchWord] = useState(getSessionStorage(STORAGE_KEY.PUSHED_PREFECTURE_BUTTON).join("・"));
    const [isHiddenTab, setIsHiddenTab] = useState(true);

    // function handleClick(onClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) {
    //     if (onClick === undefined) return;
    //     onClick();
    // }

    //都道府県を選択する毎に動作するのを想定
    function closedTabAction() {
        const searchPrefectures = getSessionStorage(STORAGE_KEY.PUSHED_PREFECTURE_BUTTON).join("・");
        setIsHiddenTab(!isHiddenTab);
        setSearchWord(searchPrefectures);
    }

    return (
        <>
            <Body >
                <SearchPrefectureScreen onClick={() => setIsHiddenTab(!isHiddenTab)} showValue={searchWord ? searchWord : undefined}></SearchPrefectureScreen>
                {/* <SearchPrefectureDialog >
                    <InputPrefectures onClick={() => setIsHiddenTab(!isHiddenTab)} showValue={searchWord ? searchWord : undefined} />
                    <BaseButton onClick={() => setSearchWord("fff")}>検索</BaseButton>
                </SearchPrefectureDialog > */}
                {isHiddenTab === true ?
                    "" :
                    <TabPosition>
                        <SelectPrefecturesTab onClick={() => closedTabAction()} />
                    </TabPosition>
                }
            </Body >
        </>
    )
}

export default SearchPrefectureItem_dev;