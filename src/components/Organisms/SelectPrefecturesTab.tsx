import styled from 'styled-components'
import React from 'react';
import BaseButton from '../Atoms/BaseButton';
import CheckButton from '../Atoms/CheckButton';
import {
    isPushedPrefectureButton,
    update_SessionStorage_pushedPrefectureButton
} from '../../util/util';
import * as Prefecture from '../../util/Prefecture';
import BasicTabs from '../Molecules/Tab';

const Body = styled.div`
    width: 100%;
    max-width: 800px;       
    height: 500px;
    background-color: #e6e7ee;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    position: relative;   
`
const TabPosition = styled.div`
    height: 80%;
    width: 97%;
`
const SelectPrefecture = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    > :nth-child(1n){
        margin-top: 10px;
        margin-left: 10px;
        margin-right: 10px;
    }
`
const PrefectureButton = styled(CheckButton)`
    width: 40%;
    height: 30px;
`
const ButtonPosition = styled.div`
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
`

const CloseButton = styled(BaseButton)``
type SelectPrefectures = {
    onClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    className?: string
}

const SelectPrefecturesTab: React.FC<SelectPrefectures> = (props) => {
    const HOKKAIDO =
        <SelectPrefecture >
            {Prefecture.HOKKAIDO.map((item) => (
                <PrefectureButton isPush={isPushedPrefectureButton(item)} key={item}
                    onClick={(isPush: boolean) => update_SessionStorage_pushedPrefectureButton(item, isPush)} >
                    {item}
                </PrefectureButton >
            ))}
        </SelectPrefecture >;

    const TOHOKU =
        <SelectPrefecture >
            {Prefecture.TOHOKU.map((item) => (
                <PrefectureButton isPush={isPushedPrefectureButton(item)} key={item}
                    onClick={(isPush: boolean) => update_SessionStorage_pushedPrefectureButton(item, isPush)} >
                    {item}
                </PrefectureButton >
            ))}
        </SelectPrefecture >;

    const KANTO =
        <SelectPrefecture >
            {Prefecture.KANTO.map((item) => (
                <PrefectureButton isPush={isPushedPrefectureButton(item)} key={item}
                    onClick={(isPush: boolean) => update_SessionStorage_pushedPrefectureButton(item, isPush)} >
                    {item}
                </PrefectureButton >
            ))}
        </SelectPrefecture >;

    const TYUBU =
        <SelectPrefecture >
            {Prefecture.TYUBU.map((item) => (
                <PrefectureButton isPush={isPushedPrefectureButton(item)} key={item}
                    onClick={(isPush: boolean) => update_SessionStorage_pushedPrefectureButton(item, isPush)} >
                    {item}
                </PrefectureButton >
            ))}
        </SelectPrefecture >;

    const KINKI =
        <SelectPrefecture >
            {Prefecture.KINKI.map((item) => (
                <PrefectureButton isPush={isPushedPrefectureButton(item)} key={item}
                    onClick={(isPush: boolean) => update_SessionStorage_pushedPrefectureButton(item, isPush)} >
                    {item}
                </PrefectureButton >
            ))}
        </SelectPrefecture >;

    const SHIKOKU =
        <SelectPrefecture >
            {Prefecture.SHIKOKU.map((item) => (
                <PrefectureButton isPush={isPushedPrefectureButton(item)} key={item}
                    onClick={(isPush: boolean) => update_SessionStorage_pushedPrefectureButton(item, isPush)} >
                    {item}
                </PrefectureButton >
            ))}
        </SelectPrefecture >;

    const TYUGOKU =
        <SelectPrefecture >
            {Prefecture.TYUGOKU.map((item) => (
                <PrefectureButton isPush={isPushedPrefectureButton(item)} key={item}
                    onClick={(isPush: boolean) => update_SessionStorage_pushedPrefectureButton(item, isPush)} >
                    {item}
                </PrefectureButton >
            ))}
        </SelectPrefecture >;

    const KYUSHU_OKINAWA =
        <SelectPrefecture >
            {Prefecture.KYUSHU_OKINAWA.map((item) => (
                <PrefectureButton isPush={isPushedPrefectureButton(item)} key={item}
                    onClick={(isPush: boolean) => update_SessionStorage_pushedPrefectureButton(item, isPush)} >
                    {item}
                </PrefectureButton >
            ))}
        </SelectPrefecture >;


    const Prefectures = [
        HOKKAIDO, TOHOKU, KANTO, TYUBU, KINKI, SHIKOKU, TYUGOKU, KYUSHU_OKINAWA
    ];


    function handleClick(onClick?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) {
        if (onClick === undefined) return;
        onClick();
    }


    return (
        <Body className={props.className}>
            <TabPosition>
                <BasicTabs
                    label={Prefecture.SelectPrefecture_TAB}
                    data={Prefectures}
                />
            </TabPosition>
            <ButtonPosition>
                {/* <CloseButton onClick={() => props.onClick()}> 閉じる</CloseButton> */}
                <CloseButton onClick={() => handleClick(props.onClick)}> 閉じる</CloseButton>
            </ButtonPosition>
        </Body >
    )
}

export default SelectPrefecturesTab;