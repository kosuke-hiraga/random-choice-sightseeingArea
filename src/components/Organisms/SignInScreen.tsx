import styled from 'styled-components'
import React, { useState } from 'react';
import { signIn } from "../../firebase/logic";
import Input from "../Atoms/Input";
import BaseButton from '../Atoms/BaseButton';
import { P } from '../Atoms/Typography';
import PasswordHiddenToggle from "../Atoms/PasswordHiddenToggle"
import { styled as st } from "@mui/system";
import LoginIcon from '@mui/icons-material/Login';
import ClearIcon from '@mui/icons-material/Clear';
import { validateEmail, validatePassword } from '../../util/util';


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
`

const ClearIcon_EXT = st(ClearIcon)`
    top: 5px;
    right: 5px;
    position: absolute;
`

const InputMail = styled.input`
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
    height: 30%;
    display: flex;
    flex-direction: column;
`
const InputPasswordArea = styled.div`
    width: 80%;
    height: 30%;
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
    font-size: 18px;
    padding: 0 10px;
    grid-area: inputArea;
    height: 85%;
    background-color: #e6e7ee;
    box-shadow: inset 2px 2px 1px #cfd0d6,
                inset -2px -2px 1px #fdfeff;
    border: none;
    border-radius: 40px;
`
const LoginButton = styled(BaseButton)`
    display: flex;
    justify-content: space-evenly;
`

const ErrorMessage = styled.div`
    width: 100%;
    grid-template-areas: errorMessage;
`
const ErrorMessage_email = styled(ErrorMessage)``
const ErrorMessage_password = styled(ErrorMessage)``


type SignInScreen = {
    onClick: any
    className?: string
}

const SignInScreen: React.FC<SignInScreen> = (props) => {
    const [isPasswordHidden, setIsPasswordHidden] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [canEmail, setCanEmail] = useState(false);
    const [formatProblemMessage_email, setFormatProblemMessage_email] = useState("");
    const [canPassowrd, setCanPassowrd] = useState(false);
    const [formatProblemMessage_password, setFormatProblemMessage_password] = useState("");


    function actionAfterLogin(onClick: () => void) {
        signIn(email, password);
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

    return (
        // <Body {...props}>
        <Body className={props.className}>
            {/*props.onClick()は setIsSignInScreen(false)の想定 */}
            <ClearIcon_EXT onClick={() => props.onClick()} />
            <InputMailArea>
                <P sx={{ color: "#9a9ba7" }}>メールアドレス</P>
                <InputMail onChange={(e) => setEmail(e.target.value)} onBlur={(e) => focusOutAction_email((e.target.value))} />
                {canEmail === true ?
                    <P sx={{ color: "green" }}>*利用可能</P>
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
                    <P sx={{ color: "green" }}>*利用可能</P>
                    : <ErrorMessage_password>
                        <P fontSize={"small"} sx={{ color: "red" }}>
                            {/* 初回時はメッセージを表示しない、フォーカスアウト後から表示する */}
                            {formatProblemMessage_password && `*${formatProblemMessage_password}`}
                        </P>
                    </ErrorMessage_password>
                }
            </InputPasswordArea>

            <LoginButton onClick={() => actionAfterLogin(props.onClick)} disabled={(canEmail === false || canPassowrd === false)}>
                <LoginIcon />
                <P>ログイン</P>
            </LoginButton>
        </Body>
    )
}

export default SignInScreen;