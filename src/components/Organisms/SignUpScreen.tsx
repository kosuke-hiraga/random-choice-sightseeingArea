import styled from 'styled-components'
import React, { useState } from 'react';
import { P } from '../Atoms/Typography';
import BaseButton from '../Atoms/BaseButton';
import PasswordHiddenToggle from "../Atoms/PasswordHiddenToggle"
import { signUp } from "../../firebase/logic";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ClearIcon from '@mui/icons-material/Clear';
import { styled as st } from "@mui/system";
import { validateEmail, validatePassword, validateUserName } from '../../util/util';
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

const ClearIcon_EXT = st(ClearIcon)`
    top: 5px;
    right: 5px;
    position: absolute;
`
const InputUserNameArea = styled.div`
    width: 80%;
    height: 25%;
    display: flex;
    flex-direction: column;
`
const InputUserName = styled.input`
    @media ${Device.mobile}{
        font-size: 14px;
    }
    font-size: 18px;
    padding: 0 10px;
    height: 40%;
    background-color: #e6e7ee;
    box-shadow: inset 2px 2px 1px #cfd0d6,
                inset -2px -2px 1px #fdfeff;
    border: none;
    border-radius: 40px;
`
const InputMailArea = styled.div`
    width: 80%;
    height: 25%;
    display: flex;
    flex-direction: column;
`
const InputMail = styled.input`
    @media ${Device.mobile}{
        font-size: 14px;
    }
    font-size: 18px;
    padding: 0 10px;
    height: 40%;
    background-color: #e6e7ee;
    box-shadow: inset 2px 2px 1px #cfd0d6,
                inset -2px -2px 1px #fdfeff;
    border: none;
    border-radius: 40px;
`
const InputPasswordArea = styled.div`
    width: 80%;
    height: 25%;
    color: #acadb3;
    display: grid;
    grid-template-rows: 0.5fr;
    grid-template-columns: 90% 10%;
        grid-template-areas: 
        "text toggleIcon"
        "inputArea inputArea"
        "errorMessage errorMessage"
        ;

`
const InputPassword = styled.input`
    @media ${Device.mobile}{
        font-size: 12px;    
    }
    font-size: 18px;
    padding: 0 10px;
    grid-area: inputArea;
    height: 100%;
    background-color: #e6e7ee;
    box-shadow: inset 2px 2px 1px #cfd0d6,
                inset -2px -2px 1px #fdfeff;
    border: none;
    border-radius: 40px;
`
const SighUpButton = st(BaseButton)`
    display: flex;
    justify-content: space-evenly;
`
const ErrorMessage = styled.div`
    width: 100%;
    grid-template-areas: errorMessage;
`
const ErrorMessage_email = styled(ErrorMessage)``
const ErrorMessage_password = styled(ErrorMessage)``
const ErrorMessage_userName = styled(ErrorMessage)``

type SignUpScreen = {
    onClick: any
    className?: string
}


const SignUpScreen: React.FC<SignUpScreen> = (props) => {
    const [isPasswordHidden, setIsPasswordHidden] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [canEmail, setCanEmail] = useState(false);
    const [canUserName, setCanUserName] = useState(false);
    const [canPassowrd, setCanPassowrd] = useState(false);
    const [formatProblemMessage_email, setFormatProblemMessage_email] = useState("");
    const [formatProblemMessage_UserName, setFormatProblemMessage_UserName] = useState("");
    const [formatProblemMessage_password, setFormatProblemMessage_password] = useState("");

    function actionAfterSighUp(onClick: () => void) {
        signUp(email, userName, password);
        console.log("actionAfterLogin");
        onClick();
    }

    function focusOutAction_email(email: string) {
        const validateResult = validateEmail(email);
        setCanEmail(validateResult.isCorrectFormat);
        if (validateResult.isCorrectFormat === false) {
            setFormatProblemMessage_email(validateResult.showMessage);
        }
    }

    function focusOutAction_password(password: string) {
        const validateResult = validatePassword(password);
        setCanPassowrd(validateResult.isCorrectFormat);
        if (validateResult.isCorrectFormat === false) {
            setFormatProblemMessage_password(validateResult.showMessage);
        }
    }

    function focusOutAction_userName(userName: string) {
        const validateResult = validateUserName(userName);
        setCanUserName(validateResult.isCorrectFormat);
        if (validateResult.isCorrectFormat === false) {
            setFormatProblemMessage_UserName(validateResult.showMessage);
        }
    }


    return (
        <Body className={props.className}>
            {/*props.onClick()は setIsSignInScreen(false)の想定 */}
            <ClearIcon_EXT onClick={() => props.onClick()} />
            <InputUserNameArea>
                <P sx={{ color: "#9a9ba7" }}>登録ユーザー名</P>
                <InputUserName onChange={(e) => setUserName(e.target.value)} onBlur={(e) => focusOutAction_userName((e.target.value))} />
                {canUserName === true ?
                    <P sx={{ color: "green" }}>*利用可能</P>
                    : <ErrorMessage_userName >
                        <P fontSize={"small"} sx={{ color: "red" }}>
                            {/* 初回時はメッセージを表示しない、フォーカスアウト後から表示する */}
                            {formatProblemMessage_UserName && `*${formatProblemMessage_UserName}`}
                        </P>
                    </ErrorMessage_userName>
                }
            </InputUserNameArea>

            <InputMailArea>
                <P sx={{ color: "#9a9ba7" }}>メールアドレス</P>
                <InputMail onChange={(e) => setEmail(e.target.value)} onBlur={(e) => focusOutAction_email((e.target.value))} />
                {canEmail === true ?
                    <P sx={{ color: "green" }}>*正しい書式です</P>
                    : <ErrorMessage_email >
                        <P fontSize={"small"} sx={{ color: "red" }}>
                            {/* 初回時はメッセージを表示しない、フォーカスアウト後から表示する */}
                            {formatProblemMessage_email && `*${formatProblemMessage_email}`}
                        </P>
                    </ErrorMessage_email>
                }
            </InputMailArea>

            <InputPasswordArea>
                <P sx={{ color: "#9a9ba7" }}>パスワード</P>
                <PasswordHiddenToggle onClick={() => {
                    setIsPasswordHidden(!isPasswordHidden);
                }} />
                <InputPassword
                    type={isPasswordHidden ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={(e) => focusOutAction_password((e.target.value))}
                />
                {canPassowrd === true ?
                    <P sx={{ color: "green" }}>*正しい書式です</P>
                    : <ErrorMessage_password>
                        <P fontSize={"small"} sx={{ color: "red" }}>
                            {/* 初回時はメッセージを表示しない、フォーカスアウト後から表示する */}
                            {formatProblemMessage_password && `*${formatProblemMessage_password}`}
                        </P>
                    </ErrorMessage_password>
                }
            </InputPasswordArea>

            {/* <SighUpButton onClick={() => actionAfterLogin(props.onClick)} disabled={(canEmail === false || canPassowrd === false)}> */}
            <SighUpButton onClick={() => actionAfterSighUp(props.onClick)} disabled={(canUserName === false || canEmail === false || canPassowrd === false)}>
                <PersonAddIcon />
                <P>新規作成</P>
            </SighUpButton>
        </Body >
    )
}

export default SignUpScreen;