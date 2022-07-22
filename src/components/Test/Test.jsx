import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from 'styled-components'
import { styled as st } from "@mui/system";

// import Typography from '@mui/material/Typography';
// import { Typography } from "@mui/material";
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import { P } from "../Atoms/Typography";
import { Typography } from "@mui/material";

const TitleWrapper = styled.div`
    background-color: yellow;
`

const Title = styled.div`
    text-align: center;
`

const SubTitle = styled.div`
    text-align: center;

`
// const titleSX = {
//     :hover {
//         color: red;
//     }
// }

const TitleSX2 = styled.p`
    :hover{
        color: red;
    }
`

const Explanation = styled.div`
    text-align: center;
`

const ImgWrapper = styled.div`
    width: 500px;
    height: 100px;
    display: flex;
`

const Img = styled.img`
    width: 100px;
    height: 100px;
    
`

const SightseeingInfoWrapper = styled.div`
    
`

const SightseeingInfo_address = styled.p``
const SightseeingInfo_access = styled.p`   `
const SightseeingInfo_price = styled.p``

const StyledButton = st(Button)`
    color: red;
    background-color: #1e1e2e;
`

const BackImg = styled.div`
    /* background-image: url("https://cdn-mapple.net/Normal/%E5%8C%97%E6%B5%B7%E9%81%93/1000918_20220118-5.jpg"); */
    background-size: auto;
    background-repeat: no-repeat;
    position: relative;
    z-index: 1;
`
const Body = styled.div`
    width: 90%;
    margin: 0 auto;
`


const Test = () => {
    // console.log(props);
    const props = useLocation().state;

    return (
        <>
            <Body>
                <BackImg>
                    <TitleWrapper>
                        {/* <Title sx={titleSX}> */}
                        <Title sx={{
                            ":hover": {
                                content: '"ok"'
                            }
                        }}>
                            <Typography sx={{
                                ":hover": {
                                    content: '"ok"'
                                }
                            }}>unti</Typography>
                            <P>{props.title}</P>
                        </Title>
                        <SubTitle>
                            <P>{props.subTitle}</P>
                        </SubTitle>
                    </TitleWrapper>
                    <ImgWrapper >
                        {props.imgs.map((img, index) => (
                            <Img alt={props.title} src={img} key={index}></Img>
                        ))}
                    </ImgWrapper>
                    <Explanation>
                        <P>{props.explanation}</P>
                    </Explanation>
                    <SightseeingInfoWrapper>
                        <SightseeingInfo_address>{props.address}</SightseeingInfo_address>
                        <SightseeingInfo_access>{props.access}</SightseeingInfo_access>
                        <SightseeingInfo_price>{props.price}</SightseeingInfo_price>
                    </SightseeingInfoWrapper>
                </BackImg>
            </Body>
        </>
    )
}

export default Test;