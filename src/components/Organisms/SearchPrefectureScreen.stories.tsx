import { useState } from 'react';
import styled from 'styled-components'

import SelectPrefecturesTab from './SelectPrefecturesTab';
import SearchPrefectureScreen from './SearchPrefectureScreen';
import { getSessionStorage } from '../../util/util';
import { STORAGE_KEY } from '../../util/const';


export default {
    title: 'Organisms/SearchPrefectureItems/Tab & Screen',
}

const TEST = (args: any) => {
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
    const [searchWord, setSearchWord] = useState(getSessionStorage(STORAGE_KEY.PUSHED_PREFECTURE_BUTTON).join("・"));
    const [isHiddenTab, setIsHiddenTab] = useState(true);

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

export const nomal = TEST.bind({});